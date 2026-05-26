import axiosInstance from '@/lib/axios';

export const renterApi = {
  getReviews: () => axiosInstance.get('/api/v1/reviews/me'),
  createReview: (data) => axiosInstance.post('/api/v1/reviews', data),
  updateReview: (id, data) => axiosInstance.patch(`/api/v1/reviews/${id}`, data),
  deleteReview: (id) => axiosInstance.delete(`/api/v1/reviews/${id}`),

  /** GET /api/v1/profile — full renter profile */
  getProfile: () => axiosInstance.get('/api/v1/profile'),

  /** PATCH /api/v1/profile — multipart: fullName, phone, location, bio, image */
  updateProfile: (formData) =>
    axiosInstance.patch('/api/v1/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),

  /** POST /api/v1/profile/change-password */
  changePassword: (data) => axiosInstance.post('/api/v1/profile/change-password', data),

  /** PATCH /api/v1/profile/notifications */
  updateNotificationPreferences: (data) =>
    axiosInstance.patch('/api/v1/profile/notifications', data),

  /** PATCH /api/v1/profile/language — body: { language: 'en'|'am'|'or'|'ti' } */
  updateLanguage: (data) => axiosInstance.patch('/api/v1/profile/language', data),

  /** GET /api/v1/renter/preferences — fetch renter search preferences */
  getPreferences: () => axiosInstance.get('/api/v1/renter/preferences'),

  /** PATCH /api/v1/renter/preferences — update renter search preferences */
  updatePreferences: (data) => axiosInstance.patch('/api/v1/renter/preferences', data),
};
