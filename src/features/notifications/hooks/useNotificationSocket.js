import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { io } from 'socket.io-client';
import { getToken } from '@/features/auth/utils';
import { apiClient } from '@/lib/apiClient';
import { notificationKeys } from '../constants';

function getBaseUrl() {
  const configUrl = apiClient.defaults.baseURL || '';
  return configUrl.replace(/\/api\/v1\/?$/, '');
}

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const socketUrl = getBaseUrl();
    const socket = io(socketUrl, {
      auth: { token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      // In many architectures, the server automatically joins the user to a generic room 
      // based on their auth token (e.g., `user_${userId}`).
    });

    // Real-time Event Listeners
    socket.on('notification:new', () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    });

    socket.on('notification:updated', () => {
      queryClient.invalidateQueries({ queryKey: notificationKeys.lists() });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
