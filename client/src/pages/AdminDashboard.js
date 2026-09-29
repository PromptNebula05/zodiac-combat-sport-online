import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function AdminDashboard() {
  const [stats, setStats] = useState({ videos: 0, users: 0, products: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [videosRes, usersRes, productsRes] = await Promise.all([
          api.get('/videos'),
          api.get('/users'),
          api.get('/products'),
        ]);
        setStats({
          videos: videosRes.data.length,
          users: usersRes.data.length,
          products: productsRes.data.length,
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage platform content and users</p>
      </div>

      <div className="admin-grid">
        <div className="admin-stat-card">
          <div className="stat-number">{stats.videos}</div>
          <div className="stat-label">Training Videos</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-number">{stats.users}</div>
          <div className="stat-label">Registered Users</div>
        </div>
        <div className="admin-stat-card">
          <div className="stat-number">{stats.products}</div>
          <div className="stat-label">Products</div>
        </div>
      </div>

      <div className="home-section">
        <h2>Management</h2>
        <div className="admin-actions">
          <Link to="/admin/videos" className="btn btn-primary">Manage Videos</Link>
          <Link to="/admin/users" className="btn btn-secondary">Manage Users</Link>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
