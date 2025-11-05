# Quick Start - Backend & Frontend Connected! ✅

## ✅ Status: CONNECTED AND RUNNING

### Backend Server
- **Status**: ✅ Running on port 5000
- **MongoDB**: ✅ Connected to localhost
- **URL**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

### Frontend Server
- **Status**: ✅ Running on port 3000
- **URL**: http://localhost:3000
- **API Connection**: http://127.0.0.1:5000/api (configured in frontend/src/config.js)

### Database
- **MongoDB**: ✅ Connected
- **Database Name**: osm_db
- **Sample Data**: ✅ Seeded with 5 products and 1 test user

---

## 🧪 Test the Connection

### 1. Test Login
- **Email**: test@example.com
- **Password**: test123

### 2. API Endpoints Available
- `GET /api/products` - List all products
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register new user
- `GET /api/orders` - Get user orders (requires auth)
- `POST /api/orders` - Create order (requires auth)

### 3. Sample Products in Database
1. Wireless Bluetooth Headphones - $99.99
2. Smartphone Case - $29.99
3. Cotton T-Shirt - $19.99
4. Running Shoes - $89.99
5. Coffee Maker - $129.99

---

## 📝 Current Configuration

### Backend (.env)
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/osm_db
JWT_SECRET=your_jwt_secret_here
```

### Frontend API Config (src/config.js)
```javascript
export const API_BASE_URL = 'http://127.0.0.1:5000/api';
```

### CORS Configuration (backend/server.js)
```javascript
cors({
  origin: 'http://localhost:3000',
  credentials: true
})
```

---

## 🚀 How to Use

### View the Application
Open your browser to: **http://localhost:3000**

### Test Features
1. ✅ Browse products (loaded from MongoDB)
2. ✅ Add items to cart
3. ✅ Login with test account
4. ✅ Place orders (saved to MongoDB)
5. ✅ View order history

---

## 🛠️ Troubleshooting

### If Backend Stops
```powershell
cd backend
npm start
```

### If Frontend Stops
```powershell
cd frontend
npm run dev
```

### Check MongoDB Connection
```powershell
cd backend
node -e "require('dotenv').config(); console.log(process.env.MONGO_URI)"
```

### View API Response
Open in browser: http://localhost:5000/api/health

---

## 📊 Data Flow

```
User Browser (localhost:3000)
    ↓
Frontend React App
    ↓ (API calls via fetch/axios)
Backend Express Server (localhost:5000)
    ↓ (Mongoose ODM)
MongoDB Database (localhost:27017/osm_db)
    ↓
Collections: users, products, orders
```

---

## 🔐 Security Notes

⚠️ **Important for Production**:
1. Change `JWT_SECRET` to a strong random string
2. Use environment-specific MONGO_URI
3. Enable proper CORS origins (not wildcard)
4. Use HTTPS for all connections
5. Add rate limiting and input validation

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `backend/server.js` | Express app & MongoDB connection |
| `backend/config/db.js` | MongoDB connection logic |
| `backend/.env` | Environment variables |
| `backend/models/` | Mongoose schemas (User, Product, Order) |
| `backend/seed.js` | Database seeding script |
| `frontend/src/config.js` | API base URL |
| `frontend/src/services/api.js` | API functions (login, orders) |

---

## ✨ Next Steps

1. ✅ Backend & Frontend are connected via MongoDB
2. ✅ Test user and products are seeded
3. ✅ Both servers are running
4. 🎯 Open http://localhost:3000 and start shopping!

---

**Need help?** Check `SETUP_GUIDE.md` for detailed instructions.
