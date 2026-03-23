import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AdminLayout from './components/AdminLayout';
import OverviewPage from './pages/admin/OverviewPage';
import UserManagementPage from './pages/admin/UserManagementPage';
import PropertiesPage from './pages/admin/PropertiesPage';
import ReportsPage from './pages/admin/ReportsPage';
import AgreementsPage from './pages/admin/AgreementsPage';
import UserDetailPage from './pages/admin/UserDetailPage';
import PropertiesDetailPage from './pages/admin/PropertiesDetailPage';
import ReportDetailPage from './pages/admin/ReportDetailPage';
import AgreementDetailPage from './pages/admin/AgreementDetailPage';
import PendingVerificationsPage from './pages/admin/PendingVerificationsPage';
import NotificationsPage from './pages/admin/NotificationsPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Public routing
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />   
        */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate replace to="overview" />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="users" element={<UserManagementPage />} />
          <Route path="users/:id" element={<UserDetailPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="properties/:id" element={<PropertiesDetailPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="reports/:id" element={<ReportDetailPage />} />
          <Route path="agreements" element={<AgreementsPage />} />
          <Route path="agreements/:id" element={<AgreementDetailPage />} />
          <Route path="pending-verifications" element={<PendingVerificationsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Keep legacy routes working with redirects */}
        <Route path="/admin/userdetails" element={<Navigate replace to="/admin/users/USR-4821" />} />
        <Route path="/admin/propertiesdetail" element={<Navigate replace to="/admin/properties/PRP-1024" />} />
        <Route path="/admin/reportdetail" element={<Navigate replace to="/admin/reports/RPT-7429" />} />
        <Route path="/admin/agreementdetail" element={<Navigate replace to="/admin/agreements/AG-9428" />} />

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
