import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function VideoPlayer() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await api.get(`/videos/${id}`);
        setVideo(res.data);
      } catch (err) {
        setError('Video not found');
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <p>Loading video...</p>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="loading">
        <p>{error || 'Video not found'}</p>
        <Link to="/videos" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Back to Library
        </Link>
      </div>
    );
  }

  const levelClass = video.skillLevel.toLowerCase();

  return (
    <div className="video-player-container">
      <Link to="/videos" style={{ display: 'inline-block', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
        ← Back to Video Library
      </Link>

      {/* Video Player */}
      <div className="video-player-wrapper">
        <iframe
          src={video.videoUrl}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Video Details */}
      <div className="video-details">
        <h1>{video.title}</h1>
        <div className="video-meta">
          <span className={`badge badge-${levelClass}`}>{video.skillLevel}</span>
          <span className="badge badge-category">{video.category}</span>
          <span style={{ color: 'var(--text-secondary)' }}>Duration: {video.duration}</span>
          <span style={{ color: 'var(--text-secondary)' }}>Instructor: {video.instructor}</span>
        </div>
        <p className="video-description">{video.description}</p>

        {video.tags && video.tags.length > 0 && (
          <div className="video-tags">
            {video.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoPlayer;
