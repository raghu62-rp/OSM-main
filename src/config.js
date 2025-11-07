// API Configuration
// In production, this will use the VITE_API_URL environment variable from Render
// In development, it uses the local backend
const isDevelopment = import.meta.env.DEV;
const productionApiUrl = import.meta.env.VITE_API_URL || 'https://osm-backend-r7zg.onrender.com/api';
const developmentApiUrl = 'http://127.0.0.1:5000/api';

export const API_BASE_URL = isDevelopment ? developmentApiUrl : productionApiUrl;

console.log('Environment:', isDevelopment ? 'Development' : 'Production');
console.log('API Base URL:', API_BASE_URL);

// If you need to switch to production or GitHub Pages, change this value accordingly.
