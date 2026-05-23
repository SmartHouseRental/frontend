import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { adminApi } from '../api';

import {
  normalizeAdminList,
  normalizeAdminObject,
  normalizeAdminNotifications,
  normalizeAdminDocuments,
  asArray,
} from '../adminResponse';
import {
  normalizeAdminOverview,
  mapAdminList,
  sanitizePropertyEntity,
  sanitizeReportEntity,
  sanitizeReviewEntity,
  sanitizeNotificationEntity,
  sanitizeAgreementEntity,
  sanitizePendingVerificationEntity,
} from '../adminSanitize';



export const adminKeys = {

  all: ['admin'],

  overview: (params = {}) => [...adminKeys.all, 'overview', params],

  analytics: (params = {}) => [...adminKeys.all, 'analytics', params],

  pendingVerifications: (params = {}) => [...adminKeys.all, 'pendingVerifications', params],

  auditLogs: (params = {}) => [...adminKeys.all, 'auditLogs', params],

  users: (params = {}) => [...adminKeys.all, 'users', params],

  user: (id) => [...adminKeys.all, 'user', id],

  userDocuments: (id) => [...adminKeys.all, 'userDocuments', id],

  properties: (params = {}) => [...adminKeys.all, 'properties', params],

  property: (id) => [...adminKeys.all, 'property', id],

  agreements: (params = {}) => [...adminKeys.all, 'agreements', params],

  agreement: (id) => [...adminKeys.all, 'agreement', id],

  reports: (params = {}) => [...adminKeys.all, 'reports', params],

  report: (id) => [...adminKeys.all, 'report', id],

  notifications: (params = {}) => [...adminKeys.all, 'notifications', params],

  reviews: (params = {}) => [...adminKeys.all, 'reviews', params],

};



const getErrorMessage = (error, fallback) =>

  error?.response?.data?.message || error?.response?.data?.error || fallback;



function invalidateScopedQueries(queryClient, scopedKeys) {

  scopedKeys.forEach((key) => queryClient.invalidateQueries({ queryKey: key }));

}



export function useAdminOverview(params = { range: 'monthly' }) {

  return useQuery({

    queryKey: adminKeys.overview(params),

    queryFn: () => adminApi.getOverview(params),

    select: (response) => normalizeAdminOverview(response),

  });

}



export function useAdminAnalytics(params = { range: '30d' }) {

  return useQuery({

    queryKey: adminKeys.analytics(params),

    queryFn: () => adminApi.getAnalytics(params),

    select: (response) => normalizeAdminObject(response),

  });

}



export function useAdminPendingVerifications(params) {

  return useQuery({

    queryKey: adminKeys.pendingVerifications(params),

    queryFn: () => adminApi.getPendingVerifications(params),

    select: (response) =>
      mapAdminList(response, sanitizePendingVerificationEntity),

  });

}



export function useAdminAuditLogs(params) {

  return useQuery({

    queryKey: adminKeys.auditLogs(params),

    queryFn: () => adminApi.getAuditLogs(params),

    select: (response) => normalizeAdminList(response),

  });

}



export function useAdminUsers(params) {

  return useQuery({

    queryKey: adminKeys.users(params),

    queryFn: () => adminApi.getUsers(params),

    select: (response) => normalizeAdminList(response),
  });
}

export function useAdminUser(id) {

  return useQuery({

    queryKey: adminKeys.user(id),

    queryFn: () => adminApi.getUserById(id),

    enabled: !!id,

    select: (response) => {

      const user = normalizeAdminObject(response);

      if (!user) return null;

      return {

        ...user,

        verificationDocs: asArray(user.verificationDocs),

      };

    },

  });

}



export function useAdminUserDocuments(id) {

  return useQuery({

    queryKey: adminKeys.userDocuments(id),

    queryFn: () => adminApi.getUserDocuments(id),

    enabled: !!id,

    select: (response) => normalizeAdminDocuments(response),

  });

}



export function useAdminProperties(params) {

  return useQuery({

    queryKey: adminKeys.properties(params),

    queryFn: () => adminApi.getProperties(params),

    select: (response) => mapAdminList(response, sanitizePropertyEntity),
  });
}

export function useAdminProperty(id) {

  return useQuery({

    queryKey: adminKeys.property(id),

    queryFn: () => adminApi.getPropertyById(id),

    enabled: !!id,

    select: (response) => {
      const property = normalizeAdminObject(response);
      return property ? sanitizePropertyEntity(property) : null;
    },
  });
}

export function useAdminAgreements(params) {

  return useQuery({

    queryKey: adminKeys.agreements(params),

    queryFn: () => adminApi.getAgreements(params),

    select: (response) => mapAdminList(response, sanitizeAgreementEntity),
  });
}

