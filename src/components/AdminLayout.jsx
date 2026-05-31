import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router';
import { DashboardShell } from '@/components/design-system/DashboardShell';

function AdminLayout() {
  return (
    <DashboardShell sidebar={<AdminSidebar />} header={<AdminHeader />}>
      <Outlet />
    </DashboardShell>
  );
}

export default AdminLayout;
