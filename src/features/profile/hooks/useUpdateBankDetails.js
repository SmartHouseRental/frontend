import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';
import { toast } from 'sonner';

export const useUpdateBankDetails = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: profileApi.updateBankDetails,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: profileKeys.details() });
            toast.success('Bank details updated successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to update bank details');
        },
    });
};
