# 📝 Render Deployment Checklist

Use this checklist to track your deployment progress!

## Phase 1: MongoDB Atlas Setup ☁️

- [ ] Created MongoDB Atlas account
- [ ] Created new project
- [ ] Created M0 FREE cluster
- [ ] Waited for cluster to be ready (3-5 minutes)
- [ ] Created database user with username and password
- [ ] Saved username and password securely
- [ ] Configured network access (0.0.0.0/0)
- [ ] Got connection string from Atlas
- [ ] Replaced `<username>` and `<password>` in connection string
- [ ] Added `/osm_db` database name to connection string
- [ ] Final connection string saved and ready

**Connection String Format:**
```
mongodb+srv://USERNAME:PASSWORD@cluster0.xxxxx.mongodb.net/osm_db?retryWrites=true&w=majority
```

---

## Phase 2: GitHub Setup 🐙

- [ ] Initialized git repository (`git init`)
- [ ] Added all files (`git add .`)
- [ ] Made initial commit (`git commit -m "Deploy to Render"`)
- [ ] Created GitHub repository
- [ ] Added remote origin
- [ ] Pushed to GitHub (`git push -u origin main`)
- [ ] Verified all files are on GitHub
- [ ] Confirmed `.env` is NOT in repository (check .gitignore)

**GitHub Repository URL:** _________________________________

---

## Phase 3: Backend Deployment 🔧

- [ ] Logged into Render Dashboard
- [ ] Clicked "New +" → "Web Service"
- [ ] Connected GitHub account
- [ ] Selected repository
- [ ] Configured backend service:
  - [ ] Name: `osm-backend` (or custom name)
  - [ ] Root Directory: `backend`
  - [ ] Build Command: `npm install`
  - [ ] Start Command: `npm start`
  - [ ] Region selected
- [ ] Added environment variables:
  - [ ] `MONGO_URI` (MongoDB Atlas connection string)
  - [ ] `JWT_SECRET` (random secure string)
  - [ ] `NODE_ENV` = `production`
  - [ ] `PORT` = `5000`
- [ ] Set Health Check Path: `/api/health`
- [ ] Clicked "Create Web Service"
- [ ] Waited for deployment to complete
- [ ] Service shows "Live" status
- [ ] Copied backend URL: _________________________________

### Backend Testing
- [ ] Tested health endpoint: `https://YOUR-BACKEND.onrender.com/api/health`
  - Should return: `{"ok":true,"time":"..."}`
- [ ] Opened Shell tab in Render Dashboard
- [ ] Ran: `node seed.js` to seed database
- [ ] Saw: "Database seeded successfully"
- [ ] Tested products endpoint: `https://YOUR-BACKEND.onrender.com/api/products`
  - Should return array of 5 products

---

## Phase 4: Frontend Deployment 🎨

- [ ] In Render Dashboard, clicked "New +" → "Static Site"
- [ ] Selected same GitHub repository
- [ ] Configured frontend service:
  - [ ] Name: `osm-frontend` (or custom name)
  - [ ] Root Directory: `frontend`
  - [ ] Build Command: `npm install && npm run build`
  - [ ] Publish Directory: `dist`
  - [ ] Region selected (same as backend)
- [ ] Added environment variable:
  - [ ] `VITE_API_URL` = `https://YOUR-BACKEND.onrender.com/api`
- [ ] Clicked "Create Static Site"
- [ ] Waited for deployment to complete
- [ ] Site shows "Live" status
- [ ] Copied frontend URL: _________________________________

---

## Phase 5: CORS Configuration 🔗

- [ ] Went to backend service in Render Dashboard
- [ ] Clicked "Environment" tab
- [ ] Added new environment variable:
  - [ ] Key: `FRONTEND_URL`
  - [ ] Value: `https://YOUR-FRONTEND.onrender.com`
- [ ] Clicked "Save Changes"
- [ ] Waited for automatic redeployment
- [ ] Backend redeployed successfully

