import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get('/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];
  const filtered = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products;

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Training Equipment & Resources</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Gear and materials to support your training</p>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <select
          className="form-control"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={{ maxWidth: '250px' }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="video-grid">
        {filtered.map((product) => (
          <div key={product._id} className="card">
            {product.image && product.image.trim() !== '' && product.image !== '/images/default-product.jpg' ? (
              <img
                className="card-img"
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div
              className="card-img-placeholder"
              style={{
                display: product.image && product.image.trim() !== '' && product.image !== '/images/default-product.jpg' ? 'none' : 'flex',
              }}
            >
              <span>Nine Tigers</span>
            </div>
            <div className="card-body">
              <span className="badge badge-category">{product.category}</span>
              <h3 className="card-title" style={{ marginTop: '0.4rem' }}>{product.name}</h3>
              <p className="card-text">{product.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ color: 'var(--secondary)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  ${product.price.toFixed(2)}
                </span>
                <span style={{ color: product.inStock ? '#4caf50' : 'var(--primary)', fontSize: '0.85rem' }}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '2rem' }}>
          No products found.
        </p>
      )}
    </div>
  );
}

export default Products;
