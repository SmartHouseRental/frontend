import axios from 'axios';
import { getToken, removeToken, setToken } from '@/features/auth/utils';

const rawApiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api/v1';

const API_ORIGIN = rawApiBaseUrl.replace(/\/api\/v1\/?$/, '') || 'http://localhost:5000';

const axiosInstance = axios.create({
  baseURL: API_ORIGIN,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: API_ORIGIN,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise = null;

const extractAccessToken = (payload) => payload?.data?.accessToken || payload?.accessToken;

const refreshAccessToken = async () => {
  const { data } = await refreshClient.post('/api/v1/auth/refresh-token');
  const nextAccessToken = extractAccessToken(data);

  if (!nextAccessToken) {
    throw new Error('Refresh endpoint did not return an access token.');
  }

  setToken(nextAccessToken);
  return nextAccessToken;
};

// Request interceptor for API calls
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('shr_access_token');
    if (token && !config.headers?.Authorization) {
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
    const originalRequest = error?.config;
    const status = error?.response?.status;
    const requestUrl = originalRequest?.url || '';
    const isRefreshRequest = requestUrl.includes('/api/v1/auth/refresh-token');

    if (status !== 401 || !originalRequest || originalRequest._retry || isRefreshRequest) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const nextAccessToken = await refreshPromise;
      originalRequest.headers = originalRequest.headers || {};
      originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      removeToken();
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
