# AI Feedback System and Dashboards

A simple web application with user-facing feedback submission and admin analytics dashboards.

## Architecture

- **Backend**: Node.js + Express + MongoDB Atlas + Google Gemini AI
- **User Dashboard**: React + Vite (deployed on Vercel)
- **Admin Dashboard**: React + Vite (deployed on Vercel)
- **Backend Deployment**: Render
- **Database**: MongoDB Atlas 
- **LLM**: Google Gemini API

The backend will run on `http://localhost:3000`

The user dashboard will run on `http://localhost:5173`

The admin dashboard will run on `http://localhost:5174`

The backend is running on `https://fynd-r23u.onrender.com`


## Features

### User Dashboard
- Interactive star rating (1-5)
- Review text input with character counter
- AI-generated personalized responses
- Success/error state handling
- Modern glassmorphism design
- Fully responsive

### Admin Dashboard
- Real-time analytics (total feedback, average rating, recent count)
- Rating distribution visualization
- Auto-refresh every 10 seconds
- Search functionality
- Filter by rating
- Detailed feedback cards with:
  - User rating
  - User review
  - AI-generated summary
  - AI-suggested recommended actions
- Professional admin interface
- Fully responsive


