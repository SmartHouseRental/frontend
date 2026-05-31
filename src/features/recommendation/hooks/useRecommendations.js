import { useQuery, useMutation } from '@tanstack/react-query';
import { recommendationApi } from '../api';

function selectRecommendations(response) {
    if (Array.isArray(response)) return response;
    if (Array.isArray(response?.data)) return response.data;
    return [];
}

export const useRecommendations = (options = {}) => {
    return useQuery({
        queryKey: ['recommendations'],
        queryFn: recommendationApi.getRecommendations,
        select: selectRecommendations,
        staleTime: 5 * 60 * 1000, // 5 minutes
        ...options,
    });
};

export const useTrackInteraction = () => {
    return useMutation({
        mutationFn: ({ propertyId, type }) => recommendationApi.trackInteraction(propertyId, type),
    });
};
