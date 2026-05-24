import { apiClient } from '@/lib/apiClient';

export const paymentsApi = {
  list: async (params = {}) => {
    const { data } = await apiClient.get('/payments', { params });
    return data;
  },

  getSummary: async () => {
    const { data } = await apiClient.get('/payments/summary');
    return data;
  },

  confirm: async (paymentId) => {
    const { data } = await apiClient.patch(`/payments/${paymentId}/confirm`);
    return data;
  },

  getProof: async (paymentId) => {
    const { data } = await apiClient.get(`/payments/${paymentId}/proof`);
    return data;
  },

  export: async (params = {}) => {
    const response = await apiClient.get('/payments/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};
