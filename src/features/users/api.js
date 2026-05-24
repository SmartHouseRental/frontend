import axiosInstance from '@/lib/axios';

export const usersApi = {
  /**
   * GET /api/v1/users/:id — public owner profile (no auth required).
   * Returns { status, data: { owner, listings, reviews } } via axios interceptor body.
   */
  getOwnerProfile: (ownerId) => axiosInstance.get(`/api/v1/users/${ownerId}`),
};
