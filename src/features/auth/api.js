import { apiClient } from '@/lib/apiClient';

export const authApi = {
  login: async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },
  register: async (userData) => {
    const { data } = await apiClient.post('/auth/register', userData);
    return data;
  },
  refreshToken: async () => {
    const { data } = await apiClient.post('/auth/refresh-token');
    return data;
  },
  logout: async () => {
    const { data } = await apiClient.post('/auth/logout');
    return data;
  },
  getMe: async () => {
    // Handling endpoint according to our conventional assumption
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
  verifyEmail: async (payload) => {
    const { data } = await apiClient.post('/auth/verify-email', payload);
    return data;
  },
  resendVerificationCode: async (payload) => {
    const { data } = await apiClient.post('/auth/resend-code', payload);
    return data;
  },
  forgotPassword: async (payload) => {
    const { data } = await apiClient.post('/auth/forgot-password', payload);
    return data;
  },
  resetPassword: async (payload) => {
    const { data } = await apiClient.post('/auth/reset-password', payload);
    return data; // returns status success/message
  },
};
