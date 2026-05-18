import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://smarthouserental.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('shr_access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  async (error) => {
    // Handle global errors here (e.g., redirect to login on 401)
    return Promise.reject(error);
  }
);

export default axiosInstance;
