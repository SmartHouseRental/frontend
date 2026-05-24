import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { notificationApi } from '../api';
import { notificationKeys } from '../constants';
import { getNotificationErrorMessage } from '../utils/apiErrors';

function markReadInCache(old, id) {
  if (!old) return old;
  return old.map((n) =>
    n.id === id ? { ...n, read: true, readAt: new Date().toISOString() } : n,
  );
}

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => notificationApi.markAsRead(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.lists() });
      const previous = queryClient.getQueryData(notificationKeys.lists());
      queryClient.setQueryData(notificationKeys.lists(), (old) => markReadInCache(old, id));
      return { previous };
    },
    onSuccess: () => {
      toast.success('Marked as read');
    },
    onError: (error, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationKeys.lists(), context.previous);
      }
      toast.error(getNotificationErrorMessage(error, 'Failed to mark as read'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids) => {
      const results = await Promise.allSettled(ids.map((id) => notificationApi.markAsRead(id)));
      const failures = results.filter((r) => r.status === 'rejected');
      if (failures.length === ids.length) {
        const firstError = failures[0].reason;
        throw firstError;
      }
      return { ids, failedCount: failures.length };
    },
    onMutate: async (ids) => {
      await queryClient.cancelQueries({ queryKey: notificationKeys.lists() });
      const previous = queryClient.getQueryData(notificationKeys.lists());
      const idSet = new Set(ids);
      queryClient.setQueryData(notificationKeys.lists(), (old) => {
        if (!old) return old;
        return old.map((n) =>
          idSet.has(n.id) ? { ...n, read: true, readAt: new Date().toISOString() } : n,
        );
      });
      return { previous };
    },
    onSuccess: (result) => {
      if (result?.failedCount > 0) {
        toast.warning(
          `${result.failedCount} notification(s) could not be marked read. Others were updated.`,
        );
      } else {
        toast.success('All notifications marked as read');
      }
    },
    onError: (error, _ids, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationKeys.lists(), context.previous);
      }
      toast.error(getNotificationErrorMessage(error, 'Failed to mark all as read'));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    },
  });
};
