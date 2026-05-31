import OwnerSidebar from './OwnerSidebar';
import OwnerHeader from './OwnerHeader';
import { Outlet } from 'react-router';
import { DashboardShell } from '@/components/design-system/DashboardShell';

function OwnerLayout() {
  return (
    <DashboardShell sidebar={<OwnerSidebar />} header={<OwnerHeader />}>
      <Outlet />
    </DashboardShell>
  );
}

export default OwnerLayout;
