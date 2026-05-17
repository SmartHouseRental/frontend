import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';
import { userKeys } from '../constants';

export const useUser = (id) => {
    return useQuery({
        queryKey: userKeys.detail(id),
        queryFn: () => userApi.getUser(id),
        enabled: !!id,
    });
};
