import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '../api';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { toast } from 'sonner';

export const favoriteKeys = {
  all: ['favorites'],
};

export const useFavorites = (options = {}) => {
  const { isAuthenticated } = useAuth();
  
  return useQuery({
    queryKey: favoriteKeys.all,
    queryFn: () => favoritesApi.getFavorites(),
    select: (response) => {
      if (Array.isArray(response)) return response;
      return response?.data ?? [];
    },
    enabled: isAuthenticated,
    ...options,
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
    onMutate: async ({ propertyId, isFavorite, property }) => {
      // Cancel any outgoing refetches so they don't overwrite our optimistic update
      await queryClient.cancelQueries({ queryKey: favoriteKeys.all });

      // Snapshot the previous value
      const previousFavorites = queryClient.getQueryData(favoriteKeys.all);

      // Optimistically update to the new value
      queryClient.setQueryData(favoriteKeys.all, (old) => {
        const oldArray = Array.isArray(old) ? old : [];
        if (isFavorite) {
          return oldArray.filter((item) => item.id !== propertyId);
        } else {
          // If a property object is passed, add it; otherwise use minimal placeholder
          const newFav = property || { id: propertyId };
          return [...oldArray, newFav];
        }
      });

      // Return context with snapshotted value
      return { previousFavorites };
    },
    onError: (err, variables, context) => {
      if (context?.previousFavorites) {
        queryClient.setQueryData(favoriteKeys.all, context.previousFavorites);
      }
      toast.error(err.response?.data?.message || err.message || 'Failed to update saved properties');
    },
    onSuccess: (_, variables) => {
      toast.success(variables.isFavorite ? 'Removed from saved properties' : 'Saved property successfully!');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: favoriteKeys.all });
    }
  });
};
