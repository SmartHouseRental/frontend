import OwnerSidebar from '@/features/owners/components/OwnerSidebar';
import OwnerHeader from '@/features/owners/components/OwnerHeader';
import { Outlet } from 'react-router';

export default function OwnerLayout() {
  return (
    <div className="bg-background flex min-h-screen">
      <OwnerSidebar />
      <div className="flex flex-1 flex-col">
        <OwnerHeader />
        <main className="bg-muted/30 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
