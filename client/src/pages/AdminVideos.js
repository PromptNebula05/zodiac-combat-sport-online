import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function AdminVideos() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'forms',
    skillLevel: 'Beginner',
    duration: '',
    videoUrl: '',
    thumbnail: '',
    instructor: 'Sifu Mulloy',
    tags: '',
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const fetchVideos = async () => {
    try {
      const res = await api.get('/videos');
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'forms',
      skillLevel: 'Beginner',
      duration: '',
      videoUrl: '',
      thumbnail: '',
      instructor: 'Sifu Mulloy',
      tags: '',
    });
    setEditingVideo(null);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (video) => {
    setEditingVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      category: video.category,
      skillLevel: video.skillLevel,
      duration: video.duration,
      videoUrl: video.videoUrl,
      thumbnail: video.thumbnail || '',
      instructor: video.instructor || 'Sifu Mulloy',
      tags: video.tags ? video.tags.join(', ') : '',
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    const payload = {
      ...formData,
      tags: formData.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      if (editingVideo) {
        await api.put(`/videos/${editingVideo._id}`, payload);
        setMessage({ type: 'success', text: 'Video updated successfully!' });
      } else {
        await api.post('/videos', payload);
        setMessage({ type: 'success', text: 'Video created successfully!' });
      }
      setShowModal(false);
      resetForm();
      fetchVideos();
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Error saving video' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    try {
      await api.delete(`/videos/${id}`);
      setMessage({ type: 'success', text: 'Video deleted' });
      fetchVideos();
    } catch (err) {
      setMessage({ type: 'error', text: 'Error deleting video' });
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading videos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>Manage Videos</h1>
        <p>
          <Link to="/admin" style={{ color: 'var(--text-secondary)' }}>← Back to Dashboard</Link>
        </p>
      </div>

      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <button className="btn btn-primary" onClick={openAddModal}>+ Add New Video</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Level</th>
              <th>Duration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {videos.map((video) => (
              <tr key={video._id}>
                <td style={{ color: 'var(--text-primary)' }}>{video.title}</td>
                <td>{video.category}</td>
                <td>
                  <span className={`badge badge-${video.skillLevel.toLowerCase()}`}>
                    {video.skillLevel}
                  </span>
                </td>
                <td>{video.duration}</td>
                <td>
                  <button className="btn btn-outline btn-sm" onClick={() => openEditModal(video)} style={{ marginRight: '0.5rem' }}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(video._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{editingVideo ? 'Edit Video' : 'Add New Video'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title *</label>
                <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Description *</label>
                <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required rows={3} />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select name="category" className="form-control" value={formData.category} onChange={handleChange}>
                  <option value="forms">Forms</option>
                  <option value="strikes">Strikes</option>
                  <option value="stances">Stances</option>
                  <option value="conditioning">Conditioning</option>
                  <option value="sparring">Sparring</option>
                  <option value="philosophy">Philosophy</option>
                  <option value="weapons">Weapons</option>
                </select>
              </div>
              <div className="form-group">
                <label>Skill Level *</label>
                <select name="skillLevel" className="form-control" value={formData.skillLevel} onChange={handleChange}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="form-group">
                <label>Duration *</label>
                <input type="text" name="duration" className="form-control" value={formData.duration} onChange={handleChange} placeholder="e.g., 15:30" required />
              </div>
              <div className="form-group">
                <label>Video URL *</label>
                <input type="text" name="videoUrl" className="form-control" value={formData.videoUrl} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Thumbnail URL</label>
                <input type="text" name="thumbnail" className="form-control" value={formData.thumbnail} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Instructor</label>
                <input type="text" name="instructor" className="form-control" value={formData.instructor} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Tags (comma-separated)</label>
                <input type="text" name="tags" className="form-control" value={formData.tags} onChange={handleChange} placeholder="e.g., stance, basics, beginner" />
              </div>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editingVideo ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminVideos;
