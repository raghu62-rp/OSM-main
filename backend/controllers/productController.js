const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');


const getProducts = asyncHandler(async (req, res) => {
const products = await Product.find({});
res.json(products);
});


const getProductById = asyncHandler(async (req, res) => {
const product = await Product.findById(req.params.id);
if (product) res.json(product);
else { res.status(404); throw new Error('Product not found'); }
});


const createProduct = asyncHandler(async (req, res) => {
const { name, description, price, image, countInStock } = req.body;
const product = await Product.create({ name, description, price, image, countInStock });
res.status(201).json(product);
});


const updateProduct = asyncHandler(async (req, res) => {
const product = await Product.findById(req.params.id);
if (product) {
Object.assign(product, req.body);
const updated = await product.save();
res.json(updated);
} else { res.status(404); throw new Error('Product not found'); }
});


const deleteProduct = asyncHandler(async (req, res) => {
const product = await Product.findById(req.params.id);
if (product) { await product.remove(); res.json({ message: 'Product removed' }); }
else { res.status(404); throw new Error('Product not found'); }
});


module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };