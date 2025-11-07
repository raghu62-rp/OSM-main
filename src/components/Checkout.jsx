import React, { useState } from 'react';
import './Checkout.css';

const Checkout = ({ cart, total, onClose, onConfirm }) => {
  const [method, setMethod] = useState('upi');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [card, setCard] = useState({ number: '', name: '', exp: '', cvv: '' });
  const [upiId, setUpiId] = useState('');
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India'
  });

  const handlePay = async (e) => {
    e.preventDefault();
    setError('');

    // Validate address
    if (!address.fullName || !address.phone || !address.email || !address.addressLine || 
        !address.city || !address.state || !address.pincode) {
      setError('Please fill in all address details');
      return;
    }

    // Validate phone
    if (address.phone.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    // Validate email
    if (!address.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Validation
    if (method === 'card') {
      if (!card.number || !card.name || !card.exp || !card.cvv) {
        setError('Please fill all card details');
        return;
      }
    }

    if (method === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setError('Please enter a valid UPI ID (e.g., 9398593918@ibl)');
        return;
      }
    }

    // Simulate payment processing
    setProcessing(true);
    try {
      // Simulate payment gateway delay
      await new Promise((r) => setTimeout(r, 1500));

      // Call confirm with payment method info and address
      await onConfirm(method, address);
    } catch (err) {
      setError(err.message || 'Payment failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <div className="checkout-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
        <div className="checkout-header">
          <h3>Proceed to Payment</h3>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="checkout-body">
          <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="summary-list">
              {cart.map((it) => (
                <div key={it.id} className="summary-item">
                  <span>{it.name} × {it.quantity}</span>
                  <strong>₹{(it.price * it.quantity).toFixed(2)}</strong>
                </div>
              ))}
            </div>
            <div className="summary-total">Total: <strong>₹{total.toFixed(2)}</strong></div>
          </div>

          <form className="payment-form" onSubmit={handlePay}>
            <h4>📍 Delivery Address</h4>
            <div className="address-fields">
              <input 
                type="text" 
                placeholder="Full Name *" 
                value={address.fullName}
                onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                required
              />
              <div className="row">
                <input 
                  type="tel" 
                  placeholder="Phone Number *" 
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  maxLength="10"
                  required
                />
                <input 
                  type="email" 
                  placeholder="Email *" 
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  required
                />
              </div>
              <textarea 
                placeholder="Address Line (House No., Street, Area) *" 
                value={address.addressLine}
                onChange={(e) => setAddress({ ...address, addressLine: e.target.value })}
                rows="2"
                required
              />
              <div className="row">
                <input 
                  type="text" 
                  placeholder="City *" 
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  required
                />
                <input 
                  type="text" 
                  placeholder="State *" 
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  required
                />
              </div>
              <div className="row">
                <input 
                  type="text" 
                  placeholder="Pincode *" 
                  value={address.pincode}
                  onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
                  maxLength="6"
                  required
                />
                <input 
                  type="text" 
                  placeholder="Country" 
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  required
                />
              </div>
            </div>

            <h4>Payment Method</h4>
            <div className="methods">
              <label>
                <input type="radio" name="method" value="card" checked={method === 'card'} onChange={() => setMethod('card')} /> Card
              </label>
              <label>
                <input type="radio" name="method" value="upi" checked={method === 'upi'} onChange={() => setMethod('upi')} /> UPI
              </label>
              <label>
                <input type="radio" name="method" value="wallet" checked={method === 'wallet'} onChange={() => setMethod('wallet')} /> Wallet
              </label>
            </div>

            {method === 'card' && (
              <div className="card-fields">
                <input type="text" placeholder="Card number" value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} />
                <input type="text" placeholder="Name on card" value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} />
                <div className="row">
                  <input type="text" placeholder="MM/YY" value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} />
                  <input type="password" placeholder="CVV" value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} />
                </div>
              </div>
            )}

            {method === 'upi' && (
              <div className="upi-field">
                <input 
                  type="text" 
                  placeholder="Enter UPI ID (e.g. 9398593918@ibl)" 
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}

            {method === 'wallet' && (
              <div className="wallet-field">
                <p>Choose your wallet in production (Paytm, PhonePe) — simulated here.</p>
              </div>
            )}

            {error && <div className="checkout-error">{error}</div>}

            <button className="pay-btn" type="submit" disabled={processing}>
              {processing ? 'Processing…' : `Pay ₹${total.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
