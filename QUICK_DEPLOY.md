# 🚀 RENDER DEPLOYMENT - QUICK REFERENCE

## ⚡ Fast Track Deployment (10 Minutes)

### 1️⃣ MongoDB Atlas (2 minutes)
```
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create cluster (M0 FREE)
3. Create database user
4. Network Access → Allow 0.0.0.0/0
5. Get connection string:
   mongodb+srv://username:password@cluster.mongodb.net/osm_db
```

### 2️⃣ Push to GitHub (1 minute)
```powershell
git init
git add .
git commit -m "Deploy to Render"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 3️⃣ Deploy Backend (3 minutes)
```
Render Dashboard → New Web Service → Connect GitHub Repo

Settings:
- Name: osm-backend
- Root Directory: backend
- Build: npm install
- Start: npm start

Environment Variables:
- MONGO_URI: [Your MongoDB Atlas connection string]
- JWT_SECRET: [Random secure string]
- NODE_ENV: production
- PORT: 5000

Health Check: /api/health

→ Create Web Service
→ Wait for deployment
→ Shell tab → Run: node seed.js
```

### 4️⃣ Deploy Frontend (3 minutes)
```
Render Dashboard → New Static Site → Connect GitHub Repo

Settings:
- Name: osm-frontend
- Root Directory: frontend
- Build: npm install && npm run build
- Publish: dist

Environment Variables:
- VITE_API_URL: https://YOUR-BACKEND.onrender.com/api

→ Create Static Site
→ Wait for deployment
```

### 5️⃣ Update CORS (1 minute)
```
Backend Service → Environment → Add:
- FRONTEND_URL: https://YOUR-FRONTEND.onrender.com

→ Save (auto redeploys)
```

---

## 📋 Environment Variables Needed

### Backend (osm-backend)
```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/osm_db?retryWrites=true&w=majority
JWT_SECRET=your_super_secure_random_string_change_this
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://YOUR-FRONTEND.onrender.com
```

### Frontend (osm-frontend)
```
VITE_API_URL=https://YOUR-BACKEND.onrender.com/api
```

---

## ✅ Testing Checklist

- [ ] Backend health: `https://YOUR-BACKEND.onrender.com/api/health`
- [ ] Products API: `https://YOUR-BACKEND.onrender.com/api/products`
- [ ] Frontend loads: `https://YOUR-FRONTEND.onrender.com`
- [ ] Products display on frontend
- [ ] Login works (test@example.com / test123)
- [ ] Can add to cart
- [ ] Can place order

---

## 🔧 Common Fixes

### Products Not Loading?
```
→ Backend Shell → Run: node seed.js
```

### CORS Error?
```
→ Backend → Environment → Add FRONTEND_URL
→ Save (auto redeploys)
```

### Can't Connect to MongoDB?
```
→ Check MongoDB Atlas IP whitelist (0.0.0.0/0)
→ Verify connection string format
→ Check username/password
```

### Cold Start (Slow First Load)?
```
Normal on free tier - 30-60 seconds after 15 min inactivity
Upgrade to paid plan for instant response
```

---

## 📱 Your Live URLs

```
Frontend: https://[YOUR-FRONTEND-NAME].onrender.com
Backend:  https://[YOUR-BACKEND-NAME].onrender.com
API:      https://[YOUR-BACKEND-NAME].onrender.com/api
```

---

## 🔄 Update Your App

```powershell
# Make changes
git add .
git commit -m "Your changes"
git push

# Render auto-deploys! ✨
```

---

## 💡 Pro Tips

1. **Free tier sleeps** → First load after 15 min takes ~1 minute
2. **Keep awake** → Use UptimeRobot to ping every 10 minutes
3. **Logs** → Check Render Dashboard → Logs for errors
4. **Database** → MongoDB Atlas shows query performance
5. **Upgrade** → $7/month removes sleep, faster performance

---

## 🆘 Quick Help

| Issue | Solution |
|-------|----------|
| Build fails | Check Node version, run `npm install` locally first |
| 500 error | Check backend logs in Render Dashboard |
| CORS error | Add frontend URL to backend environment |
| DB error | Check MongoDB connection string and IP whitelist |

---

## 📞 Support Links

- **Render Docs**: https://render.com/docs
- **MongoDB Docs**: https://docs.atlas.mongodb.com
- **Full Guide**: See `RENDER_DEPLOYMENT_GUIDE.md`

---

**Ready? Start with MongoDB Atlas, then deploy backend, then frontend!** 🚀
