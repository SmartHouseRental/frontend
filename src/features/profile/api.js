import { apiClient } from '@/lib/apiClient';

export const profileApi = {
    getProfile: async () => {
        const { data } = await apiClient.get('/profile');
        return data;
    },
    updateProfile: async (formData) => {
        const { data } = await apiClient.patch('/profile', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },
    getDocuments: async () => {
        const { data } = await apiClient.get('/profile/documents');
        return data;
    },
    uploadDocuments: async (formData) => {
        const { data } = await apiClient.post('/profile/documents', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return data;
    },
    updateBankDetails: async (payload) => {
        const { data } = await apiClient.patch('/profile/bank', payload);
        return data;
    },
    updateNotifications: async (payload) => {
        const { data } = await apiClient.patch('/profile/notifications', payload);
        return data;
    },
    updateLanguage: async (payload) => {
        const { data } = await apiClient.patch('/profile/language', payload);
        return data;
    },
    changePassword: async (payload) => {
        const { data } = await apiClient.post('/profile/change-password', payload);
        return data;
    },
};
