import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, isAuthenticated, isAdmin, loading, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  if (loading) {
    return (
      <nav className="navbar">
        <span className="navbar-brand">
          <img src="https://img1.wsimg.com/isteam/ip/b649ca5c-1bab-44db-9a93-f5817e144353/Nine%20Tigers.png/:/rs=w:99,h:99,cg:true,m/cr=w:99,h:99/qt=q:95" alt="Nine Tigers" />
          <span className="brand-nine-tigers">Nine Tigers</span>
          <span className="brand-online">Online</span>
        </span>
      </nav>
    );
  }

  if (!isAuthenticated) {
    return (
      <nav className="navbar">
        <Link to="/login" className="navbar-brand">
          <img src="https://img1.wsimg.com/isteam/ip/b649ca5c-1bab-44db-9a93-f5817e144353/Nine%20Tigers.png/:/rs=w:99,h:99,cg:true,m/cr=w:99,h:99/qt=q:95" alt="Nine Tigers" />
          <span className="brand-nine-tigers">Nine Tigers</span>
          <span className="brand-online">Online</span>
        </Link>
        <div className="navbar-links">
          <Link to="/login" className={isActive('/login')}>Login</Link>
          <Link to="/register" className={isActive('/register')}>Register</Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src="https://img1.wsimg.com/isteam/ip/b649ca5c-1bab-44db-9a93-f5817e144353/Nine%20Tigers.png/:/rs=w:99,h:99,cg:true,m/cr=w:99,h:99/qt=q:95" alt="Nine Tigers" />
        <span className="brand-nine-tigers">Nine Tigers</span>
        <span className="brand-online">Online</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className={isActive('/')}>Home</Link>
        <Link to="/videos" className={isActive('/videos')}>Video Library</Link>
        <Link to="/products" className={isActive('/products')}>Products</Link>
        <Link to="/profile" className={isActive('/profile')}>Profile</Link>
        {isAdmin && <Link to="/admin" className={isActive('/admin')}>Admin</Link>}
      </div>
      <div className="navbar-user">
        <span className="username">{user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user.username}</span>
        {isAdmin && <span className="role-badge">Admin</span>}
        <button className="btn btn-outline btn-sm" onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
