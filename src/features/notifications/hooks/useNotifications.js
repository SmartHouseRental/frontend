import { useQuery } from '@tanstack/react-query';
import { notificationApi } from '../api';
import { notificationKeys } from '../constants';

export const useNotifications = () => {
  return useQuery({
    queryKey: notificationKeys.lists(),
    queryFn: async () => {
      const response = await notificationApi.getNotifications();
      const list = response.data?.notifications || response.notifications || [];
      return list.map(n => ({
        ...n,
        read: n.read !== undefined ? n.read : !!n.readAt
      }));
    },
  });
};
