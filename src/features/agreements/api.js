import { apiClient } from '@/lib/apiClient';

export const agreementsApi = {
  getOwnerAgreements: async (params = {}) => {
    const { data } = await apiClient.get('/owner/agreements', { params });
    return data;
  },

  exportOwnerAgreements: async (params = {}) => {
    const response = await apiClient.get('/owner/agreements/export', {
      params,
      responseType: 'blob',
    });
    // apiClient interceptors usually return response.data direct if it's JSON,
    // but for blobs it might return the whole response or data inside depending on axios settings.
    // Let's assume it returns data in { data } but sometimes it returns the blob directly.
    return response.data || response;
  },

  getAgreementDetail: async (agreementId) => {
    const { data } = await apiClient.get(`/agreements/${agreementId}`);
    return data;
  },

  getAgreementPayments: async (agreementId) => {
    const { data } = await apiClient.get(`/agreements/${agreementId}/payments`);
    return data;
  },

  createOwnerAgreement: async (payload) => {
    const { data } = await apiClient.post('/owner/agreements', payload);
    return data;
  },

  updateDraftAgreement: async (agreementId, payload) => {
    const { data } = await apiClient.patch(`/owner/agreements/${agreementId}`, payload);
    return data;
  },

  sendAgreement: async (agreementId, payload = {}) => {
    const { data } = await apiClient.post(`/owner/agreements/${agreementId}/send`, payload);
    return data;
  },

  cancelAgreement: async (agreementId, payload = {}) => {
    const { data } = await apiClient.post(`/owner/agreements/${agreementId}/cancel`, payload);
    return data;
  },

  terminateAgreement: async (agreementId, payload = {}) => {
    const { data } = await apiClient.post(`/agreements/${agreementId}/terminate`, payload);
    return data;
  },
};