---

## Phase 6: Full Testing 🧪

### Frontend Tests
- [ ] Opened frontend URL in browser
- [ ] Page loads without errors
- [ ] Products are displayed (loaded from MongoDB)
- [ ] Images/emojis show correctly
- [ ] Navigation works

### Authentication Tests
- [ ] Can open login modal
- [ ] Can login with test account:
  - Email: `test@example.com`
  - Password: `test123`
- [ ] Login successful (shows user info)
- [ ] Can logout

### Shopping Tests
- [ ] Can view product details
- [ ] Can add items to cart
- [ ] Cart count updates
- [ ] Can view cart modal
- [ ] Can update quantities in cart
- [ ] Can remove items from cart

### Checkout Tests
- [ ] Can proceed to checkout
- [ ] Can fill shipping information
- [ ] Can place order
- [ ] Order confirmation appears
- [ ] Can view order history

### API Tests
- [ ] Health: `https://YOUR-BACKEND.onrender.com/api/health` ✅
- [ ] Products: `https://YOUR-BACKEND.onrender.com/api/products` ✅
- [ ] Login works through frontend
- [ ] Orders are saved to MongoDB Atlas

---

## Phase 7: Production Checklist 🚀

- [ ] Changed JWT_SECRET to strong random string
- [ ] Verified MongoDB Atlas backup is enabled
- [ ] Set up monitoring alerts in Render
- [ ] Tested on mobile device
- [ ] Tested on different browsers (Chrome, Firefox, Safari)
- [ ] Checked for console errors
- [ ] Verified all images load
- [ ] Tested slow network (cold start after 15 min)
- [ ] Documented environment variables
- [ ] Created backup of MongoDB connection string

---

## Phase 8: Optional Enhancements 🌟

- [ ] Set up custom domain
- [ ] Upgrade to paid Render plan (no cold starts)
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Add Google Analytics
- [ ] Set up error tracking (Sentry)
- [ ] Enable MongoDB Atlas monitoring
- [ ] Set up automated backups
- [ ] Add SSL certificate for custom domain (automatic on Render)
- [ ] Configure CDN for assets
- [ ] Optimize images

---

## Deployment Information 📋

### MongoDB Atlas
- **Cluster Name:** _________________________________
- **Database Name:** `osm_db`
- **Username:** _________________________________
- **Region:** _________________________________

### Render Services
- **Backend Name:** _________________________________
- **Backend URL:** _________________________________
- **Frontend Name:** _________________________________
- **Frontend URL:** _________________________________
- **Region:** _________________________________

### Test Credentials
- **Email:** test@example.com
- **Password:** test123

---

## Troubleshooting Log 🔍

If you encounter issues, document them here:

**Issue 1:**
- Problem: _________________________________
- Solution: _________________________________
- Status: [ ] Resolved / [ ] Pending

**Issue 2:**
- Problem: _________________________________
- Solution: _________________________________
- Status: [ ] Resolved / [ ] Pending

**Issue 3:**
- Problem: _________________________________
- Solution: _________________________________
- Status: [ ] Resolved / [ ] Pending

---

## 🎉 Deployment Complete!

When all checkboxes are checked, your app is live!

**Share your app:**
- Frontend: _________________________________
- API Docs: _________________________________/api/health

**Next Steps:**
1. Share with friends and get feedback
2. Monitor usage in Render Dashboard
3. Check MongoDB Atlas for database metrics
4. Plan new features
5. Consider upgrading to paid plans for production use

---

**Deployment Date:** _________________________________  
**Deployed By:** _________________________________  
**Version:** 1.0.0

---

## Support

If you need help:
- Check `RENDER_DEPLOYMENT_GUIDE.md` for detailed instructions
- Check `QUICK_DEPLOY.md` for quick reference
- Visit Render Community: https://community.render.com
- MongoDB Atlas Support: https://support.mongodb.com
