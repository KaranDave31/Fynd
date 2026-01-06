import './Analytics.css';

const Analytics = ({ stats, feedbacks }) => {
    const ratingDistribution = stats?.ratingDistribution || {};
    const totalCount = stats?.totalCount || 0;
    const averageRating = stats?.averageRating || 0;
    const recentCount = stats?.recentCount || 0;

    const getRatingPercentage = (rating) => {
        const count = ratingDistribution[rating] || 0;
        return totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
    };

    return (
        <div className="analytics">
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <div className="stat-value">{totalCount}</div>
                        <div className="stat-label">Total Feedback</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">⭐</div>
                    <div className="stat-content">
                        <div className="stat-value">{averageRating.toFixed(1)}</div>
                        <div className="stat-label">Average Rating</div>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🕐</div>
                    <div className="stat-content">
                        <div className="stat-value">{recentCount}</div>
                        <div className="stat-label">Last 24 Hours</div>
                    </div>
                </div>
            </div>

            <div className="rating-distribution">
                <h3 className="section-title">Rating Distribution</h3>
                <div className="distribution-bars">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div key={rating} className="distribution-row">
                            <div className="rating-label">
                                {rating} ⭐
                            </div>
                            <div className="bar-container">
                                <div
                                    className="bar"
                                    style={{ width: `${getRatingPercentage(rating)}%` }}
                                >
                                    <span className="bar-label">
                                        {ratingDistribution[rating] || 0}
                                    </span>
                                </div>
                            </div>
                            <div className="percentage">
                                {getRatingPercentage(rating)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;
