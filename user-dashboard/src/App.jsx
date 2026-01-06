import { useState } from 'react';
import StarRating from './components/StarRating';
import './App.css';

// Update this with your deployed backend URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

function App() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_URL}/api/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rating, review }),
      });

      const data = await response.json();

      if (data.success) {
        setAiResponse(data.data.userResponse);
        setSubmitted(true);
      } else {
        setError(data.error || 'Failed to submit feedback');
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRating(0);
    setReview('');
    setSubmitted(false);
    setAiResponse('');
    setError('');
  };

  return (
    <div className="app">
      <div className="container">
        {!submitted ? (
          <div className="feedback-form">
            <div className="header">
              <h1 className="title">Share Your Feedback</h1>
              <p className="subtitle">We'd love to hear about your experience</p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label">How would you rate your experience?</label>
                <StarRating rating={rating} onRatingChange={setRating} />
                {rating > 0 && (
                  <p className="rating-text">
                    {rating === 1 && '😞 Poor'}
                    {rating === 2 && '😕 Fair'}
                    {rating === 3 && '😐 Good'}
                    {rating === 4 && '😊 Very Good'}
                    {rating === 5 && '🤩 Excellent'}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="review" className="label">
                  Tell us more (optional)
                </label>
                <textarea
                  id="review"
                  className="textarea"
                  placeholder="Share your thoughts, suggestions, or concerns..."
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  rows={5}
                  maxLength={5000}
                />
                <div className="char-count">
                  {review.length} / 5000 characters
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="submit-btn"
                disabled={loading || rating === 0}
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Submitting...
                  </>
                ) : (
                  'Submit Feedback'
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="success-state">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h2 className="success-title">Thank You!</h2>
            <div className="ai-response">
              <p>{aiResponse}</p>
            </div>
            <button onClick={handleReset} className="reset-btn">
              Submit Another Feedback
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
