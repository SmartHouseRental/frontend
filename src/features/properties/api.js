import { apiClient } from '@/lib/apiClient';
import { getToken } from '@/features/auth/utils';

export const propertyApi = {
  createProperty: async (formData) => {
    const { data } = await apiClient.post('/properties', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  getProperties: async (params = {}) => {
    const { data } = await apiClient.get('/properties', { params });
    return data;
  },

  getPropertyById: async (propertyId) => {
    const { data } = await apiClient.get(`/properties/${propertyId}`);
    return data;
  },

  getMyProperties: async () => {
    const { data } = await apiClient.get('/properties/my');
    return data;
  },

  updateProperty: async (propertyId, formData) => {
    const { data } = await apiClient.patch(`/properties/${propertyId}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  deleteProperty: async (propertyId) => {
    const { data } = await apiClient.delete(`/properties/${propertyId}`);
    return data;
  },

  updatePropertyStatus: async (propertyId, status) => {
    const { data } = await apiClient.patch(`/properties/${propertyId}/status`, { status });
    return data;
  },

  getAnalytics: async () => {
    const { data } = await apiClient.get('/properties/analytics');
    return data;
  }
};
