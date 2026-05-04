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

// Note: You can add a response interceptor here later if we implement a mechanism to intercept 401s
// and seamlessly reload the accessToken using the refresh endpoint. For now, it leverages HTTP-Only cookies simply.
