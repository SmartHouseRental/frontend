import { apiClient } from '@/lib/apiClient';

export const reviewsApi = {
  getOwnerReviews: async (params = {}) => {
    const { data } = await apiClient.get('/reviews/owner', { params });
    return data;
  },

  getOwnerStats: async () => {
    const { data } = await apiClient.get('/reviews/owner/stats');
    return data;
  },

  replyToReview: async (reviewId, reply) => {
    const { data } = await apiClient.patch(`/reviews/${reviewId}/reply`, { reply });
    return data;
  },
};
