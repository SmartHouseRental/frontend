import VerificationBanner from '@/components/VerificationBanner';
import { useOwnerVerificationState } from '../hooks/useOwnerVerificationState';

/**
 * Fetches profile/documents only when this component mounts (page-level).
 * Do not use in OwnerLayout.
 */
export function OwnerVerificationBannerBar() {
  const { verificationState } = useOwnerVerificationState();
  return <VerificationBanner verificationState={verificationState} />;
}
