# Deployment Guide

## Step-by-Step Deployment Instructions

### Prerequisites Checklist
- [ ] MongoDB Atlas account created
- [ ] MongoDB cluster created and connection string obtained
- [ ] Render account created
- [ ] Vercel account created
- [ ] GitHub repository created (optional but recommended)

---

## 1. MongoDB Atlas Setup (5 minutes)

1. Visit https://www.mongodb.com/cloud/atlas/register
2. Sign up for a free account
3. Create a new cluster (choose FREE tier - M0)
4. Wait for cluster to be created (2-3 minutes)
5. Click "Database Access" → "Add New Database User"
   - Username: `feedbackuser`
   - Password: Generate a secure password
   - User Privileges: Read and write to any database
6. Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is required for Render to connect
7. Click "Database" → "Connect" → "Connect your application"
8. Copy the connection string
9. Replace `<password>` with your database user password
10. Replace `<dbname>` with `feedback-system`

**Your final connection string should look like:**
```
mongodb+srv://feedbackuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/feedback-system?retryWrites=true&w=majority
```

---

## 2. Deploy Backend to Render (10 minutes)

### Option A: Deploy from GitHub (Recommended)

1. Push your code to GitHub:
   ```bash
   cd c:\Users\karan\code\Fynd2
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. Go to https://dashboard.render.com/
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: `feedback-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

6. Add Environment Variables:
   - Click "Advanced" → "Add Environment Variable"
   - Add these variables:
     ```
     MONGODB_URI = your_mongodb_connection_string_from_step_1
     GEMINI_API_KEY = AIzaSyDVYp0oIK6ZRjL6VM8zkvSwxvChxxS7oIc
     PORT = 3000
     NODE_ENV = production
     ```

7. Click "Create Web Service"
8. Wait for deployment (5-7 minutes)
9. **Copy your backend URL** (e.g., `https://feedback-backend-xxxx.onrender.com`)

### Option B: Deploy without GitHub

1. Install Render CLI or use manual upload
2. Follow similar steps but upload code directly

---

## 3. Deploy User Dashboard to Vercel (5 minutes)

### Option A: Deploy from GitHub (Recommended)

1. Go to https://vercel.com/
2. Sign up / Log in
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `user-dashboard`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   
6. Add Environment Variable:
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL = YOUR_RENDER_BACKEND_URL
     ```
     (Use the URL from Step 2, e.g., `https://feedback-backend-xxxx.onrender.com`)

7. Click "Deploy"
8. Wait for deployment (2-3 minutes)
9. **Copy your User Dashboard URL** (e.g., `https://user-dashboard-xxxx.vercel.app`)

### Option B: Deploy using Vercel CLI

```bash
cd user-dashboard
npm install -g vercel
vercel login
vercel --prod
# Follow prompts and add environment variable when asked
```

---

## 4. Deploy Admin Dashboard to Vercel (5 minutes)

1. In Vercel dashboard, click "Add New..." → "Project"
2. Import the same GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin-dashboard`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   
4. Add Environment Variable:
   - Click "Environment Variables"
   - Add:
     ```
     VITE_API_URL = YOUR_RENDER_BACKEND_URL
     ```
     (Same URL from Step 2)

5. Click "Deploy"
6. Wait for deployment (2-3 minutes)
7. **Copy your Admin Dashboard URL** (e.g., `https://admin-dashboard-xxxx.vercel.app`)

---

## 5. Verification (5 minutes)

### Test User Dashboard
1. Open your User Dashboard URL
2. Select a star rating
3. Write a review (e.g., "Great service!")
4. Click "Submit Feedback"
5. ✅ Verify you see an AI-generated response

### Test Admin Dashboard
1. Open your Admin Dashboard URL
2. ✅ Verify you see the feedback you just submitted
3. ✅ Verify analytics cards show correct data
4. ✅ Verify rating distribution chart
5. Wait 10 seconds
6. ✅ Verify auto-refresh works

### Test Backend API
```bash
# Replace with your actual backend URL
curl https://feedback-backend-xxxx.onrender.com/health
```

---

## 6. Final Submission URLs

After successful deployment, you should have:

1. **User Dashboard URL**: `https://user-dashboard-xxxx.vercel.app`
2. **Admin Dashboard URL**: `https://admin-dashboard-xxxx.vercel.app`
3. **Backend API URL**: `https://feedback-backend-xxxx.onrender.com`

---

## Troubleshooting

### Backend won't start on Render
- Check MongoDB connection string is correct
- Verify all environment variables are set
- Check Render logs for specific errors

### Dashboards show "Unable to connect to server"
- Verify backend is running (check Render dashboard)
- Verify `VITE_API_URL` environment variable is set correctly
- Check browser console for CORS errors
- Render free tier may sleep after inactivity - first request may take 30-60 seconds

### MongoDB connection errors
- Verify IP whitelist includes 0.0.0.0/0
- Check database user credentials
- Ensure database name is `feedback-system`

### LLM not generating responses
- Verify Gemini API key is correct
- Check backend logs for API errors
- Gemini API has rate limits on free tier

---

## Important Notes

⚠️ **Render Free Tier**: The backend will sleep after 15 minutes of inactivity. First request after sleep takes 30-60 seconds.

⚠️ **MongoDB Atlas Free Tier**: Limited to 512MB storage. Sufficient for this project.

⚠️ **Vercel Free Tier**: Unlimited deployments, but has bandwidth limits.

⚠️ **Gemini API**: Free tier has rate limits. For production use, consider upgrading.

---

## Updating After Deployment

### Update Backend
1. Push changes to GitHub
2. Render will auto-deploy (if auto-deploy enabled)
3. Or manually trigger deploy in Render dashboard

### Update Dashboards
1. Push changes to GitHub
2. Vercel will auto-deploy
3. Or manually trigger deploy in Vercel dashboard

---

## Cost Summary

All services used are **FREE**:
- ✅ MongoDB Atlas: Free M0 tier (512MB)
- ✅ Render: Free tier (750 hours/month)
- ✅ Vercel: Free tier (unlimited deployments)
- ✅ Google Gemini API: Free tier (60 requests/minute)

**Total Cost: $0/month** 🎉
