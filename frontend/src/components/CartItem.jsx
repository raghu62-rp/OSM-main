import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
      </div>
      
      <div className="cart-item-info">
        <div className="cart-item-title">{item.name}</div>
        <div className="cart-item-price">₹{item.price}</div>
        
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            −
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
          
          <button 
            className="remove-btn"
            onClick={() => onRemove(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
      
      <div className="cart-item-total">
        <strong>₹{(item.price * item.quantity).toFixed(2)}</strong>
      </div>
    </div>
  );
};

export default CartItem;