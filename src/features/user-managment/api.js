import { apiClient } from '@/lib/apiClient';

export const userApi = {
    getUsers: async (filters = {}) => {
        const { data } = await apiClient.get('/admin/users', { params: filters });
        return data.data;
    },

    getUser: async (id) => {
        const { data } = await apiClient.get(`/admin/users/${id}`);
        return data.data;
    },

    getUserDocuments: async (id) => {
        const { data } = await apiClient.get(`/admin/users/${id}/documents`);
        return data.data;
    },

    updateUserStatus: async ({ id, status }) => {
        const { data } = await apiClient.patch(`/admin/users/${id}/status`, { status });
        return data.data;
    },

    updateUserVerification: async ({ id, verificationState, comment }) => {
        const payload = { verificationState };
        if (comment) payload.comment = comment;
        const { data } = await apiClient.patch(`/admin/users/${id}/verification`, payload);
        return data.data;
    },

    resolveVerification: async ({ id, status, note }) => {
        const payload = { status };
        if (note) payload.note = note;
        const { data } = await apiClient.patch(`/admin/verifications/${id}/resolve`, payload);
        return data.data;
    },
};
