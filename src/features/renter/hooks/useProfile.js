import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { renterApi } from '../api';
import { renterKeys } from './useAgreements';
import { authKeys } from '@/features/auth/constants';
import { getApiErrorMessage } from '../utils/apiErrors';
import { mergeRawProfilePatch } from '../utils/profileMappers';

function unwrapData(response) {
  return response?.data ?? response;
}

function patchProfileCache(queryClient, updater) {
  queryClient.setQueryData(renterKeys.profile(), (raw) => {
    if (!raw) return raw;
    return updater(raw);
  });
  queryClient.invalidateQueries({ queryKey: authKeys.me() });
}

export const useProfile = () => {
  return useQuery({
    queryKey: renterKeys.profile(),
    queryFn: async () => {
      const response = await renterApi.getProfile();
      return unwrapData(response);
    },
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData) => {
      const response = await renterApi.updateProfile(formData);
      return unwrapData(response);
    },
    onSuccess: (updated) => {
      patchProfileCache(queryClient, (raw) => mergeRawProfilePatch(raw, updated));
      toast.success('Profile updated successfully');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update profile'));
    },
  });
};

export const useUpdateLanguage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (language) => {
      const response = await renterApi.updateLanguage({ language });
      return unwrapData(response);
    },
    onSuccess: (result) => {
      const language = result?.language;
      patchProfileCache(queryClient, (raw) => ({
        ...raw,
        language,
        preferredLanguage: language,
      }));
      toast.success('Language preference saved');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update language'));
    },
  });
};

export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (preferences) => {
      const response = await renterApi.updateNotificationPreferences(preferences);
      return unwrapData(response);
    },
    onSuccess: (prefs) => {
      patchProfileCache(queryClient, (raw) => ({
        ...raw,
        notificationPreferences: {
          ...(raw.notificationPreferences || {}),
          ...prefs,
        },
      }));
      toast.success('Notification preferences saved');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to update notifications'));
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data) => {
      return renterApi.changePassword(data);
    },
    onSuccess: () => {
      toast.success('Password changed successfully');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to change password'));
    },
  });
};
