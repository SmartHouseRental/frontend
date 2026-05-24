import axiosInstance from '@/lib/axios';
import { apiClient } from '@/lib/apiClient';

/**
 * POST /api/v1/reports — multipart/form-data (renter auth required).
 * Fields: targetType, targetId, category, description (required),
 * images[] (optional files, max 10).
 */
export const reportsApi = {
  getOwnerReports: async (params = {}) => {
    const { data } = await apiClient.get('/reports', { params });
    return data;
  },

  getOwnerReport: async (reportId) => {
    const { data } = await apiClient.get(`/reports/${reportId}`);
    return data;
  },

  submitOwnerResponse: async (reportId, response) => {
    const { data } = await apiClient.post(`/reports/${reportId}/response`, { response });
    return data;
  },

  submitReport: ({ targetType, targetId, category, description, imageFiles = [] }) => {
    const formData = new FormData();
    formData.append('targetType', targetType);
    formData.append('targetId', targetId);
    formData.append('category', category);
    formData.append('description', description);

    imageFiles.forEach((file) => {
      formData.append('images', file);
    });

    return axiosInstance.post('/api/v1/reports', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
};
