import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true,
    maxLength: 5000
  },
  userResponse: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  recommendedActions: {
    type: [String],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['success', 'error'],
    default: 'success'
  }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
