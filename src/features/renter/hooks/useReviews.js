import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { renterApi } from '../api';
import { renterKeys } from '../constants';
import { toast } from 'sonner';

const selectReviews = (response) => {
  if (Array.isArray(response)) return response;
  return response?.data ?? [];
};

const invalidatePropertyReviewQueries = (queryClient, propertyId) => {
  if (!propertyId) return;
  queryClient.invalidateQueries({ queryKey: ['propertyReviews', propertyId] });
  queryClient.invalidateQueries({ queryKey: ['propertyReviewStats', propertyId] });
};

export const useReviews = () => {
  return useQuery({
    queryKey: renterKeys.reviews(),
    queryFn: () => renterApi.getReviews(),
    select: selectReviews,
  });
};

export const useUpdateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => renterApi.updateReview(id, data),
    onSuccess: (_, variables) => {
      toast.success('Review updated successfully!');
      queryClient.invalidateQueries({ queryKey: renterKeys.reviews() });
      invalidatePropertyReviewQueries(queryClient, variables.propertyId);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to update review');
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }) => renterApi.deleteReview(id),
    onSuccess: (_, variables) => {
      toast.success('Review deleted successfully');
      queryClient.invalidateQueries({ queryKey: renterKeys.reviews() });
      invalidatePropertyReviewQueries(queryClient, variables.propertyId);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || error.message || 'Failed to delete review');
    },
  });
};
