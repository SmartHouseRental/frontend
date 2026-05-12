import axiosInstance from '@/lib/axios';

export const propertyApi = {
  getProperties: (params) => axiosInstance.get('/api/v1/properties', { params }),
  getProperty: (id) => axiosInstance.get(`/api/v1/properties/${id}`),
};
