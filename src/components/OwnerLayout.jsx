import OwnerSidebar from './OwnerSidebar';
import OwnerHeader from './OwnerHeader';
import VerificationBanner from './VerificationBanner';
import { Outlet } from 'react-router';

function OwnerLayout() {
  return (
    <div className="bg-background font-display text-foreground flex min-h-screen">
      <OwnerSidebar />
      <main className="ml-72 flex-1">
        <OwnerHeader />
        <div className="px-8 pt-2">
          <VerificationBanner verificationState="pending_documents" />
        </div>
        <Outlet />
      </main>
    </div>
  );
}

export default OwnerLayout;
