import { useQuery } from '@tanstack/react-query';
import { notificationApi } from '../api';
import { notificationKeys } from '../constants';
import { normalizeNotification } from '../utils/normalizeNotification';

function extractNotificationList(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data?.notifications)) return response.data.notifications;
  if (Array.isArray(response?.notifications)) return response.notifications;
  return [];
}

export const useNotifications = (options = {}) => {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: async () => {
      const response = await notificationApi.getNotifications();
      return extractNotificationList(response)
        .map(normalizeNotification)
        .filter(Boolean);
    },
    staleTime: 30 * 1000,
    ...options,
  });
};

export function getUnreadCount(notifications = []) {
  return notifications.filter((n) => !n.read).length;
}
