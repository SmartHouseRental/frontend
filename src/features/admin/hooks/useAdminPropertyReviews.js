import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';
import { asArray } from '../adminResponse';
import { toDisplayString } from '../mappers';

export const adminPropertyReviewKeys = {
  list: (propertyId) => ['admin', 'property-reviews', propertyId],
  stats: (propertyId) => ['admin', 'property-reviews-stats', propertyId],
};

function unwrapPayload(response) {
  if (response?.data?.data !== undefined) return response.data.data;
  if (response?.data !== undefined) return response.data;
  return response;
}

export function useAdminPropertyReviews(propertyId) {
  return useQuery({
    queryKey: adminPropertyReviewKeys.list(propertyId),
    queryFn: () => adminApi.getPropertyReviews(propertyId),
    enabled: !!propertyId,
    select: (response) => {
      const payload = unwrapPayload(response);
      return asArray(payload).map((review) => ({
        ...review,
        comment: toDisplayString(review.comment, ''),
        reviewerLabel:
          review.reviewer?.email ||
          [review.reviewer?.first_name, review.reviewer?.last_name].filter(Boolean).join(' ') ||
          'Anonymous',
      }));
    },
  });
}

export function useAdminPropertyReviewStats(propertyId) {
  return useQuery({
    queryKey: adminPropertyReviewKeys.stats(propertyId),
    queryFn: () => adminApi.getPropertyReviewStats(propertyId),
    enabled: !!propertyId,
    select: (response) => {
      const payload = unwrapPayload(response);
      return {
        averageRating: Number(payload?.averageRating ?? 0),
        totalReviews: Number(payload?.totalReviews ?? 0),
      };
    },
  });
}
