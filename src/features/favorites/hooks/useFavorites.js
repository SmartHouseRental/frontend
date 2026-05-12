import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '../api';
import { toast } from 'sonner';

export const favoriteKeys = {
  all: ['favorites'],
};

export const useFavorites = () => {
  return useQuery({
    queryKey: favoriteKeys.all,
    queryFn: () => favoritesApi.getFavorites(),
    select: (response) => response.data,
  });
};

export const useToggleFavorite = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ propertyId, isFavorite }) => {
      if (isFavorite) {
        return favoritesApi.removeFavorite(propertyId);
      } else {
        return favoritesApi.addFavorite(propertyId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update favorite');
    }
  });
};
