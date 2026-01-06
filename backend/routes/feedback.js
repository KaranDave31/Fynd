import express from 'express';
import Feedback from '../models/Feedback.js';
import { generateUserResponse, generateSummary, generateRecommendedActions } from '../services/llmService.js';

const router = express.Router();

/**
 * POST /api/feedback
 * Submit new feedback with AI processing
 */
router.post('/feedback', async (req, res) => {
    try {
        const { rating, review } = req.body;

        // Validation
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                error: 'Rating must be between 1 and 5'
            });
        }

        if (review === undefined || review === null) {
            return res.status(400).json({
                success: false,
                error: 'Review is required'
            });
        }

        const reviewText = String(review).trim();

        if (reviewText.length > 5000) {
            return res.status(400).json({
                success: false,
                error: 'Review must be less than 5000 characters'
            });
        }

        // Generate AI responses in parallel
        const [userResponse, summary, recommendedActions] = await Promise.all([
            generateUserResponse(rating, reviewText),
            generateSummary(reviewText),
            generateRecommendedActions(rating, reviewText)
        ]);

        // Save to database
        const feedback = new Feedback({
            rating,
            review: reviewText,
            userResponse,
            summary,
            recommendedActions,
            status: 'success'
        });

        await feedback.save();

        // Return response to user
        res.status(201).json({
            success: true,
            data: {
                id: feedback._id,
                userResponse,
                timestamp: feedback.timestamp
            }
        });

    } catch (error) {
        console.error('Error processing feedback:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to process feedback. Please try again.'
        });
    }
});

/**
 * GET /api/feedback
 * Retrieve all feedback for admin dashboard
 */
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find()
            .sort({ timestamp: -1 })
            .limit(1000); // Limit to most recent 1000

        res.json({
            success: true,
            data: feedbacks
        });

    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch feedback'
        });
    }
});

/**
 * GET /api/feedback/stats
 * Get analytics and statistics
 */
router.get('/feedback/stats', async (req, res) => {
    try {
        const totalCount = await Feedback.countDocuments();

        // Get rating distribution
        const ratingDistribution = await Feedback.aggregate([
            {
                $group: {
                    _id: '$rating',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        // Calculate average rating
        const avgResult = await Feedback.aggregate([
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: '$rating' }
                }
            }
        ]);

        const averageRating = avgResult.length > 0 ? avgResult[0].avgRating : 0;

        // Get recent feedback count (last 24 hours)
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const recentCount = await Feedback.countDocuments({
            timestamp: { $gte: oneDayAgo }
        });

        res.json({
            success: true,
            data: {
                totalCount,
                averageRating: Math.round(averageRating * 10) / 10,
                recentCount,
                ratingDistribution: ratingDistribution.reduce((acc, item) => {
                    acc[item._id] = item.count;
                    return acc;
                }, {})
            }
        });

    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch statistics'
        });
    }
});

export default router;
