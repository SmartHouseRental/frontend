import { apiClient } from '@/lib/apiClient';
import { getToken } from '@/features/auth/utils';

export const propertyApi = {
  createProperty: async (formData) => {
    const token = getToken();
    const url = (import.meta.env.VITE_API_URL || 'https://smarthouserental.onrender.com/api/v1') + '/properties';

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      body: formData
    });

    const data = await response.json();
    if (!response.ok) {
      throw Object.assign(new Error(data.message || 'Internal server error'), { response: { data } });
    }
    return data.data;
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
    const token = getToken();
    const url = (import.meta.env.VITE_API_URL || 'https://smarthouserental.onrender.com/api/v1') + `/properties/${propertyId}`;

    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (!response.ok) {
      throw Object.assign(new Error(data.message || 'Internal server error'), { response: { data } });
    }
    return data.data;
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
