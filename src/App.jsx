import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import SearchBar from "./components/SearchBar.jsx";

import CategoryFilter from './components/CategoryFilter.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import CartModal from './components/CartModal.jsx';
import Footer from './components/Footer.jsx';
import { mockProducts } from './mockData.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load products on component mount
  useEffect(() => {
    setIsLoading(true);
    // Simulate API loading
    setTimeout(() => {
      setProducts(mockProducts);
      setFilteredProducts(mockProducts);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Add product to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Update cart item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart item count
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Handle checkout
  const handleCheckout = () => {
    alert(`Order placed successfully! Total: $${getCartTotal().toFixed(2)}`);
    setCart([]);
    setIsCartOpen(false);
  };

  return (
    <div className="App">
      <Header 
        cartItemCount={getCartItemCount()}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <main id="products" className="container">
        <ProductGrid 
          products={filteredProducts}
          onAddToCart={addToCart}
          isLoading={isLoading}
        />
      </main>

      <About />
      <Contact />
      
      {isCartOpen && (
        <CartModal
          cart={cart}
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={handleCheckout}
          total={getCartTotal()}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;