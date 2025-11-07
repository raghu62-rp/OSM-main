import React from 'react';
import './Receipt.css';

const Receipt = ({ orderData, onClose, onDownload, onTrackOrder }) => {
  const currentDate = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  // Generate order ID only once
  const orderId = React.useMemo(() => 
    orderData.orderId || `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 
    [orderData.orderId]
  );
  
  // Store order data for tracking
  const enrichedOrderData = React.useMemo(() => {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    
    return {
      ...orderData,
      orderId: orderId,
      date: currentDate,
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };
  }, [orderData, orderId, currentDate]);

  const handlePrint = () => {
    // Trigger the browser's print dialog
    setTimeout(() => {
      window.print();
    }, 100);
  };

  const handleTrackOrder = () => {
    if (onTrackOrder) {
      // Pass the enriched order data with all tracking information
      onTrackOrder(enrichedOrderData);
    }
  };

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div className="receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="receipt-header no-print">
          <h3>Payment Successful! 🎉</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="receipt-content" id="receipt">
          <div className="receipt-logo">
            <h1>🛍️ ShopEasy</h1>
            <p>Your Online Shopping Destination</p>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-info">
            <div className="receipt-row">
              <span className="label">Order ID:</span>
              <span className="value">{orderId}</span>
            </div>
            <div className="receipt-row">
              <span className="label">Date:</span>
              <span className="value">{currentDate}</span>
            </div>
            <div className="receipt-row">
              <span className="label">Payment Method:</span>
              <span className="value">{orderData.paymentMethod || 'UPI'}</span>
            </div>
            <div className="receipt-row">
              <span className="label">Status:</span>
              <span className="value status-paid">✓ PAID</span>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-items">
            <h4>Order Items</h4>
            <table className="items-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {orderData.items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.price.toFixed(2)}</td>
                    <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-totals">
            <div className="receipt-row">
              <span className="label">Subtotal:</span>
              <span className="value">₹{orderData.total.toFixed(2)}</span>
            </div>
            <div className="receipt-row">
              <span className="label">Shipping:</span>
              <span className="value">FREE</span>
            </div>
            <div className="receipt-row total-row">
              <span className="label">Total Paid:</span>
              <span className="value">₹{orderData.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="receipt-divider"></div>

          <div className="receipt-footer">
            <div className="contact-info">
              <h4>Customer Support</h4>
              <p>📧 Email: 231fa04a10@gmail.com</p>
              <p>📞 Phone: +91 9398593918</p>
              <p>📍 Address: ShopEasy Pvt Ltd, 3rd Floor, Tech Park,<br />
                 Hitech City, Hyderabad, Telangana - 500081, India</p>
            </div>
            <p className="thank-you">Thank you for shopping with us! 💙</p>
          </div>
        </div>

        <div className="receipt-actions no-print">
          <button className="print-btn" onClick={handlePrint}>
            🖨️ Print Receipt
          </button>
          <button className="track-btn" onClick={handleTrackOrder}>
            🚚 Track Order
          </button>
          <button className="done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
