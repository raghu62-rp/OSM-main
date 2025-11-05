const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');


const createOrder = asyncHandler(async (req, res) => {
const { orderItems, shippingAddress, totalPrice } = req.body;
if (!orderItems || orderItems.length === 0) {
res.status(400);
throw new Error('No order items');
}
const order = new Order({ user: req.user._id, orderItems, shippingAddress, totalPrice });
const created = await order.save();
res.status(201).json(created);
});


const getOrderById = asyncHandler(async (req, res) => {
const order = await Order.findById(req.params.id).populate('user', 'name email');
if (order) res.json(order);
else { res.status(404); throw new Error('Order not found'); }
});


const getMyOrders = asyncHandler(async (req, res) => {
const orders = await Order.find({ user: req.user._id });
res.json(orders);
});


module.exports = { createOrder, getOrderById, getMyOrders };