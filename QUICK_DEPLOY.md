# Render Deployment - Quick Steps

## ✅ What's Done
- ✅ Fixed all hardcoded `http://localhost:4001` URLs to use `VITE_API_URL` environment variable
- ✅ Created `.env.example` files for reference
- ✅ Created `RENDER_DEPLOYMENT.md` with detailed steps
- ✅ Pushed all changes to GitHub

## 🚀 Now Deploy (Follow These Steps)

### STEP 1: Deploy Backend to Render
```
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo (Kannana2301/BookStore)
4. Configure:
   - Name: bookstore-backend
   - Environment: Node
   - Build Command: npm install
   - Start Command: node index.js
   - Root Directory: Backend
5. Add Environment Variables:
   - MongoDBURI: (your MongoDB Atlas connection string)
6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
8. Copy the Backend URL (e.g., https://bookstore-backend.onrender.com)
```

### STEP 2: Deploy Frontend to Render
```
1. Go to https://dashboard.render.com
2. Click "New +" → "Web Service"
3. Connect your GitHub repo again
4. Configure:
   - Name: bookstore-frontend
   - Environment: Node
   - Build Command: cd Frontend && npm install && npm run build
   - Start Command: cd Frontend && npm run preview
5. Add Environment Variables:
   - VITE_API_URL: (Backend URL from Step 1)
6. Click "Create Web Service"
7. Wait 5-10 minutes for deployment
```

### STEP 3: Test Your Deployment
```
- Backend: Visit https://bookstore-backend.onrender.com/book
  → You should see all your books as JSON
  
- Frontend: Visit your Frontend URL from Render
  → You should see books displayed on the homepage
```

## 📌 Important Notes

- **First request may be slow**: Render free tier spins down after 15 minutes (normal)
- **Books should be visible**: We already seeded 23 books to your MongoDB Atlas cluster
- **Environment variables**: Make sure you set VITE_API_URL correctly (no trailing slash)
- **Need more books?**: Run `npm run seed` locally to add more

## 🔗 Useful Links
- Render Dashboard: https://dashboard.render.com
- MongoDB Atlas: https://cloud.mongodb.com
- GitHub Repo: https://github.com/Kannana2301/BookStore
- Deployment Guide: See RENDER_DEPLOYMENT.md

## ⚠️ If Something Goes Wrong

1. **Check Backend Logs**: Render Dashboard → bookstore-backend → Logs
2. **Check Frontend Logs**: Render Dashboard → bookstore-frontend → Logs
3. **Test locally first**: Run `npm run dev` in Backend and Frontend locally
4. **Verify MongoDB**: Visit https://cloud.mongodb.com and check if books are there

---

Ready? Head to https://dashboard.render.com and start deploying! 🎉
