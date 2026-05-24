import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';
import { toast } from 'sonner';

export const useUpdateNotifications = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileApi.updateNotifications,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.details() });
            toast.success('Notification preferences updated');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update notification preferences');
        },
    });
};
