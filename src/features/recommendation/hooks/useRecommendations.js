import { useQuery, useMutation } from '@tanstack/react-query';
import { recommendationApi } from '../api';

export const useRecommendations = (options = {}) => {
    return useQuery({
        queryKey: ['recommendations'],
        queryFn: recommendationApi.getRecommendations,
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};

export const useTrackInteraction = () => {
    return useMutation({
        mutationFn: ({ propertyId, type }) => recommendationApi.trackInteraction(propertyId, type),
    });
};
