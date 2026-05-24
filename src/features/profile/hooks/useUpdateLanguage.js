import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';
import { toast } from 'sonner';

export const useUpdateLanguage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileApi.updateLanguage,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.details() });
            toast.success('Language preference updated');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update language');
        },
    });
};
