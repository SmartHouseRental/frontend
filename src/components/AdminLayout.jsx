import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router';

function AdminLayout() {
  return (
    <div className="bg-background font-display text-background-forground flex min-h-screen">
      <AdminSidebar />
      <main className="ml-72 flex-1">
        <AdminHeader />
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
