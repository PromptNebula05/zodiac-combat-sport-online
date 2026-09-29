import React from 'react';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  const levelClass = video.skillLevel.toLowerCase();
  const hasThumbnail = video.thumbnail && video.thumbnail.trim() !== '';

  return (
    <Link to={`/videos/${video._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="card">
        {hasThumbnail ? (
          <img
            className="card-img"
            src={video.thumbnail}
            alt={video.title}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div
          className="card-img-placeholder"
          style={{ display: hasThumbnail ? 'none' : 'flex' }}
        >
          <span>Nine Tigers</span>
        </div>
        <div className="card-body">
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <span className={`badge badge-${levelClass}`}>{video.skillLevel}</span>
            <span className="badge badge-category">{video.category}</span>
          </div>
          <h3 className="card-title">{video.title}</h3>
          <p className="card-text">
            {video.description.length > 100
              ? video.description.substring(0, 100) + '...'
              : video.description}
          </p>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
            <span>{video.instructor}</span>
            <span>{video.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
