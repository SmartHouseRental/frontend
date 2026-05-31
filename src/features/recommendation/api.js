import axiosInstance from '@/lib/axios';

export const recommendationApi = {
    getRecommendations: () => axiosInstance.get('/api/v1/properties/recommendations'),
    trackInteraction: (propertyId, type) => axiosInstance.post('/api/v1/interactions', { propertyId, type }),
};
