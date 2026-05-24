import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage } from '@/lib/apiErrors';
import { reviewsApi } from '../api';
import { reviewKeys, reviewQueryDefaults } from '../constants';

export const useOwnerReviews = (params = {}, options = {}) => {
  return useQuery({
    queryKey: reviewKeys.ownerList(params),
    queryFn: () => reviewsApi.getOwnerReviews(params),
    staleTime: reviewQueryDefaults.staleTime,
    gcTime: reviewQueryDefaults.gcTime,
    ...options,
  });
};

export const useOwnerReviewStats = (options = {}) => {
  return useQuery({
    queryKey: reviewKeys.ownerStats(),
    queryFn: reviewsApi.getOwnerStats,
    staleTime: reviewQueryDefaults.staleTime,
    gcTime: reviewQueryDefaults.gcTime,
    ...options,
  });
};

export const useReplyToReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, reply }) => reviewsApi.replyToReview(reviewId, reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKeys.ownerLists() });
      queryClient.invalidateQueries({ queryKey: reviewKeys.ownerStats() });
      toast.success('Reply sent successfully');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to send reply'));
    },
  });
};
