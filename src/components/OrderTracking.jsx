import React from 'react';
import './OrderTracking.css';

const OrderTracking = ({ order, onClose }) => {
  if (!order) {
    return null;
  }

  // Ensure all required fields exist
  const safeOrder = {
    orderId: order.orderId || 'N/A',
    date: order.date || new Date().toLocaleDateString('en-IN'),
    total: order.total || 0,
    paymentMethod: order.paymentMethod || 'UPI',
    shippingAddress: order.shippingAddress || {
      address: 'N/A',
      city: 'N/A',
      postalCode: 'N/A',
      country: 'India'
    },
    items: order.items || [],
    estimatedDelivery: order.estimatedDelivery || 'N/A'
  };

  const getDeliveryStatus = () => {
    const steps = [
      { status: 'Order Placed', completed: true, date: safeOrder.date },
      { status: 'Processing', completed: true, date: safeOrder.date },
      { status: 'Shipped', completed: false, date: 'Expected in 1-2 days' },
      { status: 'Out for Delivery', completed: false, date: 'Expected in 2-3 days' },
      { status: 'Delivered', completed: false, date: 'Expected in 3-5 days' }
    ];
    return steps;
  };

  const trackingSteps = getDeliveryStatus();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="tracking-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tracking-header">
          <h2>🚚 Order Tracking</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="tracking-content">
          <div className="order-info">
            <h3>Order #{safeOrder.orderId}</h3>
            <p>Order Date: {safeOrder.date}</p>
            <p>Total Amount: ₹{safeOrder.total.toFixed(2)}</p>
            <p>Payment Method: {safeOrder.paymentMethod}</p>
          </div>

          <div className="delivery-address">
            <h4>📍 Delivery Address</h4>
            <p>{safeOrder.shippingAddress.address}</p>
            <p>{safeOrder.shippingAddress.city}, {safeOrder.shippingAddress.postalCode}</p>
            <p>{safeOrder.shippingAddress.country}</p>
          </div>

          <div className="tracking-timeline">
            <h4>Delivery Status</h4>
            {trackingSteps.map((step, index) => (
              <div key={index} className={`tracking-step ${step.completed ? 'completed' : 'pending'}`}>
                <div className="step-indicator">
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="step-details">
                  <div className="step-status">{step.status}</div>
                  <div className="step-date">{step.date}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="ordered-items">
            <h4>Ordered Items</h4>
            {safeOrder.items.map((item, index) => (
              <div key={index} className="tracking-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <div className="item-name">{item.name}</div>
                  <div className="item-qty">Qty: {item.quantity} × ₹{item.price}</div>
                </div>
                <div className="item-total">₹{(item.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="estimated-delivery">
            <div className="delivery-box">
              <h4>📦 Estimated Delivery</h4>
              <p className="delivery-date">Expected by: {safeOrder.estimatedDelivery}</p>
              <p className="delivery-note">We'll notify you once your order is shipped!</p>
            </div>
          </div>

          <div className="tracking-actions">
            <button className="btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
