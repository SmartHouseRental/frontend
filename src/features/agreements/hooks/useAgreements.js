import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getApiErrorMessage, isSchemaSyncError } from '@/lib/apiErrors';
import { agreementsApi } from '../api';
import { agreementKeys, agreementQueryDefaults } from '../constants';

/** Only use on Owner Agreements list page. */
export const useOwnerAgreements = (params = {}, options = {}) => {
  return useQuery({
    queryKey: agreementKeys.ownerList(params),
    queryFn: () => agreementsApi.getOwnerAgreements(params),
    staleTime: agreementQueryDefaults.staleTime,
    gcTime: agreementQueryDefaults.gcTime,
    refetchOnMount: 'always',
    ...options,
  });
};

export const useExportAgreements = () => {
  return useMutation({
    mutationFn: (params) => agreementsApi.exportOwnerAgreements(params),
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `owner_agreements_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Agreements exported successfully');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to export agreements'));
    },
  });
};

/** Only use on Agreement detail page. */
export const useAgreementDetail = (agreementId, options = {}) => {
  return useQuery({
    queryKey: agreementKeys.detail(agreementId),
    queryFn: () => agreementsApi.getAgreementDetail(agreementId),
    enabled: Boolean(agreementId),
    staleTime: agreementQueryDefaults.staleTime,
    gcTime: agreementQueryDefaults.gcTime,
    ...options,
  });
};

/** Only use on Agreement detail page. */
export const useAgreementPayments = (agreementId, options = {}) => {
  return useQuery({
    queryKey: agreementKeys.payments(agreementId),
    queryFn: () => agreementsApi.getAgreementPayments(agreementId),
    enabled: Boolean(agreementId),
    staleTime: agreementQueryDefaults.staleTime,
    gcTime: agreementQueryDefaults.gcTime,
    ...options,
  });
};

export const useCreateAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload) => agreementsApi.createOwnerAgreement(payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: agreementKeys.ownerLists() });
      const sent = res?.data?.agreement?.status === 'sent';
      toast.success(sent ? 'Agreement sent to renter' : 'Agreement saved as draft');
    },
    onError: (error) => {
      const msg = getApiErrorMessage(error, 'Failed to create agreement');
      toast.error(isSchemaSyncError(error) ? `${msg} Try again after the app is redeployed.` : msg);
    },
  });
};

export const useUpdateDraftAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agreementId, payload }) => agreementsApi.updateDraftAgreement(agreementId, payload),
    onSuccess: (res, { agreementId }) => {
      queryClient.invalidateQueries({ queryKey: agreementKeys.ownerLists() });
      queryClient.invalidateQueries({ queryKey: agreementKeys.detail(agreementId) });
      toast.success('Draft agreement updated successfully');
    },
    onError: (error) => {
      const msg = getApiErrorMessage(error, 'Failed to update draft agreement');
      toast.error(isSchemaSyncError(error) ? `${msg} Try again after the app is redeployed.` : msg);
    },
  });
};

export const useSendAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agreementId, offerExpiresAt }) =>
      agreementsApi.sendAgreement(
        agreementId,
        offerExpiresAt ? { offerExpiresAt: new Date(offerExpiresAt).toISOString() } : {}
      ),
    onSuccess: (_, { agreementId }) => {
      queryClient.invalidateQueries({ queryKey: agreementKeys.ownerLists() });
      queryClient.invalidateQueries({ queryKey: agreementKeys.detail(agreementId) });
      toast.success('Agreement sent to renter');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to send agreement'));
    },
  });
};

export const useCancelAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agreementId, reason }) =>
      agreementsApi.cancelAgreement(agreementId, reason ? { reason } : {}),
    onSuccess: (_, { agreementId }) => {
      queryClient.invalidateQueries({ queryKey: agreementKeys.ownerLists() });
      queryClient.invalidateQueries({ queryKey: agreementKeys.detail(agreementId) });
      toast.success('Agreement cancelled');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to cancel agreement'));
    },
  });
};

export const useTerminateAgreement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ agreementId, reason }) =>
      agreementsApi.terminateAgreement(agreementId, reason ? { reason } : {}),
    onSuccess: (_, { agreementId }) => {
      queryClient.invalidateQueries({ queryKey: agreementKeys.ownerLists() });
      queryClient.invalidateQueries({ queryKey: agreementKeys.detail(agreementId) });
      toast.success('Agreement terminated');
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error, 'Failed to terminate agreement'));
    },
  });
};
