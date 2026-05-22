import axiosInstance from '@/lib/axios';

export const agreementsApi = {
  list: (params = {}) =>
    axiosInstance.get('/api/v1/agreements/me', { params }),

  getById: (id) => axiosInstance.get(`/api/v1/agreements/${id}`),

  accept: (id) => axiosInstance.post(`/api/v1/agreements/${id}/accept`),

  reject: (id, body = {}) =>
    axiosInstance.post(`/api/v1/agreements/${id}/reject`, body),

  cancel: (id, body = {}) =>
    axiosInstance.post(`/api/v1/agreements/${id}/cancel`, body),

  initiateDeposit: (id) =>
    axiosInstance.post(`/api/v1/agreements/${id}/deposit/initiate`),

  getDepositStatus: (id) =>
    axiosInstance.get(`/api/v1/agreements/${id}/deposit/status`),

  getPayments: (id) =>
    axiosInstance.get(`/api/v1/agreements/${id}/payments`),
};
