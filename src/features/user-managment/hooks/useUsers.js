import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api';
import { userKeys } from '../constants';

export const useUsers = (filters = {}) => {
    return useQuery({
        queryKey: userKeys.list(filters),
        queryFn: () => userApi.getUsers(filters),
    });
};
