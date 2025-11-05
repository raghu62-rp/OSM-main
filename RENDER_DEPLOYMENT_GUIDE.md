# 🚀 Deploy Online Shopping Mall to Render

Complete guide to deploy your full-stack application to Render with MongoDB Atlas.

---

## 📋 Prerequisites

1. ✅ GitHub account
2. ✅ Render account (sign up at https://render.com)
3. ✅ MongoDB Atlas account (sign up at https://www.mongodb.com/cloud/atlas)
4. ✅ Your code pushed to GitHub repository

---

## 🗄️ STEP 1: Set Up MongoDB Atlas (Cloud Database)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new project (e.g., "Online Shopping Mall")

### 1.2 Create a Cluster
1. Click **"Build a Database"**
2. Choose **"M0 FREE"** tier
3. Select your preferred region (choose closest to your users)
4. Click **"Create Cluster"** (takes 3-5 minutes)

### 1.3 Configure Database Access
1. Go to **"Database Access"** in left sidebar
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Create username and strong password (save these!)
5. Set **"Built-in Role"** to **"Read and write to any database"**
6. Click **"Add User"**

### 1.4 Configure Network Access
1. Go to **"Network Access"** in left sidebar
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
   - This allows Render to connect from any IP
4. Click **"Confirm"**

### 1.5 Get Connection String
1. Go to **"Database"** in left sidebar
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<username>` and `<password>` with your credentials
6. Add database name after `.net/`: 
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/osm_db?retryWrites=true&w=majority
   ```
7. **Save this connection string** - you'll need it for Render!

---

## 📦 STEP 2: Prepare Your Code for Deployment

### 2.1 Push to GitHub

If you haven't already, initialize git and push to GitHub:

```powershell
# Navigate to project root
cd c:\Users\patha\Downloads\OSM-main

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Prepare for Render deployment"

# Add remote (replace with your GitHub repo URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

**Important**: Make sure `.env` file is in `.gitignore` (already configured)

### 2.2 Verify Configuration Files

✅ All necessary files have been created:
- `render.yaml` - Render deployment configuration
- `backend/.gitignore` - Backend git ignore
- `frontend/.gitignore` - Frontend git ignore
- Updated `backend/server.js` - CORS for production
- Updated `frontend/src/config.js` - Dynamic API URL
- Updated `package.json` files - Node engine specifications

---

## 🌐 STEP 3: Deploy Backend to Render

### 3.1 Create New Web Service

1. Log in to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account (if not already)
4. Select your repository: `YOUR_USERNAME/YOUR_REPO_NAME`
5. Click **"Connect"**

### 3.2 Configure Backend Service

**Basic Settings:**
- **Name**: `osm-backend` (or your preferred name)
- **Region**: Choose closest to your users (e.g., Oregon)
- **Branch**: `main`
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`

**Advanced Settings:**

Click **"Advanced"** and add **Environment Variables**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGO_URI` | Your MongoDB Atlas connection string from Step 1.5 |
| `JWT_SECRET` | A random secure string (e.g., `your_super_secure_random_jwt_secret_key_12345`) |

**Health Check:**
- **Health Check Path**: `/api/health`

### 3.3 Deploy Backend

1. Click **"Create Web Service"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll see: **"Your service is live 🎉"**
4. **Copy your backend URL** (looks like): `https://osm-backend.onrender.com`
5. Test it: Visit `https://osm-backend.onrender.com/api/health`
   - Should return: `{"ok":true,"time":"..."}`

### 3.4 Seed Production Database

After backend is deployed, seed the database:

1. Go to your backend service in Render Dashboard
2. Click **"Shell"** tab at the top
3. Run: `node seed.js`
4. Wait for: "Database seeded successfully"

---

## 🎨 STEP 4: Deploy Frontend to Render

### 4.1 Update Frontend API URL

**Option A: Use Render Dashboard (Recommended)**

1. Create frontend service first (follow steps below)
2. Add environment variable in Render:
   - Key: `VITE_API_URL`
   - Value: `https://osm-backend.onrender.com/api` (your backend URL + `/api`)

**Option B: Hardcode (Quick but less flexible)**

Edit `frontend/src/config.js`:
```javascript
const productionApiUrl = 'https://osm-backend.onrender.com/api'; // Your actual backend URL
```

### 4.2 Create Frontend Service

1. In Render Dashboard, click **"New +"** → **"Static Site"**
2. Select your repository
3. Click **"Connect"**

### 4.3 Configure Frontend Service

**Basic Settings:**
- **Name**: `osm-frontend` (or your preferred name)
- **Region**: Same as backend (e.g., Oregon)
- **Branch**: `main`
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

**Environment Variables:**
Click **"Advanced"** → Add Environment Variable:

| Key | Value |
|-----|-------|
| `VITE_API_URL` | `https://osm-backend.onrender.com/api` (YOUR backend URL + /api) |

### 4.4 Deploy Frontend

1. Click **"Create Static Site"**
2. Wait for deployment (3-5 minutes)
3. Once deployed, you'll see: **"Your site is live 🎉"**
4. **Copy your frontend URL** (looks like): `https://osm-frontend.onrender.com`

---

## 🔧 STEP 5: Update CORS Configuration

### 5.1 Update Backend CORS

1. Go to your backend service on Render
2. Go to **"Environment"** tab
3. Add new environment variable:
   - Key: `FRONTEND_URL`
   - Value: `https://osm-frontend.onrender.com` (your actual frontend URL)
4. Click **"Save Changes"**
5. Service will automatically redeploy

**OR** update `backend/server.js` directly:
```javascript
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://osm-frontend.onrender.com', // Your actual frontend URL
  process.env.FRONTEND_URL
].filter(Boolean);
```

Then commit and push:
```powershell
git add backend/server.js
git commit -m "Update CORS for production"
git push
```

---

## ✅ STEP 6: Test Your Deployment

### 6.1 Test Backend
Visit: `https://osm-backend.onrender.com/api/health`
- Should return: `{"ok":true,"time":"..."}`

Visit: `https://osm-backend.onrender.com/api/products`
- Should return array of 5 products

### 6.2 Test Frontend
Visit: `https://osm-frontend.onrender.com`
- Should see your shopping mall
- Products should load from backend
- Try logging in: `test@example.com` / `test123`
- Add items to cart
- Place an order

### 6.3 Test Full Stack
1. Browse products (loaded from MongoDB Atlas)
2. Login with test account
3. Add items to cart
4. Complete checkout
5. View order history

---

## 📊 Your Deployed URLs

After deployment, you'll have:

| Service | URL | Example |
|---------|-----|---------|
| **Frontend** | `https://YOUR-FRONTEND.onrender.com` | `https://osm-frontend.onrender.com` |
| **Backend API** | `https://YOUR-BACKEND.onrender.com` | `https://osm-backend.onrender.com` |
| **Database** | MongoDB Atlas | `cluster0.xxxxx.mongodb.net` |

---

## 🔄 Automatic Deployments

Once set up, Render automatically redeploys when you push to GitHub:

```powershell
# Make changes to your code
git add .
git commit -m "Your changes"
git push

# Render automatically detects changes and redeploys!
```

---

## 🚨 Troubleshooting

### Backend Won't Start
- Check environment variables are set correctly
- Verify MongoDB Atlas connection string
- Check build logs in Render Dashboard
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0

### Frontend Can't Connect to Backend
- Verify `VITE_API_URL` environment variable
- Check backend URL is correct (with `/api` at the end)
- Verify CORS settings in backend
- Check browser console for errors

### CORS Errors
- Add your frontend URL to `allowedOrigins` in backend
- Add `FRONTEND_URL` environment variable to backend
- Redeploy backend after CORS changes

### MongoDB Connection Failed
- Double-check connection string format
- Verify username and password are correct
- Ensure IP whitelist includes 0.0.0.0/0
- Check if cluster is active (not paused)

### Products Not Loading
- Check if database was seeded (run `node seed.js` in backend Shell)
- Verify MongoDB connection in backend logs
- Test backend API directly: `/api/products`

### Free Tier Limitations
- Render free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- Consider upgrading for production use

---

## 💰 Render Free Tier Limits

- ✅ 750 hours/month (enough for continuous running)
- ✅ Automatic HTTPS/SSL
- ✅ Automatic deployments from GitHub
- ⚠️ Services sleep after 15 minutes of inactivity
- ⚠️ 100GB bandwidth/month
- ⚠️ Limited build minutes

**Tip**: For production, upgrade to paid plan ($7/month) for:
- No sleep/cold starts
- More bandwidth
- Better performance
- Custom domains

---

## 🔐 Production Security Checklist

Before going live:

- [ ] Change `JWT_SECRET` to strong random string
- [ ] Use strong MongoDB Atlas password
- [ ] Enable MongoDB Atlas encryption at rest
- [ ] Set up MongoDB Atlas backup
- [ ] Configure Render health checks
- [ ] Set up monitoring/alerts
- [ ] Enable Render auto-scaling (paid plans)
- [ ] Add rate limiting to API
- [ ] Set up error logging (e.g., Sentry)
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS (automatic on Render)

---

## 🎯 Post-Deployment Steps

### 1. Custom Domain (Optional)
1. Buy domain from registrar (GoDaddy, Namecheap, etc.)
2. In Render Dashboard → Your service → "Custom Domain"
3. Follow instructions to update DNS records

### 2. Monitor Your App
- Render Dashboard shows logs, metrics, deployments
- Set up email alerts for deployment failures
- Monitor MongoDB Atlas database size

### 3. Update Environment Variables
- Never commit `.env` files
- Use Render Dashboard to manage environment variables
- Update MongoDB credentials if changed

---

## 📁 Deployment File Structure

```
OSM-main/
├── render.yaml                 # Render configuration (optional)
├── backend/
│   ├── .gitignore             # Don't commit node_modules, .env
│   ├── package.json           # With engines specified
│   ├── server.js              # CORS configured for production
│   ├── seed.js                # Database seeding
│   └── ...
└── frontend/
    ├── .gitignore             # Don't commit node_modules, dist
    ├── package.json           # With engines specified
    ├── src/
    │   └── config.js          # Dynamic API URL for dev/prod
    └── ...
```

---

## 🎉 Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access configured (0.0.0.0/0)
- [ ] Connection string saved
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Backend environment variables set
- [ ] Backend health check passing
- [ ] Production database seeded
- [ ] Frontend deployed to Render
- [ ] Frontend environment variable set (VITE_API_URL)
- [ ] CORS updated with frontend URL
- [ ] Frontend can load products
- [ ] Login/authentication working
- [ ] Orders can be placed
- [ ] Both services set to auto-deploy

---

## 🆘 Need Help?

### Render Support
- Documentation: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

### MongoDB Atlas Support
- Documentation: https://docs.atlas.mongodb.com
- Support: https://support.mongodb.com

### Common Issues
- **Cold starts**: Upgrade to paid plan or keep service warm with uptime monitor
- **Build failures**: Check Node version compatibility
- **Database connection**: Verify connection string and IP whitelist

---

## 🚀 Quick Deployment Checklist

1. ✅ Create MongoDB Atlas cluster → Get connection string
2. ✅ Push code to GitHub
3. ✅ Deploy backend to Render → Add env vars (MONGO_URI, JWT_SECRET)
4. ✅ Seed database via Render Shell
5. ✅ Deploy frontend to Render → Add VITE_API_URL
6. ✅ Update backend CORS with frontend URL
7. ✅ Test everything works!

---

**🎊 Congratulations! Your Online Shopping Mall is now live on the internet!**

Share your URLs:
- Frontend: `https://YOUR-APP.onrender.com`
- Backend API: `https://YOUR-API.onrender.com`

---

## 📝 Example URLs After Deployment

```
Frontend: https://osm-frontend.onrender.com
Backend:  https://osm-backend.onrender.com
API:      https://osm-backend.onrender.com/api
Health:   https://osm-backend.onrender.com/api/health
Products: https://osm-backend.onrender.com/api/products
```

Your app is accessible worldwide! 🌍
