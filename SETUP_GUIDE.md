# MongoDB Backend & Frontend Connection Setup Guide

## Prerequisites
1. **Node.js** installed (v14 or higher)
2. **MongoDB** - Choose one option:
   - **Option A**: MongoDB Atlas (Cloud) - Recommended for beginners
   - **Option B**: Local MongoDB installation

---

## Step 1: MongoDB Setup

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Create a database user with username and password
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
6. Update `backend/.env` file with your connection string:
   ```
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/online_shopping_mall?retryWrites=true&w=majority
   ```

### Option B: Local MongoDB

1. Install MongoDB Community Edition from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   - Windows: MongoDB should start automatically after installation
   - Or run: `net start MongoDB`
3. The default connection string is already in `backend/.env`:
   ```
   MONGO_URI=mongodb://localhost:27017/osm_db
   ```

---

## Step 2: Install Dependencies

### Backend
```powershell
cd backend
npm install
```

### Frontend
```powershell
cd ../frontend
npm install
```

---

## Step 3: Configure Environment Variables

The `backend/.env` file is already configured with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/osm_db
JWT_SECRET=your_jwt_secret_here
```

**Important**: Change `JWT_SECRET` to a secure random string for production!

---

## Step 4: Seed the Database

This will populate your MongoDB with sample products and a test user.

```powershell
cd backend
npm run dev
# Wait for "MongoDB Connected" message, then stop with Ctrl+C
node seed.js
```

This creates:
- 5 sample products (headphones, phone case, t-shirt, shoes, coffee maker)
- Test user: email: `test@example.com`, password: `test123`

---

## Step 5: Start the Application

### Terminal 1 - Backend Server
```powershell
cd backend
npm run dev
```

You should see:
```
Server running on port 5000
MongoDB Connected: <your-mongodb-host>
```

### Terminal 2 - Frontend Dev Server
```powershell
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x ready in xxx ms
Local: http://localhost:5173/
```

---

## Step 6: Test the Connection

1. Open browser to `http://localhost:5173`
2. The frontend should load and display products from MongoDB
3. Try logging in with:
   - Email: `test@example.com`
   - Password: `test123`
4. Place a test order to verify full stack integration

---

## API Endpoints

The backend provides these endpoints:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires auth)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)

### Orders
- `GET /api/orders` - Get user orders (requires auth)
- `POST /api/orders` - Create new order (requires auth)
- `GET /api/orders/:id` - Get single order (requires auth)

### Health Check
- `GET /api/health` - Check if backend is running

---

## Troubleshooting

### MongoDB Connection Issues
- **Local MongoDB**: Ensure MongoDB service is running
- **MongoDB Atlas**: Check your connection string, username, password, and IP whitelist

### Port Already in Use
- Backend (5000): Change `PORT` in `backend/.env`
- Frontend (5173): Vite will auto-increment to next available port

### CORS Errors
- Backend is configured to accept requests from `http://localhost:3000` and frontend uses port 5173
- Update `backend/server.js` cors origin if needed

### Dependencies Not Found
- Run `npm install` in both backend and frontend directories

---

## Project Structure

```
OSM-main/
├── backend/
│   ├── config/db.js          # MongoDB connection
│   ├── models/               # Mongoose schemas
│   ├── controllers/          # Business logic
│   ├── routes/               # API routes
│   ├── middleware/           # Auth middleware
│   ├── server.js             # Express app
│   ├── seed.js               # Database seeding
│   └── .env                  # Environment variables
└── frontend/
    ├── src/
    │   ├── components/       # React components
    │   ├── services/api.js   # API calls
    │   └── config.js         # API base URL
    └── package.json
```

---

## Next Steps

1. Customize the products in `backend/seed.js`
2. Add more features (product categories, reviews, etc.)
3. Implement admin panel
4. Deploy to production (Heroku, Vercel, Railway, etc.)

---

## Support

If you encounter issues:
1. Check MongoDB connection string
2. Verify all dependencies are installed
3. Check console for error messages
4. Ensure both backend and frontend are running
