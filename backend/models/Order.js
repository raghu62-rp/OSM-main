const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
orderItems: [
{
product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
name: String,
qty: Number,
price: Number,
image: String
}
],
shippingAddress: { type: Object },
totalPrice: { type: Number, required: true },
isPaid: { type: Boolean, default: false },
paidAt: Date
}, { timestamps: true });


module.exports = mongoose.model('Order', orderSchema);