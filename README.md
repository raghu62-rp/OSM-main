# Online Shopping Mall

A full-stack e-commerce application built with React, Express, and MongoDB.

## 🌟 Features

- 🛍️ Product browsing and searching
- 🛒 Shopping cart management
- 🔐 User authentication (JWT)
- 📦 Order processing
- 💳 Checkout system
- 📱 Responsive design
- ☁️ Cloud-ready (Render + MongoDB Atlas)

## 🚀 Live Demo

**Frontend**: [Your deployed URL]  
**Backend API**: [Your API URL]

### Test Credentials
- **Email**: test@example.com
- **Password**: test123

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- React Router
- CSS3
- Axios

### Backend
- Node.js
- Express 5
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Local Installation

1. **Clone the repository**
```bash
git clone https://github.com/raghu62-rp/online-shopping-mall.git
cd online-shopping-mall
```

2. **Install Backend Dependencies**
```bash
cd backend
npm install
```

3. **Install Frontend Dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**
Create `.env` file in backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/osm_db
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

5. **Seed the database**
```bash
cd backend
node seed.js
```

6. **Start the application**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
# Runs on http://localhost:3000
```

7. **Open in browser**
Visit: http://localhost:3000

## 🌐 Deploy to Render

This project is fully configured for deployment to Render with MongoDB Atlas.

### Quick Deploy Guide

See **`QUICK_DEPLOY.md`** for 10-minute deployment guide.

### Complete Documentation

- **`RENDER_DEPLOYMENT_GUIDE.md`** - Comprehensive deployment guide
- **`DEPLOYMENT_CHECKLIST.md`** - Interactive deployment checklist
- **`DEPLOYMENT_READY.md`** - Deployment summary and tips

### Deployment Steps Summary

1. Create MongoDB Atlas cluster (free)
2. Push code to GitHub
3. Deploy backend to Render
4. Deploy frontend to Render
5. Update CORS configuration
6. Test live application

**Total time: ~20 minutes** ⚡

## 📁 Project Structure

```
OSM-main/
├── backend/                 # Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth middleware
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── server.js           # Express app
│   └── seed.js             # Database seeding
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── config.js       # API configuration
│   │   └── App.jsx         # Main app
│   └── dist/               # Production build
└── render.yaml              # Render deployment config
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Orders
- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get single order

### Health Check
- `GET /api/health` - Server health status

## 🧪 Testing

### Test the API
```bash
# Health check
curl http://localhost:5000/api/health

# Get products
curl http://localhost:5000/api/products

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## 📚 Documentation

- **Setup Guide**: `SETUP_GUIDE.md` - Local development setup
- **Connection Status**: `CONNECTION_STATUS.md` - MongoDB connection info
- **Success Report**: `SUCCESS_REPORT.md` - Full stack integration details
- **Deployment Guides**: See deployment documentation above

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT token authentication
- Protected API routes
- CORS configuration
- Environment variables for secrets
- Input validation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Authors

- Initial work - [raghu62-rp](https://github.com/raghu62-rp)

## 🙏 Acknowledgments

- Built with React and Express
- MongoDB for database
- Render for hosting
- Vite for fast development

## 📞 Support

For deployment help, check:
- `RENDER_DEPLOYMENT_GUIDE.md` - Complete guide
- `QUICK_DEPLOY.md` - Fast reference
- `DEPLOYMENT_CHECKLIST.md` - Step-by-step checklist

## 🎯 Roadmap

- [ ] Add product reviews and ratings
- [ ] Implement admin dashboard
- [ ] Add payment gateway integration
- [ ] Email notifications
- [ ] Product recommendations
- [ ] Wishlist feature
- [ ] Advanced search filters
- [ ] User profile management

---

**Made with ❤️ by the OSM Team**