import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { propertyApi } from '../api';
import { renterApi } from '../../renter/api';
import { toast } from 'sonner';

export const usePropertyReviews = (propertyId) => {
  return useQuery({
    queryKey: ['propertyReviews', propertyId],
    queryFn: async () => {
      if (!propertyId) return null;
      const response = await propertyApi.getPropertyReviews(propertyId);
      return response.data; // Return the array of reviews
    },
    enabled: !!propertyId,
  });
};

export const usePropertyReviewStats = (propertyId) => {
  return useQuery({
    queryKey: ['propertyReviewStats', propertyId],
    queryFn: async () => {
      if (!propertyId) return null;
      const response = await propertyApi.getPropertyReviewStats(propertyId);
      return response.data;
    },
    enabled: !!propertyId,
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
      // Invalidate both property reviews, stats and details using the propertyId
      queryClient.invalidateQueries({ queryKey: ['propertyReviews', variables.propertyId] });
      queryClient.invalidateQueries({ queryKey: ['propertyReviewStats', variables.propertyId] });
      queryClient.invalidateQueries({ queryKey: ['properties', 'detail', variables.propertyId] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    },
  });
};
