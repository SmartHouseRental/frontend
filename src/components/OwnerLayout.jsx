import OwnerSidebar from './OwnerSidebar';
import OwnerHeader from './OwnerHeader';
import { Outlet } from 'react-router';

/** Shell only — no page-specific API calls. Data loads in child routes via Outlet. */
function OwnerLayout() {
  return (
    <div className="bg-background font-display text-foreground flex min-h-screen">
      <OwnerSidebar />
      <main className="ml-72 flex-1">
        <OwnerHeader />
        <Outlet />
      </main>
    </div>
  );
}

export default OwnerLayout;
