# BookStore Frontend - Vercel Deployment Guide

Your Backend URL: **https://bookstore-6o2s.onrender.com**

## Prerequisites

- ✅ Backend deployed to Render
- ✅ Code pushed to GitHub (Kannana2301/BookStore)
- ✅ Vercel account (free signup at https://vercel.com)

---

## Step-by-Step Deployment

### **Step 1: Sign Up/Log In to Vercel**

1. Go to https://vercel.com
2. Click **"Sign Up"** (or **"Log In"** if you already have an account)
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub account

---

### **Step 2: Create a New Project**

1. After logging in, you'll see the **Vercel Dashboard**
2. Click **"Add New..."** → **"Project"**
3. Click **"Import Git Repository"**
4. Find and select **`Kannana2301/BookStore`** from your repositories
5. Click **"Select"**

---

### **Step 3: Configure Project Settings**

You'll see the "Import Git Repository" dialog:

#### **Framework Preset**
- Select: **React** (if not auto-detected)

#### **Root Directory**
- Click **"Edit"** next to Root Directory
- Set to: **`Frontend`** (important!)
- Click **"Save"**

#### **Build and Output Settings**
- **Build Command**: `npm run build` (should be auto-filled)
- **Output Directory**: `dist` (should be auto-filled)
- **Install Command**: `npm install` (should be auto-filled)

---

### **Step 4: Add Environment Variables** ⚠️ Important!

Still in the same dialog, scroll down to **"Environment Variables"** section:

1. Click **"Add"**
2. **Name**: `VITE_API_URL`
3. **Value**: `https://bookstore-6o2s.onrender.com` (your backend URL)
4. **Select Environments**: Select **Production**, **Preview**, and **Development**
5. Click **"Add"**

**Result should look like:**
```
VITE_API_URL = https://bookstore-6o2s.onrender.com
```

---

### **Step 5: Deploy**

1. Review all settings one more time:
   - ✅ Root Directory: `Frontend`
   - ✅ Build Command: `npm run build`
   - ✅ Output Directory: `dist`
   - ✅ VITE_API_URL: `https://bookstore-6o2s.onrender.com`

2. Click **"Deploy"**

3. **Wait 2-3 minutes** for the build and deployment to complete

4. You'll see:
   - ✅ "Build" stage (compiling React)
   - ✅ "Deployment" stage (uploading to Vercel's servers)
   - ✅ "Production" live indicator

---

### **Step 6: Get Your Frontend URL**

Once deployed successfully, you'll see a screen like:

```
🎉 Congratulations!
Your project has been successfully deployed.

https://bookstore-[random-name].vercel.app
```

**Copy this URL** — that's your live Frontend!

---

### **Step 7: Test Your Deployment**

#### **Test Frontend**
1. Visit your Vercel Frontend URL (e.g., `https://bookstore-xyz.vercel.app`)
2. You should see:
   - ✅ Homepage with banner
   - ✅ "Free Books" section showing books
   - ✅ Navigation works

#### **Test API Connection**
1. Go to **Courses** page → you should see all books
2. Try **Login**:
   - Email: `admin@gmail.com`
   - Password: `admin123`
3. Try **adding a book** (Admin Dashboard if logged in as admin)

#### **Test Backend Connection**
1. Open browser **DevTools** (F12)
2. Go to **Network** tab
3. Reload the page
4. Look for requests to `https://bookstore-6o2s.onrender.com/book`
5. You should see a successful response (Status 200)

---

### **Step 8: Update Vercel Domain (Optional)**

If you want a custom domain:

1. Go to Vercel Dashboard → Your Project
2. Click **"Settings"** → **"Domains"**
3. Add your custom domain and follow instructions

---

## Troubleshooting

### **Books not showing on Frontend**

**Symptom**: Page loads but no books visible

**Fix**:
1. Check browser console (F12 → Console)
2. Look for error: `"Cannot GET https://bookstore-6o2s.onrender.com/book"`
3. Solutions:
   - Verify Backend is running: Visit https://bookstore-6o2s.onrender.com/book in browser
   - Check VITE_API_URL in Vercel → Project Settings → Environment Variables
   - Redeploy Frontend if you just added the env var

### **Build Failed error**

**Symptom**: "Build failed" during deployment

**Fix**:
1. Check build logs in Vercel
2. Common issues:
   - Missing `npm install` in build
   - Wrong Root Directory (should be `Frontend`)
   - Syntax errors in code

### **CORS Error**

**Symptom**: `"Access to XMLHttpRequest blocked by CORS policy"`

**Fix**: This shouldn't happen because Backend has CORS enabled, but if it does:
1. Backend `.env` should have `CORS` middleware
2. Check Backend logs on Render

### **"Cannot find module" errors**

**Symptom**: Build fails with `Module not found`

**Fix**:
1. Check that `package.json` exists in `Frontend` folder
2. Ensure all imports use correct paths
3. Run `npm install` locally to verify

---

## What's Deployed

### **Frontend Files**
- React components (Navbar, Courses, etc.)
- Static assets (images, fonts)
- Built optimized JavaScript bundle

### **Backend Files** (on Render)
- Node.js Express server
- MongoDB connection
- Book and User APIs

### **Database** (MongoDB Atlas)
- 23 seeded books
- User accounts
- Authentication data

---

## Environment Variables Explained

```
VITE_API_URL = https://bookstore-6o2s.onrender.com
```

This tells your Frontend React app where to find the Backend API. 

In your code:
```javascript
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4001";
```

- **On Vercel**: Uses `https://bookstore-6o2s.onrender.com` ✓
- **Locally**: Falls back to `http://localhost:4001` ✓

---

## Quick Reference

| Component | URL | Status |
|-----------|-----|--------|
| Backend | https://bookstore-6o2s.onrender.com | ✅ Deployed |
| Frontend | https://bookstore-[name].vercel.app | 🚀 Deploying |
| Database | MongoDB Atlas (cloud) | ✅ Configured |
| GitHub | https://github.com/Kannana2301/BookStore | ✅ Source |

---

## Next Steps

1. ✅ Deploy Backend to Render (DONE)
2. → Deploy Frontend to Vercel (IN PROGRESS - THIS GUIDE)
3. → Test both URLs together
4. → Share your live app! 🎉

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Backend Status**: Check Render Dashboard
- **Database**: Check MongoDB Atlas Dashboard

Happy deploying! 🚀
