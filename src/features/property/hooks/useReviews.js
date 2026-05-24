import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { renterApi } from '../../renter/api';
import { toast } from 'sonner';

export const usePropertyReviews = (propertyId) => {
  return useQuery({
    queryKey: ['propertyReviews', propertyId],
    queryFn: async () => {
      if (!propertyId) return [];
      const response = await propertyApi.getPropertyReviews(propertyId);
      // API returns array directly: [review1, review2, ...]
      // Not wrapped in {data: ...}
      return Array.isArray(response) ? response : (response.data || []);
    },
    enabled: !!propertyId,
    initialData: [],
  });
};

export const usePropertyReviewStats = (propertyId) => {
  return useQuery({
    queryKey: ['propertyReviewStats', propertyId],
    queryFn: async () => {
      if (!propertyId) return null;
      const response = await propertyApi.getPropertyReviewStats(propertyId);
      // API returns {averageRating, totalReviews}
      return response.data || response;
    },
    enabled: !!propertyId,
    initialData: { averageRating: 0, totalReviews: 0 },
  });
};

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const response = await renterApi.createReview(data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      toast.success('Review submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['propertyReviews', variables.propertyId] });
      queryClient.invalidateQueries({ queryKey: ['propertyReviewStats', variables.propertyId] });
      queryClient.invalidateQueries({ queryKey: ['properties', 'detail', variables.propertyId] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    },
  });
};
