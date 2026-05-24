import axios from 'axios';
import { getToken } from '@/features/auth/utils';

export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'https://smarthouserental.onrender.com/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.message;
    if (status === 503 && typeof message === 'string') {
      error.userMessage = message;
    }
    return Promise.reject(error);
  }
);
