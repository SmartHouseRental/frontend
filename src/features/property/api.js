import axiosInstance from '@/lib/axios';

export const propertyApi = {
  getProperties: (params) => {
    // Normalize status to uppercase and remove empty strings
    const cleanedParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value === '' || value === null || value === undefined) return acc;
      if (key === 'status') {
        acc[key] = value.toUpperCase();
      } else if (key === 'search') {
        // Skip search if not supported by backend listing endpoint
        // (The backend seems to use different mechanisms for search)
        return acc;
      } else {
        acc[key] = value;
      }
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
