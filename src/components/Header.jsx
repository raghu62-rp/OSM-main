import React from 'react';

const Header = ({ cartItemCount, onCartClick }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <a href="#" className="logo">
            🛍️ ShopEasy
          </a>
          
          <nav className="nav">
            <a href="#" className="nav-link">Home</a>
            <a href="#products" className="nav-link">Products</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
            
            <button className="cart-btn" onClick={onCartClick}>
              🛒 Cart
              {cartItemCount > 0 && (
                <span className="cart-count">{cartItemCount}</span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;