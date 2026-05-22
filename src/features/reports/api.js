import axiosInstance from '@/lib/axios';

export const reportsApi = {
  submitReport: (payload) => axiosInstance.post('/api/v1/reports', payload),
};
