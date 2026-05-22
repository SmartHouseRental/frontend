import { apiClient } from '@/lib/apiClient';

export const adminApi = {
    getOverview: async (params = {}) => {
        const { data } = await apiClient.get('/admin/overview', { params });
        return data;
    },
};
