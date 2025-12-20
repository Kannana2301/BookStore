# BookStore App - Render Deployment Guide

This guide walks you through deploying both the Backend and Frontend to Render.

## Prerequisites

1. **GitHub Repository**: Your code must be pushed to GitHub
   - Repository: https://github.com/Kannana2301/BookStore

2. **MongoDB Atlas Cluster**: You already have this set up
   - Connection string stored in Backend `.env` as `MongoDBURI`

3. **Render Account**: Create free account at https://render.com

---

## Step 1: Prepare Your Repository

### 1a. Commit and push all changes to GitHub

```bash
cd c:\Users\kanna\Downloads\bookStoreApp\bookStoreApp
git add .
git commit -m "Fix API URLs for Render deployment and add .env.example files"
git push -u origin main
```

---

## Step 2: Deploy Backend to Render

### 2a. Create Backend Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Select **"Connect a repository"** and choose your `BookStore` repo
4. Fill in the form:
   - **Name**: `bookstore-backend` (or any name)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
   - **Root Directory**: `Backend` (leave blank if not needed, Render auto-detects)

### 2b. Set Environment Variables

1. Scroll down to **"Environment"** section
2. Add the following variables:
   - **Key**: `MongoDBURI`
   - **Value**: Your MongoDB Atlas connection string (from Backend/.env)
   - Example: `mongodb+srv://user:password@cluster.mongodb.net/bookstore?retryWrites=true&w=majority`
3. Click **"Create Web Service"**

**Wait 5-10 minutes** for the build and deployment to complete.

### 2c. Get Your Backend URL

- Once deployed, Render will assign a URL like: `https://bookstore-backend.onrender.com`
- Save this URL; you'll need it for the Frontend

---

## Step 3: Deploy Frontend to Render

### 3a. Create Frontend Service on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Select your `BookStore` repo again
4. Fill in the form:
   - **Name**: `bookstore-frontend` (or any name)
   - **Environment**: `Node` (even though it's React, Render runs a Node server)
   - **Build Command**: `cd Frontend && npm install && npm run build`
   - **Start Command**: `cd Frontend && npm run preview` or `npx serve -s dist -l 3000`
   - **Root Directory**: Leave blank

### 3b. Set Environment Variables for Frontend

1. In the **"Environment"** section, add:
   - **Key**: `VITE_API_URL`
   - **Value**: Your Backend URL from Step 2c
   - Example: `https://bookstore-backend.onrender.com`

2. Click **"Create Web Service"**

**Wait 5-10 minutes** for the build and deployment.

---

## Step 4: Update Frontend Configuration (Alternative: Use Vercel instead)

If you prefer a simpler Frontend deployment, use **Vercel** (recommended for React):

### Using Vercel (Recommended)

1. Go to https://vercel.com and sign up
2. Click **"Import Project"** and select your GitHub repo
3. Select **"Frontend"** folder as root
4. Add environment variable:
   - **Name**: `VITE_API_URL`
   - **Value**: Your Backend URL (from Step 2c)
5. Deploy

---

## Step 5: Verify Deployment

1. **Backend Health Check**:
   - Visit: `https://bookstore-backend.onrender.com/book`
   - You should see your seeded book data as JSON

2. **Frontend Access**:
   - Visit your Frontend URL (from Render or Vercel)
   - You should see books displayed on the homepage

3. **Check Logs**:
   - Render Dashboard → Your service → **"Logs"** tab
   - Look for connection errors or startup messages

---

## Troubleshooting

### Backend won't start ("Build failed")
- Check Backend logs for errors
- Ensure `package.json` exists in `Backend` folder
- Verify `MongoDBURI` environment variable is set correctly

### Frontend shows "Cannot fetch books"
- Open browser DevTools (F12) → Console
- Check for CORS or network errors
- Verify `VITE_API_URL` is set correctly in Frontend env vars
- Backend URL should be reachable and returning data

### MongoDB connection refused
- Go to MongoDB Atlas → Network Access
- Ensure Render's IP is whitelisted (or add `0.0.0.0/0` for testing)
- Verify connection string username/password are correct

### Socket.IO connection failed
- Socket will connect only after user login (by design)
- Backend must be running for Socket.IO to work
- Check browser console for detailed errors

---

## Local Testing Before Deployment

Before deploying, test locally with the same environment variables:

```bash
# Backend
cd Backend
set VITE_API_URL=http://localhost:4001
npm run dev

# Frontend (in another terminal)
cd Frontend
set VITE_API_URL=http://localhost:4001
npm run dev
```

Visit http://localhost:5173 to test.

---

## Important Notes

- **Render free tier**: Spins down after 15 minutes of inactivity (first request takes longer)
- **MongoDB Atlas free tier**: Allows up to 5 GB storage
- **CORS**: Backend already has `cors()` enabled for all origins
- **Seed Script**: Run `npm run seed` locally if you need to add more books to your Atlas cluster

---

## Quick Commands Reference

```bash
# Local development
npm run dev           # Backend
npm run build         # Frontend build
npm run seed          # Seed database

# Push to GitHub
git add .
git commit -m "Your message"
git push origin main
```

---

## Next Steps

1. ✅ Fix API URLs (DONE)
2. ✅ Create .env.example (DONE)
3. → Commit and push to GitHub
4. → Deploy Backend to Render
5. → Set VITE_API_URL in Frontend
6. → Deploy Frontend to Render (or Vercel)
7. → Test on deployed URLs

Happy deploying! 🚀
