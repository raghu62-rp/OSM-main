import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header.jsx';
import SearchBar from "./components/SearchBar.jsx";
import './components/Login.css';
import CategoryFilter from './components/CategoryFilter.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import CartModal from './components/CartModal.jsx';
import Checkout from './components/Checkout.jsx';
import Receipt from './components/Receipt.jsx';
import OrderTracking from './components/OrderTracking.jsx';
import Profile from './components/Profile.jsx';
import Footer from './components/Footer.jsx';
import { API_BASE_URL } from './config.js';
import { mockProducts } from './mockData.jsx';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [apiHealthy, setApiHealthy] = useState(null);

  // Load products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Fallback to mock data so UI remains usable when backend is down
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    }, []);

  // Periodically check backend health so UI can indicate if API is reachable
  useEffect(() => {
    let mounted = true;
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/health`, { cache: 'no-store' });
        if (!mounted) return;
        setApiHealthy(res.ok);
      } catch (err) {
        if (!mounted) return;
        setApiHealthy(false);
      }
    };

    // initial check and periodic polling every 30s
    checkHealth();
    const id = setInterval(checkHealth, 30000);
    return () => { mounted = false; clearInterval(id); };
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
  const handleCheckout = async (paymentMethod = 'UPI', customerAddress = null) => {
    try {
      // Check if we need authentication
      const token = localStorage.getItem('token');
      
      // Prepare order details for receipt
      const orderData = {
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        total: getCartTotal(),
        paymentMethod: paymentMethod.toUpperCase(),
        shippingAddress: customerAddress || {
          address: 'Not provided',
          city: 'Not provided',
          postalCode: 'Not provided',
          country: 'India'
        }
      };

      // If token exists, try to save to backend
      if (token) {
        try {
          const backendOrderData = {
            orderItems: cart.map(item => ({
              product: item.id,
              name: item.name,
              qty: item.quantity,
              price: item.price,
              image: item.image
            })),
            shippingAddress: customerAddress || {
              address: 'Not provided',
              city: 'Not provided',
              postalCode: 'Not provided',
              country: 'India'
            },
            totalPrice: getCartTotal(),
            paymentMethod: paymentMethod
          };

          await axios.post(`${API_BASE_URL}/orders`, backendOrderData, {
            headers: { Authorization: `Bearer ${token}` }
          });
        } catch (backendError) {
          console.error('Backend order save failed:', backendError);
          // Continue anyway to show receipt
        }
      }

      // Show receipt
      setOrderDetails(orderData);
      setIsCheckoutOpen(false);
      setIsCartOpen(false);
      setIsReceiptOpen(true);
      setCart([]);
      
      // Save order to localStorage for profile
      const savedOrders = JSON.parse(localStorage.getItem('userOrders') || '[]');
      savedOrders.push({
        ...orderData,
        orderId: orderData.orderId || `ORD${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        date: new Date().toLocaleDateString('en-IN'),
        status: 'Processing'
      });
      localStorage.setItem('userOrders', JSON.stringify(savedOrders));
    } catch (error) {
      console.error('Error placing order:', error);
      throw new Error('Failed to process payment. Please try again.');
    }
  };

  return (
    <div className="App">
      {apiHealthy === false && (
        <div style={{background:'#ffe6e6', color:'#8b0000', padding:'10px', textAlign:'center'}}>
          Backend API not reachable — the app may be running in mock mode.
        </div>
      )}
      <Header 
        cartItemCount={getCartItemCount()}
        onCartClick={() => setIsCartOpen(true)}
        onTrackOrderClick={() => {
          if (orderDetails) {
            setIsTrackingOpen(true);
          } else {
            alert('No recent orders found. Please place an order first.');
          }
        }}
        onProfileClick={() => {
          const userStr = localStorage.getItem('user');
          if (userStr) {
            setIsProfileOpen(true);
          } else {
            alert('Please login to view your profile.');
          }
        }}
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
            onCheckout={() => setIsCheckoutOpen(true)}
            total={getCartTotal()}
        />
      )}

      {isCheckoutOpen && (
        <Checkout
          cart={cart}
          total={getCartTotal()}
          onClose={() => setIsCheckoutOpen(false)}
          onConfirm={async (paymentMethod, address) => {
            await handleCheckout(paymentMethod, address);
          }}
        />
      )}

      {isReceiptOpen && orderDetails && (
        <Receipt
          orderData={orderDetails}
          onClose={() => setIsReceiptOpen(false)}
          onTrackOrder={(order) => {
            setIsReceiptOpen(false);
            setIsTrackingOpen(true);
            setOrderDetails(order);
          }}
        />
      )}

      {isTrackingOpen && orderDetails && (
        <OrderTracking
          order={orderDetails}
          onClose={() => setIsTrackingOpen(false)}
        />
      )}

      {isProfileOpen && (
        <Profile
          user={JSON.parse(localStorage.getItem('user') || '{}')}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
      
      <Footer />
    </div>
  );
}

export default App;
