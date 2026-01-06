import { useState, useEffect } from 'react';
import Analytics from './components/Analytics';
import FeedbackCard from './components/FeedbackCard';
import './App.css';

// Update this with your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchData = async () => {
    try {
      const [feedbackRes, statsRes] = await Promise.all([
        fetch(`${API_URL}/api/feedback`),
        fetch(`${API_URL}/api/feedback/stats`)
      ]);

      const feedbackData = await feedbackRes.json();
      const statsData = await statsRes.json();

      if (feedbackData.success) {
        setFeedbacks(feedbackData.data);
      }

      if (statsData.success) {
        setStats(statsData.data);
      }

      setError('');
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Unable to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Auto-refresh every 10 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesRating = filterRating === 'all' || feedback.rating === parseInt(filterRating);
    const matchesSearch = searchQuery === '' ||
      feedback.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
      feedback.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRating && matchesSearch;
  });

  return (
    <div className="admin-app">
      <header className="admin-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="admin-title">📊 Admin Dashboard</h1>
            <p className="admin-subtitle">Feedback Management System</p>
          </div>
          <div className="header-right">
            <button
              className={`refresh-toggle ${autoRefresh ? 'active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
              title={autoRefresh ? 'Auto-refresh enabled' : 'Auto-refresh disabled'}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </button>
            <button className="refresh-btn" onClick={fetchData} disabled={loading}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="23 4 23 10 17 10" />
                <polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        {loading && feedbacks.length === 0 ? (
          <div className="loading-state">
            <div className="spinner-large"></div>
            <p>Loading feedback data...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <p>{error}</p>
            <button onClick={fetchData} className="retry-btn">Retry</button>
          </div>
        ) : (
          <>
            <Analytics stats={stats} feedbacks={feedbacks} />

            <div className="feedback-section">
              <div className="section-header">
                <h2 className="section-title">All Feedback ({filteredFeedbacks.length})</h2>
                <div className="controls">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <select
                    className="filter-select"
                    value={filterRating}
                    onChange={(e) => setFilterRating(e.target.value)}
                  >
                    <option value="all">All Ratings</option>
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
              </div>

              {filteredFeedbacks.length === 0 ? (
                <div className="empty-state">
                  <p>No feedback found</p>
                </div>
              ) : (
                <div className="feedback-grid">
                  {filteredFeedbacks.map((feedback) => (
                    <FeedbackCard key={feedback._id} feedback={feedback} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
