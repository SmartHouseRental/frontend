import { apiClient } from '@/lib/apiClient';

export const adminApi = {
  getOverview: (params) => apiClient.get('/admin/overview', { params }),
  getAnalytics: (params) => apiClient.get('/admin/analytics', { params }),
  getPendingVerifications: (params) => apiClient.get('/admin/pending-verifications', { params }),
  getAuditLogs: (params) => apiClient.get('/admin/audit-logs', { params }),

  getUsers: (params) => apiClient.get('/admin/users', { params }),
  getUserById: (id) => apiClient.get(`/admin/users/${id}`),
  getUserDocuments: (id) => apiClient.get(`/admin/users/${id}/documents`),
  updateUserStatus: (id, payload) => apiClient.patch(`/admin/users/${id}/status`, payload),
  updateUserVerification: (id, payload) => apiClient.patch(`/admin/users/${id}/verification`, payload),

  getProperties: (params) => apiClient.get('/admin/properties', { params }),
  getPropertyById: (id) => apiClient.get(`/admin/properties/${id}`),
  overrideProperty: (id, payload) => apiClient.patch(`/admin/properties/${id}`, payload),
  approveProperty: (id, payload) => apiClient.patch(`/admin/properties/${id}/approve`, payload),
  rejectProperty: (id, payload) => apiClient.patch(`/admin/properties/${id}/reject`, payload),

  getAgreements: (params) => apiClient.get('/admin/agreements', { params }),
  getAgreementById: (id) => apiClient.get(`/admin/agreements/${id}`),
  getAgreementRiskAssessment: (id) => apiClient.get(`/admin/agreements/${id}/risk-assessment`),
  getAgreementPaymentSummary: (id) => apiClient.get(`/admin/agreements/${id}/payment-summary`),
  getAgreementPayments: (agreementId) => apiClient.get(`/admin/agreements/${agreementId}/payments`),
  getPaymentProof: (paymentId) => apiClient.get(`/admin/payments/${paymentId}/proof`),
  createAgreement: (payload) => apiClient.post('/admin/agreements', payload),
  updateAgreementStatus: (id, payload) => apiClient.patch(`/admin/agreements/${id}/status`, payload),

  getReports: (params) => apiClient.get('/admin/reports', { params }),
  getReportById: (id) => apiClient.get(`/admin/reports/${id}`),
  getReportRiskAssessment: (id) => apiClient.get(`/admin/reports/${id}/risk-assessment`),
  updateReportStatus: (id, payload) => apiClient.patch(`/admin/reports/${id}/status`, payload),

  resolveVerification: (id, payload) => apiClient.patch(`/admin/verifications/${id}/resolve`, payload),

  getNotifications: (params) => apiClient.get('/admin/notifications', { params }),
  broadcastNotification: (payload) => apiClient.post('/admin/notifications/broadcast', payload),

  getReviews: (params) => apiClient.get('/admin/reviews', { params }),
  updateReviewStatus: (id, payload) => apiClient.patch(`/admin/reviews/${id}/status`, payload),
  deleteReview: (id) => apiClient.delete(`/admin/reviews/${id}`),

  /** Public review endpoints (used on admin property detail) */
  getPropertyReviews: (propertyId) => apiClient.get(`/reviews/property/${propertyId}`),
  getPropertyReviewStats: (propertyId) => apiClient.get(`/reviews/property/${propertyId}/stats`),
};
