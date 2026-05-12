import axiosInstance from '@/lib/axios';

export const favoritesApi = {
  getFavorites: () => axiosInstance.get('/api/v1/favorites'),
  addFavorite: (propertyId) => axiosInstance.post('/api/v1/favorites', { propertyId }),
  removeFavorite: (propertyId) => axiosInstance.delete(`/api/v1/favorites/${propertyId}`),
};
