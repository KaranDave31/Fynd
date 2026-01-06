# Two-Dashboard AI Feedback System

A production-grade web application with user-facing feedback submission and admin analytics dashboards.

## 🏗️ Architecture

- **Backend**: Node.js + Express + MongoDB Atlas + Google Gemini AI
- **User Dashboard**: React + Vite (deployed on Vercel)
- **Admin Dashboard**: React + Vite (deployed on Vercel)
- **Database**: MongoDB Atlas (free tier)
- **LLM**: Google Gemini API

## 📋 Prerequisites

1. Node.js (v20.10.0 or higher)
2. MongoDB Atlas account (free tier)
3. Google Gemini API key
4. Vercel account (for deployment)
5. Render account (for backend deployment)

## 🚀 Setup Instructions

### 1. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password
7. Replace `<dbname>` with `feedback-system`

Example connection string:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/feedback-system?retryWrites=true&w=majority
```

### 2. Backend Setup

```bash
cd backend
npm install

# Create .env file with your credentials
echo "MONGODB_URI=your_mongodb_connection_string" > .env
echo "GEMINI_API_KEY=AIzaSyDVYp0oIK6ZRjL6VM8zkvSwxvChxxS7oIc" >> .env
echo "PORT=3000" >> .env
echo "NODE_ENV=development" >> .env

# Start the server
npm start
```

The backend will run on `http://localhost:3000`

### 3. User Dashboard Setup

```bash
cd user-dashboard
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000" > .env

# Start the development server
npm run dev
```

The user dashboard will run on `http://localhost:5173`

### 4. Admin Dashboard Setup

```bash
cd admin-dashboard
npm install

# Create .env file
echo "VITE_API_URL=http://localhost:3000" > .env

# Start the development server
npm run dev
```

The admin dashboard will run on `http://localhost:5174`

## 🌐 Deployment

### Deploy Backend to Render

1. Go to [Render](https://render.com/)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Environment Variables**:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `GEMINI_API_KEY`: Your Gemini API key
     - `PORT`: 3000
     - `NODE_ENV`: production
5. Deploy

Note your backend URL (e.g., `https://your-app.onrender.com`)

### Deploy User Dashboard to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Import your repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `user-dashboard`
   - **Environment Variables**:
     - `VITE_API_URL`: Your Render backend URL
4. Deploy

### Deploy Admin Dashboard to Vercel

1. Go to [Vercel](https://vercel.com/)
2. Import your repository (or add another project)
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin-dashboard`
   - **Environment Variables**:
     - `VITE_API_URL`: Your Render backend URL
4. Deploy

## 🧪 Testing

### Test Backend API

```bash
# Health check
curl http://localhost:3000/health

# Submit feedback
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{"rating": 5, "review": "Great service!"}'

# Get all feedback
curl http://localhost:3000/api/feedback

# Get statistics
curl http://localhost:3000/api/feedback/stats
```

### Test User Dashboard

1. Open `http://localhost:5173`
2. Select a star rating (1-5)
3. Write a review (optional)
4. Submit
5. Verify AI-generated response appears

### Test Admin Dashboard

1. Open `http://localhost:5174`
2. Verify analytics cards show correct data
3. Verify rating distribution chart
4. Verify feedback list displays all submissions
5. Test search and filter functionality
6. Verify auto-refresh (every 10 seconds)

## 📁 Project Structure

```
Fynd2/
├── backend/
│   ├── models/
│   │   └── Feedback.js          # MongoDB schema
│   ├── routes/
│   │   └── feedback.js          # API endpoints
│   ├── services/
│   │   └── llmService.js        # Google Gemini integration
│   ├── server.js                # Express server
│   ├── package.json
│   └── .env
├── user-dashboard/
│   ├── src/
│   │   ├── components/
│   │   │   ├── StarRating.jsx
│   │   │   └── StarRating.css
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── .env
└── admin-dashboard/
    ├── src/
    │   ├── components/
    │   │   ├── Analytics.jsx
    │   │   ├── Analytics.css
    │   │   ├── FeedbackCard.jsx
    │   │   └── FeedbackCard.css
    │   ├── App.jsx
    │   ├── App.css
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── package.json
    ├── vercel.json
    └── .env
```

## ✨ Features

### User Dashboard
- ⭐ Interactive star rating (1-5)
- ✍️ Review text input with character counter
- 🤖 AI-generated personalized responses
- ✅ Success/error state handling
- 🎨 Modern glassmorphism design
- 📱 Fully responsive

### Admin Dashboard
- 📊 Real-time analytics (total feedback, average rating, recent count)
- 📈 Rating distribution visualization
- 🔄 Auto-refresh every 10 seconds
- 🔍 Search functionality
- 🎯 Filter by rating
- 📋 Detailed feedback cards with:
  - User rating
  - User review
  - AI-generated summary
  - AI-suggested recommended actions
- 🎨 Professional admin interface
- 📱 Fully responsive

### Backend API
- 🔒 Server-side LLM processing
- ✅ Input validation and error handling
- 🗄️ MongoDB persistence
- 🌐 CORS enabled
- 📝 Comprehensive logging
- 🚀 RESTful API design

## 🔧 API Endpoints

### POST /api/feedback
Submit new feedback with AI processing

**Request Body:**
```json
{
  "rating": 5,
  "review": "Great service!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "userResponse": "Thank you for your 5-star rating! We're thrilled...",
    "timestamp": "2026-01-06T10:00:00.000Z"
  }
}
```

### GET /api/feedback
Retrieve all feedback

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "rating": 5,
      "review": "Great service!",
      "userResponse": "Thank you...",
      "summary": "Customer praised the service quality",
      "recommendedActions": ["Share feedback with team", "..."],
      "timestamp": "2026-01-06T10:00:00.000Z",
      "status": "success"
    }
  ]
}
```

### GET /api/feedback/stats
Get analytics and statistics

**Response:**
```json
{
  "success": true,
  "data": {
    "totalCount": 42,
    "averageRating": 4.5,
    "recentCount": 5,
    "ratingDistribution": {
      "1": 2,
      "2": 3,
      "3": 5,
      "4": 12,
      "5": 20
    }
  }
}
```

## 🛡️ Error Handling

The system handles:
- ❌ Empty reviews
- ❌ Long reviews (>5000 characters)
- ❌ Invalid ratings
- ❌ LLM API failures (with fallback responses)
- ❌ Database connection errors
- ❌ Network failures

## 📝 License

MIT
