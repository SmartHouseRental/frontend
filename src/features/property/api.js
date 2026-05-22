import axiosInstance from '@/lib/axios';

export const propertyApi = {
  getProperties: (params) => {
    const numericKeys = new Set(['page', 'limit', 'minPrice', 'maxPrice', 'bedrooms', 'bathrooms']);

    const cleanedParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value === '' || value === null || value === undefined) return acc;
      if (key === 'search' || key === 'q') return acc;
      if (key === 'status') {
        acc[key] = String(value).toUpperCase();
        return acc;
      }
      if (numericKeys.has(key)) {
        const n = Number(value);
        if (Number.isFinite(n)) acc[key] = n;
        return acc;
      }
      acc[key] = value;
      return acc;
    }, {});

    return axiosInstance.get('/api/v1/properties', { params: cleanedParams });
  },
  getProperty: (id) => axiosInstance.get(`/api/v1/properties/${id}`),
  createProperty: (data) => axiosInstance.post('/api/v1/properties', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  updateProperty: (id, data) => axiosInstance.patch(`/api/v1/properties/${id}`, data),
  deleteProperty: (id) => axiosInstance.delete(`/api/v1/properties/${id}`),
  updatePropertyStatus: (id, status) => axiosInstance.patch(`/api/v1/properties/${id}/status`, { status }),
  getMyProperties: () => axiosInstance.get('/api/v1/properties/my'),
  getPropertyAnalytics: () => axiosInstance.get('/api/v1/properties/analytics'),
  getPropertyReviews: (id) => axiosInstance.get(`/api/v1/reviews/property/${id}`),
  getPropertyReviewStats: (id) => axiosInstance.get(`/api/v1/reviews/property/${id}/stats`),
};
