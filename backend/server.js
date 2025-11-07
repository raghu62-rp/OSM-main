require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');


const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');


const app = express();


// connect DB
connectDB(process.env.MONGO_URI);


// middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://osm-frontend.onrender.com', // Update with your Render frontend URL
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Add response compression
const compression = require('compression');
app.use(compression());
app.use(express.json());


// routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => res.send('ONLINE SHOPPING MALL API is running'));

// Simple health-check endpoint used by the frontend to detect backend availability
app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Admin endpoint to reseed the database (temporary - remove after use)
app.get('/api/admin/seed', async (req, res) => {
  try {
    const Product = require('./models/Product');
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');

    // Clear existing data
    await Product.deleteMany({});
    await User.deleteMany({});

    // Products data
    const products = [
      {
        name: "Wireless Bluetooth Headphones",
        description: "Premium wireless headphones with active noise cancellation",
        category: "Electronics",
        price: 99.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80",
        countInStock: 15
      },
      {
        name: "Smartphone Case",
        description: "Protective case with shock absorption",
        category: "Electronics",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop&q=80",
        countInStock: 30
      },
      {
        name: "Laptop Stand",
        description: "Ergonomic aluminum laptop stand for better posture",
        category: "Electronics",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop&q=80",
        countInStock: 20
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        category: "Electronics",
        price: 35.99,
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop&q=80",
        countInStock: 40
      },
      {
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with HDMI and card reader",
        category: "Electronics",
        price: 55.99,
        image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop&q=80",
        countInStock: 25
      },
      {
        name: "Cotton T-Shirt",
        description: "Comfortable 100% cotton t-shirt",
        category: "Clothing",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&q=80",
        countInStock: 25
      },
      {
        name: "Denim Jeans",
        description: "Classic fit denim jeans",
        category: "Clothing",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop&q=80",
        countInStock: 20
      },
      {
        name: "Running Shoes",
        description: "Lightweight running shoes with cushioning",
        category: "Sports",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&q=80",
        countInStock: 10
      },
      {
        name: "Yoga Mat",
        description: "Non-slip yoga mat with carrying strap",
        category: "Sports",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop&q=80",
        countInStock: 30
      },
      {
        name: "Coffee Maker",
        description: "Programmable coffee maker with thermal carafe",
        category: "Home",
        price: 129.99,
        image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop&q=80",
        countInStock: 8
      }
    ];

    await Product.insertMany(products);

    // Create test user
    const hashedPassword = await bcrypt.hash('test123', 10);
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });

    res.json({ 
      success: true, 
      message: 'Database seeded successfully!',
      productsCount: products.length 
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error seeding database', 
      error: error.message 
    });
  }
});

app.get('/', (req, res) => res.send('ONLINE SHOPPING MALL API is running'));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));