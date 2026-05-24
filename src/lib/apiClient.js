import axios from 'axios';
import { getToken, removeToken, setToken } from '@/features/auth/utils';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'http://localhost:5000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let refreshPromise = null;

const extractAccessToken = (payload) => payload?.data?.accessToken || payload?.accessToken;

const refreshAccessToken = async () => {
  const { data } = await refreshClient.post('/auth/refresh-token');
  const nextAccessToken = extractAccessToken(data);

  if (!nextAccessToken) {
    throw new Error('Refresh endpoint did not return an access token.');
  }

  setToken(nextAccessToken);
  return nextAccessToken;
};

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && !config.headers?.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    const status = error?.response?.status;
    const requestUrl = originalRequest?.url || '';
    const isRefreshRequest = requestUrl.includes('/auth/refresh-token');

    if (status !== 401 || !originalRequest || originalRequest._retry || isRefreshRequest) {
      const message = error?.response?.data?.message;
      if (status === 503 && typeof message === 'string') {
        error.userMessage = message;
      }
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

      return apiClient(originalRequest);
    } catch (refreshError) {
      removeToken();
      return Promise.reject(refreshError);
    }
  },
);
