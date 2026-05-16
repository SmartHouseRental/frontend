import { useQuery } from '@tanstack/react-query';
import { profileApi } from '../api';
import { profileKeys } from '../constants';

export const useProfile = () => {
    return useQuery({
        queryKey: profileKeys.details(),
        queryFn: profileApi.getProfile,
    });
};
