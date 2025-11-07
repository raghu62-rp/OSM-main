import React, { useState, useEffect } from 'react';

const ProductCard = ({ product, onAddToCart, onAddToWishlist, onAddToFavorites }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Check if product is in wishlist or favorites
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    setIsWishlisted(wishlist.some(item => item.id === product.id));
    setIsFavorited(favorites.some(item => item.id === product.id));
  }, [product.id]);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
    
    if (isWishlisted) {
      const updated = wishlist.filter(item => item.id !== product.id);
      localStorage.setItem('wishlist', JSON.stringify(updated));
      setIsWishlisted(false);
    } else {
      wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      setIsWishlisted(true);
    }
    
    if (onAddToWishlist) onAddToWishlist(product);
  };

  const handleFavoriteToggle = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    if (isFavorited) {
      const updated = favorites.filter(item => item.id !== product.id);
      localStorage.setItem('favorites', JSON.stringify(updated));
      setIsFavorited(false);
    } else {
      favorites.push(product);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      setIsFavorited(true);
    }
    
    if (onAddToFavorites) onAddToFavorites(product);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    while (stars.length < 5) {
      stars.push('☆');
    }

    return stars.join('');
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
        <div className="product-actions">
          <button 
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            {isWishlisted ? '💖' : '🤍'}
          </button>
          <button 
            className={`favorite-btn ${isFavorited ? 'active' : ''}`}
            onClick={handleFavoriteToggle}
            title={isFavorited ? "Remove from Favorites" : "Add to Favorites"}
          >
            {isFavorited ? '⭐' : '☆'}
          </button>
        </div>
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.name}</h3>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
          <span>({product.rating})</span>
        </div>
        <div className="product-price">₹{product.price}</div>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart 🛒
        </button>
      </div>
    </div>
  );
};

export default ProductCard;