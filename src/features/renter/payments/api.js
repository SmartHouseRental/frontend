import axiosInstance from '@/lib/axios';

export const paymentsApi = {
  list: (params = {}) =>
    axiosInstance.get('/api/v1/payments', { params }),

  verifyChapa: (txRef) =>
    axiosInstance.post('/api/v1/payments/chapa/verify', { tx_ref: txRef }),

  uploadProof: (paymentId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axiosInstance.post(`/api/v1/payments/${paymentId}/proof`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
