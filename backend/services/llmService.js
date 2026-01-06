import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

/**
 * Generate a personalized user response based on rating and review
 */
export async function generateUserResponse(rating, review) {
    try {
        const reviewText = review.trim() || 'No review provided';

        const prompt = `You are a friendly customer service representative. A user has submitted feedback with a ${rating}-star rating (out of 5) and the following review: "${reviewText}".

Generate a warm, personalized thank-you message (2-3 sentences) that:
- Thanks them for their feedback
- Acknowledges their rating appropriately
- Is genuine and professional

Keep it concise and friendly.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating user response:', error);
        // Fallback response
        return `Thank you for your ${rating}-star rating! We appreciate you taking the time to share your feedback with us.`;
    }
}

/**
 * Generate a summary of the review for admin dashboard
 */
export async function generateSummary(review) {
    try {
        const reviewText = review.trim();

        if (!reviewText) {
            return 'No review text provided';
        }

        if (reviewText.length < 20) {
            return reviewText;
        }

        const prompt = `Summarize the following customer review in one concise sentence (max 15 words):

"${reviewText}"

Summary:`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text().trim();
    } catch (error) {
        console.error('Error generating summary:', error);
        // Fallback to truncated review
        return reviewText.substring(0, 100) + (reviewText.length > 100 ? '...' : '');
    }
}

/**
 * Generate recommended actions based on rating and review
 */
export async function generateRecommendedActions(rating, review) {
    try {
        const reviewText = review.trim() || 'No review provided';

        const prompt = `You are a customer success manager. Based on this customer feedback:
- Rating: ${rating}/5 stars
- Review: "${reviewText}"

Suggest 2-3 specific, actionable next steps for the business team. Format as a JSON array of strings.
Each action should be clear, specific, and professional.

Example format: ["Follow up with customer within 24 hours", "Investigate reported issue with checkout process"]

Return ONLY the JSON array, no other text.`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        // Try to parse JSON response
        try {
            // Extract JSON array from response
            const jsonMatch = text.match(/\[[\s\S]*\]/);
            if (jsonMatch) {
                const actions = JSON.parse(jsonMatch[0]);
                return actions;
            }
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }

        // Fallback actions based on rating
        if (rating <= 2) {
            return [
                'Reach out to customer immediately to address concerns',
                'Investigate and resolve reported issues',
                'Offer compensation or solution'
            ];
        } else if (rating === 3) {
            return [
                'Follow up to understand areas for improvement',
                'Review feedback with relevant team'
            ];
        } else {
            return [
                'Thank customer for positive feedback',
                'Share feedback with team for motivation'
            ];
        }
    } catch (error) {
        console.error('Error generating recommended actions:', error);
        // Fallback actions
        return ['Review feedback with team', 'Follow up if necessary'];
    }
}
