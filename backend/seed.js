const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./models/Product');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

const products = [
  {
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    price: 99.99,
    image: "🎧",
    countInStock: 15
  },
  {
    name: "Smartphone Case",
    description: "Protective case for your smartphone",
    category: "Electronics",
    price: 29.99,
    image: "📱",
    countInStock: 30
  },
  {
    name: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt",
    category: "Clothing",
    price: 19.99,
    image: "👕",
    countInStock: 25
  },
  {
    name: "Running Shoes",
    description: "Lightweight running shoes for daily training",
    category: "Clothing",
    price: 89.99,
    image: "👟",
    countInStock: 10
  },
  {
    name: "Coffee Maker",
    description: "Automatic drip coffee maker with timer",
    category: "Home",
    price: 129.99,
    image: "☕",
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