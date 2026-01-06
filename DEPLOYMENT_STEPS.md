# Step-by-Step Deployment Guide

## Prerequisites
- ✅ MongoDB Atlas database (you already have this)
- ✅ Google Gemini API key (you already have this)
- GitHub account (free)
- Vercel account (free)
- Render account (free)

---

## STEP 1: Push Code to GitHub (10 minutes)

### 1.1 Create a GitHub Repository

1. Go to https://github.com/new
2. Repository name: `feedback-system` (or any name you like)
3. Make it **Public** or **Private** (your choice)
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### 1.2 Initialize Git and Push Code

Open a terminal in your project folder and run:

```bash
cd c:\Users\karan\code\Fynd2

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Two-dashboard AI feedback system"

# Add your GitHub repository (replace with YOUR repository URL)
git remote add origin https://github.com/YOUR_USERNAME/feedback-system.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**Note**: Replace `YOUR_USERNAME` with your actual GitHub username.

---

## STEP 2: Deploy Backend to Render (15 minutes)

### 2.1 Create Render Account
1. Go to https://render.com/
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended) or email

### 2.2 Create New Web Service

1. Click "New +" → "Web Service"
2. Click "Connect account" to connect your GitHub
3. Select your `feedback-system` repository
4. Click "Connect"

### 2.3 Configure Web Service

Fill in these settings:

- **Name**: `feedback-backend` (or any name)
- **Region**: Choose closest to you
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### 2.4 Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these 4 variables:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB connection string (from your .env file) |
| `GEMINI_API_KEY` | `AIzaSyDVYp0oIK6ZRjL6VM8zkvSwxvChxxS7oIc` |
| `PORT` | `3000` |
| `NODE_ENV` | `production` |

### 2.5 Deploy

1. Click "Create Web Service"
2. Wait 5-10 minutes for deployment
3. Once deployed, you'll see a URL like: `https://feedback-backend-xxxx.onrender.com`
4. **COPY THIS URL** - you'll need it for the next steps!

### 2.6 Test Backend

Visit: `https://feedback-backend-xxxx.onrender.com/health`

You should see:
```json
{
  "status": "ok",
  "timestamp": "...",
  "mongodb": "connected"
}
```

---

## STEP 3: Deploy User Dashboard to Vercel (10 minutes)

### 3.1 Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub (recommended)

### 3.2 Import Project

1. Click "Add New..." → "Project"
2. Click "Import" next to your `feedback-system` repository
3. If you don't see it, click "Adjust GitHub App Permissions" and grant access

### 3.3 Configure User Dashboard

- **Framework Preset**: Vite (should auto-detect)
- **Root Directory**: Click "Edit" → Select `user-dashboard`
- **Build Command**: `npm run build` (auto-filled)
- **Output Directory**: `dist` (auto-filled)

### 3.4 Add Environment Variable

Click "Environment Variables"

Add this variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your Render backend URL (e.g., `https://feedback-backend-xxxx.onrender.com`) |

**IMPORTANT**: Do NOT include a trailing slash!

### 3.5 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Once deployed, you'll get a URL like: `https://feedback-system-xxxx.vercel.app`
4. **COPY THIS URL** - this is your User Dashboard!

---

## STEP 4: Deploy Admin Dashboard to Vercel (10 minutes)

### 4.1 Import Another Project

1. In Vercel dashboard, click "Add New..." → "Project"
2. Click "Import" next to your `feedback-system` repository again

### 4.2 Configure Admin Dashboard

- **Framework Preset**: Vite
- **Root Directory**: Click "Edit" → Select `admin-dashboard`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

### 4.3 Add Environment Variable

Click "Environment Variables"

Add this variable:

| Name | Value |
|------|-------|
| `VITE_API_URL` | Your Render backend URL (same as before) |

### 4.4 Deploy

1. Click "Deploy"
2. Wait 2-3 minutes
3. Once deployed, you'll get a URL like: `https://admin-dashboard-xxxx.vercel.app`
4. **COPY THIS URL** - this is your Admin Dashboard!

---

## STEP 5: Test Your Deployed Application (5 minutes)

### 5.1 Test User Dashboard

1. Open your User Dashboard URL in a browser
2. Select a star rating
3. Write a review
4. Click "Submit Feedback"
5. ✅ You should see an AI-generated response!

### 5.2 Test Admin Dashboard

1. Open your Admin Dashboard URL in a browser
2. ✅ You should see your submitted feedback
3. ✅ Analytics should show correct data
4. ✅ Wait 10 seconds - auto-refresh should work

---

## 🎉 You're Done!

Your application is now live on the internet!

**Your Production URLs:**
- 🌐 **User Dashboard**: `https://your-user-dashboard.vercel.app`
- 📊 **Admin Dashboard**: `https://your-admin-dashboard.vercel.app`
- 🔧 **Backend API**: `https://your-backend.onrender.com`

---

## Troubleshooting

### Backend shows "Application failed to respond"
- Check Render logs for errors
- Verify MongoDB connection string is correct
- Wait 30-60 seconds (free tier takes time to wake up)

### Dashboard shows "Unable to connect to server"
- Verify `VITE_API_URL` is set correctly in Vercel
- Make sure backend URL has NO trailing slash
- Check backend is running (visit `/health` endpoint)

### "CORS error" in browser console
- Backend CORS is configured to allow all origins
- If issue persists, check Render logs

---

## Updating Your Deployment

### To update after making changes:

1. Make your code changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push
   ```
3. Vercel will auto-deploy (2-3 minutes)
4. Render will auto-deploy (5-7 minutes)

---

## Cost Summary

Everything is **100% FREE**:
- ✅ Render: Free tier (750 hours/month)
- ✅ Vercel: Free tier (unlimited deployments)
- ✅ MongoDB Atlas: Free tier (512MB)
- ✅ Google Gemini API: Free tier

**Total: $0/month** 🎉
