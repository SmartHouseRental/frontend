import axiosInstance from '@/lib/axios';

export const renterApi = {
  getAgreements: () => axiosInstance.get('/api/v1/agreements'),
  getAgreement: (id) => axiosInstance.get(`/api/v1/agreements/${id}`),
  
  getReviews: () => axiosInstance.get('/reviews/me'),
  createReview: (data) => axiosInstance.post('/reviews', data),
  
  getProfile: () => axiosInstance.get('/api/v1/users/profile'),
  updateProfile: (data) => axiosInstance.patch('/api/v1/users/profile', data),
};
