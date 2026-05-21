import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationApi } from '../api';
import { notificationKeys } from '../constants';
import { toast } from 'sonner';

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => notificationApi.markAsRead(id),
    onMutate: async (id) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: notificationKeys.lists() });

      // Snapshot the previous value
      const previousNotifications = queryClient.getQueryData(notificationKeys.lists());

      // Optimistically update to the new value
      if (previousNotifications) {
        queryClient.setQueryData(notificationKeys.lists(), (old) => {
          if (!old) return old;
          return old.map(n => n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n);
        });
      }

      return { previousNotifications };
    },
    onError: (error, id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(notificationKeys.lists(), context.previousNotifications);
      }
      toast.error(error?.response?.data?.message || 'Failed to mark as read');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
};
