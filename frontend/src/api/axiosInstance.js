import axios from 'axios';

// Backend API eka connect karanna shared axios instance eka
// baseURL eka VITE_API_URL env variable eken enne (frontend/.env)
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor - localStorage eken JWT token eka ganna
// hama request ekekata Authorization header eken attach karanna
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