export function useAdminAgreement(id) {

  return useQuery({

    queryKey: adminKeys.agreement(id),

    queryFn: () => adminApi.getAgreementById(id),

    enabled: !!id,

    select: (response) => {
      const agreement = normalizeAdminObject(response);
      return agreement ? sanitizeAgreementEntity(agreement) : null;
    },
  });
}

export function useAdminReports(params) {

  return useQuery({

    queryKey: adminKeys.reports(params),

    queryFn: () => adminApi.getReports(params),

    select: (response) => mapAdminList(response, sanitizeReportEntity),
  });
}

export function useAdminReport(id) {
  return useQuery({
    queryKey: adminKeys.report(id),
    queryFn: () => adminApi.getReportById(id),
    enabled: !!id,
    select: (response) => {
      const report = normalizeAdminObject(response);
      return report ? sanitizeReportEntity(report) : null;
    },
  });
}



export function useAdminNotifications(params) {

  return useQuery({

    queryKey: adminKeys.notifications(params),

    queryFn: () => adminApi.getNotifications(params),

    select: (response) => mapAdminList(response, sanitizeNotificationEntity),
  });
}

export function useAdminReviews(params) {
  return useQuery({
    queryKey: adminKeys.reviews(params),
    queryFn: () => adminApi.getReviews(params),
    select: (response) => mapAdminList(response, sanitizeReviewEntity),
  });
}



export function useAdminUpdateUserStatus() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, status }) => adminApi.updateUserStatus(id, { status }),

    onSuccess: (_, { id }) => {

      invalidateScopedQueries(queryClient, [adminKeys.all, adminKeys.user(id)]);

      toast.success('User status updated');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to update user status')),

  });

}



export function useAdminUpdateUserVerification() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, verificationState, comment }) =>

      adminApi.updateUserVerification(id, { verificationState, comment }),

    onSuccess: (_, { id }) => {

      invalidateScopedQueries(queryClient, [adminKeys.all, adminKeys.user(id), adminKeys.pendingVerifications()]);

      toast.success('User verification updated');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to update verification')),

  });

}



export function useAdminApproveProperty() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, note }) => adminApi.approveProperty(id, note ? { note } : {}),

    onSuccess: (_, { id }) => {

      invalidateScopedQueries(queryClient, [adminKeys.all, adminKeys.property(id)]);

      toast.success('Property approved');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to approve property')),

  });

}



export function useAdminRejectProperty() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, reason, note }) => adminApi.rejectProperty(id, { reason, note }),

    onSuccess: (_, { id }) => {

      invalidateScopedQueries(queryClient, [adminKeys.all, adminKeys.property(id)]);

      toast.success('Property rejected');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to reject property')),

  });

}



export function useAdminOverrideProperty() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, payload }) => adminApi.overrideProperty(id, payload),

    onSuccess: (_, { id }) => {

      invalidateScopedQueries(queryClient, [adminKeys.all, adminKeys.property(id)]);

      toast.success('Property updated');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to update property')),

  });

}



export function useAdminUpdateAgreementStatus() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, status }) => adminApi.updateAgreementStatus(id, { status }),

    onSuccess: (_, { id }) => {

      invalidateScopedQueries(queryClient, [adminKeys.all, adminKeys.agreement(id)]);

      toast.success('Agreement status updated');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to update agreement')),

  });

}



export function useAdminCreateAgreement() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: adminApi.createAgreement,

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: adminKeys.agreements() });

      toast.success('Agreement created');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to create agreement')),

  });

}



export function useAdminUpdateReportStatus() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, status }) => adminApi.updateReportStatus(id, { status }),

    onSuccess: (_, { id }) => {

      invalidateScopedQueries(queryClient, [adminKeys.all, adminKeys.report(id)]);

      toast.success('Report status updated');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to update report')),

  });

}



export function useAdminResolveVerification() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, status, note }) => adminApi.resolveVerification(id, { status, note }),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: adminKeys.all });

      queryClient.invalidateQueries({ queryKey: adminKeys.pendingVerifications() });

      queryClient.invalidateQueries({ queryKey: adminKeys.users() });

      toast.success('Verification resolved');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to resolve verification')),

  });

}



export function useAdminBroadcastNotification() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: adminApi.broadcastNotification,

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: adminKeys.notifications() });

      toast.success('Broadcast sent');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to send broadcast')),

  });

}



export function useAdminUpdateReviewStatus() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id, status }) => adminApi.updateReviewStatus(id, { status }),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: adminKeys.reviews() });

      toast.success('Review updated');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to update review')),

  });

}



export function useAdminDeleteReview() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({ id }) => adminApi.deleteReview(id),

    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: adminKeys.reviews() });

      toast.success('Review deleted');

    },

    onError: (error) => toast.error(getErrorMessage(error, 'Failed to delete review')),

  });

}
