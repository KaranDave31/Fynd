import './FeedbackCard.css';

const FeedbackCard = ({ feedback }) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const getRatingColor = (rating) => {
        if (rating >= 4) return 'var(--success)';
        if (rating === 3) return 'var(--warning)';
        return 'var(--danger)';
    };

    return (
        <div className="feedback-card">
            <div className="feedback-header">
                <div className="rating-badge" style={{ borderColor: getRatingColor(feedback.rating) }}>
                    <span className="rating-value">{feedback.rating}</span>
                    <span className="rating-stars">⭐</span>
                </div>
                <div className="timestamp">{formatDate(feedback.timestamp)}</div>
            </div>

            <div className="feedback-section">
                <h4 className="section-label">User Review</h4>
                <p className="review-text">
                    {feedback.review || <em className="empty-text">No review provided</em>}
                </p>
            </div>

            <div className="feedback-section">
                <h4 className="section-label">AI Summary</h4>
                <p className="summary-text">{feedback.summary}</p>
            </div>

            <div className="feedback-section">
                <h4 className="section-label">Recommended Actions</h4>
                <ul className="actions-list">
                    {feedback.recommendedActions.map((action, index) => (
                        <li key={index} className="action-item">
                            <span className="action-bullet">→</span>
                            {action}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FeedbackCard;
