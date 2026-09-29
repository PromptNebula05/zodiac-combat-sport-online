import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import VideoCard from '../components/VideoCard';

function VideoLibrary() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [categories, setCategories] = useState([]);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/videos';
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        url = '/videos/search';
        params.append('q', searchQuery.trim());
      } else if (skillFilter || categoryFilter) {
        url = '/videos/filter';
        if (skillFilter) params.append('level', skillFilter);
        if (categoryFilter) params.append('category', categoryFilter);
      }

      const queryString = params.toString();
      const res = await api.get(queryString ? `${url}?${queryString}` : url);
      setVideos(res.data);
    } catch (err) {
      console.error('Error fetching videos:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, skillFilter, categoryFilter]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    api.get('/videos/categories').then((res) => {
      setCategories(res.data.categories || []);
    }).catch(console.error);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchVideos();
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSkillFilter('');
    setCategoryFilter('');
  };

  return (
    <div>
      <div className="page-header">
        <h1>Video Library</h1>
        <p>Browse instructional videos organized by category and skill level</p>
      </div>

      {/* Search & Filter Bar */}
      <form className="search-filter-bar" onSubmit={handleSearch}>
        <input
          type="text"
          className="search-input"
          placeholder="Search videos by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="filter-select"
          value={skillFilter}
          onChange={(e) => { setSkillFilter(e.target.value); setSearchQuery(''); }}
        >
          <option value="">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => { setCategoryFilter(e.target.value); setSearchQuery(''); }}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary">Search</button>
        {(searchQuery || skillFilter || categoryFilter) && (
          <button type="button" className="btn btn-outline" onClick={clearFilters}>Clear</button>
        )}
      </form>

      {/* Results count */}
      {!loading && (
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {videos.length} video{videos.length !== 1 ? 's' : ''} found
        </p>
      )}

      {/* Video Grid */}
      {loading ? (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading videos...</p>
        </div>
      ) : videos.length === 0 ? (
        <div className="loading">
          <p>No videos found. Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="video-grid">
          {videos.map((video) => (
            <VideoCard key={video._id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
}

export default VideoLibrary;
