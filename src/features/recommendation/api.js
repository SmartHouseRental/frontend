import axiosInstance from '@/lib/axios';

export const recommendationApi = {
    getRecommendations: () => axiosInstance.get('/api/v1/recommendation/properties/recommendations'),
    trackInteraction: (propertyId, type) => axiosInstance.post('/api/v1/recommendation/interactions', { propertyId, type }),
};
