import axiosInstance from '@/lib/axios';

export const notificationApi = {
  getNotifications: () => axiosInstance.get('/api/v1/notifications'),
  
  markAsRead: (id) => axiosInstance.patch(`/api/v1/notifications/${id}/read`)
};
