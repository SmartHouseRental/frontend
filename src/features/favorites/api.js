import axiosInstance from '@/lib/axios';

export const favoritesApi = {
  getFavorites: () => axiosInstance.get('/api/v1/properties/saved'),
  addFavorite: (propertyId) => axiosInstance.post(`/api/v1/properties/${propertyId}/save`),
  removeFavorite: (propertyId) => axiosInstance.delete(`/api/v1/properties/${propertyId}/save`),
};
