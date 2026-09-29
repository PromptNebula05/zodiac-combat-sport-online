import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}`, { role: newRole });
      setMessage({ type: 'success', text: 'User role updated' });
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error updating user role' });
    }
  };

  const handleBeltChange = async (userId, newBelt) => {
    try {
      await api.put(`/users/${userId}`, { beltLevel: newBelt });
      setMessage({ type: 'success', text: 'Belt rank updated' });
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error updating belt rank' });
    }
  };

  const handleDelete = async (userId, username) => {
    if (!window.confirm(`Are you sure you want to delete user "${username}"?`)) return;
    try {
      await api.delete(`/users/${userId}`);
      setMessage({ type: 'success', text: 'User deleted' });
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting user' });
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users', newUser);
      setMessage({ type: 'success', text: 'Member added successfully' });
      setShowAddModal(false);
      setNewUser({ username: '', email: '', password: '', firstName: '', lastName: '' });
      fetchUsers();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Error adding member' });
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Manage Users</h1>
          <p>
            <Link to="/admin" style={{ color: 'var(--text-secondary)' }}>← Back to Dashboard</Link>
          </p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>+ Add Member</button>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add New Member</h2>
            <form onSubmit={handleAddUser}>
              <div className="form-group">
                <label htmlFor="add-firstName">First Name</label>
                <input type="text" id="add-firstName" className="form-control" value={newUser.firstName} onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label htmlFor="add-lastName">Last Name</label>
                <input type="text" id="add-lastName" className="form-control" value={newUser.lastName} onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })} required />
              </div>
              <div className="form-group">
                <label htmlFor="add-username">Username</label>
                <input type="text" id="add-username" className="form-control" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} required minLength={3} />
              </div>
              <div className="form-group">
                <label htmlFor="add-email">Email</label>
                <input type="email" id="add-email" className="form-control" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} required />
              </div>
              <div className="form-group">
                <label htmlFor="add-password">Password</label>
                <input type="password" id="add-password" className="form-control" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} required minLength={6} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button type="submit" className="btn btn-primary">Add Member</button>
                <button type="button" className="btn btn-outline" onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Name</th>
              <th>Role</th>
              <th>Belt Level</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td style={{ color: 'var(--text-primary)' }}>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    style={{
                      background: 'var(--bg-dark)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '2px 6px',
                    }}
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td>{user.beltLevel}
                  <select
                    value={user.beltLevel}
                    onChange={(e) => handleBeltChange(user._id, e.target.value)}
                    style={{
                      background: 'var(--bg-dark)',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      padding: '2px 6px',
                      display: 'block',
                      marginTop: '4px',
                    }}
                  >
                    <option value="White">White</option>
                    <option value="Yellow">Yellow</option>
                    <option value="Orange">Orange</option>
                    <option value="Purple">Purple</option>
                    <option value="Blue">Blue</option>
                    <option value="Green">Green</option>
                    <option value="Brown">Brown</option>
                    <option value="Red">Red</option>
                    <option value="Black Belt (White-Stripe)">Black Belt (White-Stripe)</option>
                    <option value="Black Belt (Yellow-Stripe)">Black Belt (Yellow-Stripe)</option>
                    <option value="Black Belt (Orange-Stripe)">Black Belt (Orange-Stripe)</option>
                    <option value="Black Belt (Purple-Stripe)">Black Belt (Purple-Stripe)</option>
                    <option value="Black Belt (Blue-Stripe)">Black Belt (Blue-Stripe)</option>
                    <option value="Black Belt (Green-Stripe)">Black Belt (Green-Stripe)</option>
                    <option value="Black Belt (Brown-Stripe)">Black Belt (Brown-Stripe)</option>
                    <option value="Black Belt (Red-Stripe)">Black Belt (Red-Stripe)</option>
                    <option value="Black Sash">Black Sash</option>
                  </select>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user._id, user.username)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
