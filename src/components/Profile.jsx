import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config.js';
import './Profile.css';

const Profile = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [activeTab]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      if (activeTab === 'orders') {
        // Fetch orders from localStorage for now (since we don't have backend endpoint yet)
        const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
        setOrders(savedOrders);
      } else if (activeTab === 'wishlist') {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setWishlist(savedWishlist);
      } else if (activeTab === 'favorites') {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = (productId) => {
    const updated = wishlist.filter(item => item.id !== productId);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const removeFromFavorites = (productId) => {
    const updated = favorites.filter(item => item.id !== productId);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="profile-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-header">
          <div className="profile-user-info">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="profile-user-details">
              <h2>{user?.name || 'User'}</h2>
              <p>{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button className="profile-close-btn" onClick={onClose}>✕</button>
        </div>

        <div className="profile-tabs">
          <button
            className={`profile-tab ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            📦 My Orders
          </button>
          <button
            className={`profile-tab ${activeTab === 'wishlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('wishlist')}
          >
            💝 Wishlist
          </button>
          <button
            className={`profile-tab ${activeTab === 'favorites' ? 'active' : ''}`}
            onClick={() => setActiveTab('favorites')}
          >
            ⭐ Favorites
          </button>
        </div>

        <div className="profile-content">
          {loading ? (
            <div className="profile-loading">Loading...</div>
          ) : (
            <>
              {activeTab === 'orders' && (
                <div className="orders-section">
                  {orders.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">📦</div>
                      <h3>No orders yet</h3>
                      <p>Start shopping to see your orders here!</p>
                    </div>
                  ) : (
                    <div className="orders-list">
                      {orders.map((order, index) => (
                        <div key={index} className="order-card">
                          <div className="order-header">
                            <div>
                              <strong>Order #{order.orderId}</strong>
                              <span className="order-date">{order.date}</span>
                            </div>
                            <div className="order-status">
                              <span className="status-badge">{order.status || 'Processing'}</span>
                            </div>
                          </div>
                          <div className="order-items">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="order-item">
                                <img src={item.image} alt={item.name} />
                                <div className="order-item-details">
                                  <div className="order-item-name">{item.name}</div>
                                  <div className="order-item-qty">Qty: {item.quantity}</div>
                                </div>
                                <div className="order-item-price">₹{item.price}</div>
                              </div>
                            ))}
                          </div>
                          <div className="order-footer">
                            <div className="order-total">Total: ₹{order.total?.toFixed(2)}</div>
                            <div className="order-payment">Payment: {order.paymentMethod}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="wishlist-section">
                  {wishlist.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">💝</div>
                      <h3>Your wishlist is empty</h3>
                      <p>Add items you love to your wishlist!</p>
                    </div>
                  ) : (
                    <div className="wishlist-grid">
                      {wishlist.map((item) => (
                        <div key={item.id} className="wishlist-card">
                          <img src={item.image} alt={item.name} />
                          <div className="wishlist-info">
                            <h4>{item.name}</h4>
                            <div className="wishlist-price">₹{item.price}</div>
                            <div className="wishlist-actions">
                              <button className="btn-add-cart">Add to Cart</button>
                              <button 
                                className="btn-remove"
                                onClick={() => removeFromWishlist(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'favorites' && (
                <div className="favorites-section">
                  {favorites.length === 0 ? (
                    <div className="empty-state">
                      <div className="empty-icon">⭐</div>
                      <h3>No favorites yet</h3>
                      <p>Mark products as favorites to see them here!</p>
                    </div>
                  ) : (
                    <div className="favorites-grid">
                      {favorites.map((item) => (
                        <div key={item.id} className="favorite-card">
                          <img src={item.image} alt={item.name} />
                          <div className="favorite-info">
                            <h4>{item.name}</h4>
                            <div className="favorite-category">{item.category}</div>
                            <div className="favorite-price">₹{item.price}</div>
                            <div className="favorite-actions">
                              <button className="btn-add-cart">Add to Cart</button>
                              <button 
                                className="btn-remove"
                                onClick={() => removeFromFavorites(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
