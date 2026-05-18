import { apiClient } from '@/lib/apiClient';
import { getToken } from '@/features/auth/utils';

export const profileApi = {
    getProfile: async () => {
        const { data } = await apiClient.get('/profile');
        return data;
    },
    updateProfile: async (formData) => {
        const { data } = await apiClient.patchForm('/profile', formData);
        return data;
    },
    getDocuments: async () => {
        const { data } = await apiClient.get('/profile/documents');
        return data;
    },
    uploadDocuments: async (formData) => {
        const token = getToken();

        const url = (import.meta.env.VITE_API_URL || 'https://smarthouserental.onrender.com/api/v1') + '/profile/documents';

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw Object.assign(new Error(data.message || 'Internal server error'), { response: { data } });
        }
        return data.data; // Note: api.js usually returned {data}, check axios return vs fetch. Axios returns { data: body }, our fetch parsed body is { status, data, message }.
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
