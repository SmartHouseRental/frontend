import axiosInstance from '@/lib/axios';

/**
 * POST /api/v1/reports — multipart/form-data (renter auth required).
 * Fields: targetType, targetId, category, description (required),
 * images[] (optional files, max 10).
 */
export const reportsApi = {
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
