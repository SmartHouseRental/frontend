import axiosInstance from '@/lib/axios';

export const usersApi = {
  /** GET /api/v1/users/:id — public owner profile with listings and reviews */
  getOwnerProfile: (ownerId) => axiosInstance.get(`/api/v1/users/${ownerId}`),
};
