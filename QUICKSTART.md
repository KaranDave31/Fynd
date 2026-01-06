# Quick Start Guide - Run Locally

## Step 1: Set up MongoDB Atlas (5 minutes)

You need a database to store feedback. Follow these steps:

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for a FREE account
3. Create a FREE cluster (M0 tier)
4. Click "Database Access" → "Add New Database User"
   - Username: `feedbackuser`
   - Password: Create a password (save it!)
   - Role: Atlas admin
5. Click "Network Access" → "Add IP Address" → "Allow Access from Anywhere" (0.0.0.0/0)
6. Click "Database" → "Connect" → "Connect your application"
7. Copy the connection string
8. Replace `<password>` with your password
9. Replace `<dbname>` with `feedback-system`

**Your connection string should look like:**
```
mongodb+srv://feedbackuser:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/feedback-system?retryWrites=true&w=majority
```

## Step 2: Configure Backend

1. Open `backend/.env` file
2. Replace the MONGODB_URI line with your connection string from Step 1
3. Save the file

## Step 3: Start Backend (Terminal 1)

```bash
cd backend
npm start
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server running on port 3000
```

## Step 4: Start User Dashboard (Terminal 2)

Open a NEW terminal window:

```bash
cd user-dashboard
npm run dev
```

You should see:
```
Local: http://localhost:5173/
```

## Step 5: Start Admin Dashboard (Terminal 3)

Open a NEW terminal window:

```bash
cd admin-dashboard
npm run dev
```

You should see:
```
Local: http://localhost:5174/
```

## Step 6: Open in Browser

1. **User Dashboard**: http://localhost:5173
2. **Admin Dashboard**: http://localhost:5174

## Test It Out!

1. Go to http://localhost:5173 (User Dashboard)
2. Select a star rating
3. Write a review
4. Click "Submit Feedback"
5. See the AI-generated response!
6. Go to http://localhost:5174 (Admin Dashboard)
7. See your feedback appear with analytics!

---

## Troubleshooting

**"MongoDB connection error"**
- Check your connection string is correct in `backend/.env`
- Make sure you replaced `<password>` and `<dbname>`
- Verify Network Access allows 0.0.0.0/0

**"Unable to connect to server" in dashboards**
- Make sure backend is running on port 3000
- Check `backend/.env` and dashboard `.env` files

**Port already in use**
- Close other applications using ports 3000, 5173, or 5174
- Or change the PORT in the respective `.env` files
