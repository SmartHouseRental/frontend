import axiosInstance from '@/lib/axios';

export const renterApi = {
  getAgreements: () => axiosInstance.get('/api/v1/agreements'),
  getAgreement: (id) => axiosInstance.get(`/api/v1/agreements/${id}`),
  
  getReviews: () => axiosInstance.get('/api/v1/reviews/me'),
  createReview: (data) => axiosInstance.post('/api/v1/reviews', data),
  updateReview: (id, data) => axiosInstance.patch(`/api/v1/reviews/${id}`, data),
  deleteReview: (id) => axiosInstance.delete(`/api/v1/reviews/${id}`),
  
  getProfile: () => axiosInstance.get('/api/v1/users/profile'),
  updateProfile: (data) => axiosInstance.patch('/api/v1/users/profile', data),
  changePassword: (data) => axiosInstance.patch('/api/v1/users/change-password', data),
};
