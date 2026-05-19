import OwnerSidebar from './OwnerSidebar';
import OwnerHeader from './OwnerHeader';
import VerificationBanner from './VerificationBanner';
import { Outlet } from 'react-router';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { useDocuments } from '@/features/profile/hooks/useDocuments';

function OwnerLayout() {
  const { data: profileData } = useProfile();
  const { data: documentData } = useDocuments();
  
  const profile = profileData?.data;
  const docStatus = documentData?.data?.status || documentData?.data?.overallStatus;
  const hasDocuments = documentData?.data && (documentData?.data?.uploadedFiles?.length > 0 || docStatus);
  
  // Determine verification state for banner
  let verificationState = 'pending_documents';
  
  if (profile?.isVerified || docStatus === 'approved' || docStatus === 'verified') {
    verificationState = 'verified';
  } else if (hasDocuments) {
    if (docStatus === 'under_review') {
      verificationState = 'under_review';
    } else if (docStatus === 'rejected') {
      verificationState = 'rejected';
    } else if (docStatus === 'resubmit') {
      verificationState = 'resubmit';
    } else {
      verificationState = 'under_review';
    }
  }
  
  return (
    <div className="bg-background font-display text-foreground flex min-h-screen">
      <OwnerSidebar />
      <main className="ml-72 flex-1">
        <OwnerHeader />
        <div className="px-8 pt-2">
          <VerificationBanner verificationState={verificationState} />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default OwnerLayout;
