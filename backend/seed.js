const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const products = [
  // Electronics
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    countInStock: 15
  },
  {
    name: "Smartphone Case",
    description: "Protective case for your smartphone",
    category: "Electronics",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500&h=500&fit=crop",
    countInStock: 30
  },
  {
    name: "Laptop Stand",
    description: "Ergonomic aluminum laptop stand for better posture",
    category: "Electronics",
    price: 45.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    countInStock: 20
  },
  {
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with precision tracking",
    category: "Electronics",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    countInStock: 40
  },
  {
    name: "USB-C Hub",
    description: "7-in-1 USB-C hub with HDMI and card reader",
    category: "Electronics",
    price: 55.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=500&h=500&fit=crop",
    countInStock: 25
  },
  {
    name: "Portable Charger",
    description: "20000mAh power bank with fast charging",
    category: "Electronics",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&h=500&fit=crop",
    countInStock: 35
  },
  {
    name: "Smart Watch",
    description: "Fitness tracker with heart rate monitor",
    category: "Electronics",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    countInStock: 18
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 12-hour battery",
    category: "Electronics",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    countInStock: 22
  },
  {
    name: "Webcam HD",
    description: "1080p HD webcam with built-in microphone",
    category: "Electronics",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop",
    countInStock: 15
  },
  
  // Clothing
  {
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt",
    category: "Clothing",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop",
    countInStock: 25
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes for daily training",
    category: "Clothing",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop",
    countInStock: 10
  },
  {
    name: "Denim Jeans",
    description: "Classic fit denim jeans in dark blue",
    category: "Clothing",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=500&fit=crop",
    countInStock: 20
  },
  {
    name: "Hoodie",
    description: "Comfortable fleece hoodie with front pocket",
    category: "Clothing",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=500&fit=crop",
    countInStock: 30
  },
  {
    name: "Leather Jacket",
    description: "Genuine leather jacket with zipper closure",
    category: "Clothing",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop",
    countInStock: 8
  },
  {
    name: "Casual Sneakers",
    description: "Stylish casual sneakers for everyday wear",
    category: "Clothing",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=500&fit=crop",
    countInStock: 25
  },
  {
    name: "Polo Shirt",
    description: "Classic polo shirt in multiple colors",
    category: "Clothing",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&h=500&fit=crop",
    countInStock: 35
  },
  {
    name: "Winter Jacket",
    description: "Warm insulated jacket for cold weather",
    category: "Clothing",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=500&h=500&fit=crop",
    countInStock: 12
  },
  
  // Sports
  {
    name: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    category: "Sports",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500&h=500&fit=crop",
    countInStock: 40
  },
  {
    name: "Dumbbell Set",
    description: "Adjustable dumbbell set 5-25 lbs",
    category: "Sports",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=500&fit=crop",
    countInStock: 15
  },
  {
    name: "Tennis Racket",
    description: "Professional grade tennis racket with cover",
    category: "Sports",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=500&h=500&fit=crop",
    countInStock: 12
  },
  {
    name: "Basketball",
    description: "Official size basketball for indoor/outdoor",
    category: "Sports",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=500&h=500&fit=crop",
    countInStock: 25
  },
  {
    name: "Football",
    description: "Regulation size football with pump",
    category: "Sports",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1486286701208-1d58e9338013?w=500&h=500&fit=crop",
    countInStock: 30
  },
  {
    name: "Gym Bag",
    description: "Spacious gym bag with shoe compartment",
    category: "Sports",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop",
    countInStock: 20
  },
  {
    name: "Resistance Bands",
    description: "Set of 5 resistance bands for strength training",
    category: "Sports",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500&h=500&fit=crop",
    countInStock: 35
  },
  
  // Home
  {
    name: "Coffee Maker",
    description: "Automatic drip coffee maker with timer",
    category: "Home",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop",
    countInStock: 8
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    console.log('Data cleared');

    // Insert products
    await Product.insertMany(products);
    console.log('Products seeded');

    // Create a test user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('test123', salt);
    await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword
    });
    console.log('Test user created');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();