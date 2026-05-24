import { useMemo } from 'react';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useDocuments } from '@/features/profile/hooks/useDocuments';
import { verificationStateFromProfileAndDocuments } from '../utils/verification';

/** Profile + documents for owner pages that need verification UI (not OwnerLayout). */
export function useOwnerVerificationState() {
  const { data: profileData, isLoading: profileLoading } = useProfile();
  const { data: documentData, isLoading: docsLoading } = useDocuments();

  const profile = profileData?.data;
  const documents = documentData?.data;

  const verificationState = useMemo(
    () => verificationStateFromProfileAndDocuments(profile, documents),
    [profile, documents]
  );

  const docStatus = documents?.overallStatus || documents?.status;
  const hasDocuments =
    (documents?.uploadedFiles?.length ?? 0) > 0 || Boolean(docStatus);
  const isVerified = verificationState === 'verified';
  const preferredLanguage = profile?.language || 'en';

  return {
    verificationState,
    isVerified,
    hasDocuments,
    docStatus,
    preferredLanguage,
    isLoading: profileLoading || docsLoading,
  };
}
