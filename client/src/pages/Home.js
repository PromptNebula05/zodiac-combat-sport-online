import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import VideoCard from '../components/VideoCard';

function Home() {
  const { user } = useAuth();
  const [recentVideos, setRecentVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentVideos = async () => {
      try {
        const res = await api.get('/videos');
        setRecentVideos(res.data.slice(0, 4));
      } catch (err) {
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecentVideos();
  }, []);

  return (
    <div>
      <div className="home-hero">
        <h1>Welcome, <span>{user?.firstName || user?.username}</span></h1>
        <p>Continue your Kung Fu training journey with the Nine Tigers school</p>
      </div>

      {/* Quick Stats */}
      <div className="home-section">
        <h2>Quick Actions</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/videos" className="btn btn-primary">Browse Video Library</Link>
          <Link to="/profile" className="btn btn-outline">View Profile</Link>
        </div>
      </div>

      {/* Recent Videos */}
      <div className="home-section">
        <h2>Recent Training Videos</h2>
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <>
            <div className="video-grid">
              {recentVideos.map((video) => (
                <VideoCard key={video._id} video={video} />
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <Link to="/videos" className="btn btn-secondary">View All Videos</Link>
            </div>
          </>
        )}
      </div>

      {/* Announcements Placeholder */}
      <div className="home-section">
        <h2>Announcements</h2>
        <div className="card" style={{ cursor: 'default' }}>
          <div className="card-body">
            <h3 className="card-title">Welcome to Nine Tigers Online!</h3>
            <p className="card-text">
              We're excited to launch the Nine Tigers Online training platform.
              Browse our growing library of instructional videos, from beginner stances
              to advanced forms. Stay tuned for community forums and progress tracking
              features coming in future updates!
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
              Posted by Sifu Mulloy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
