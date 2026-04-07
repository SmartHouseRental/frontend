import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ThemeProvider } from './components/ThemeProvider';
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

// Owner Dashboard
import OwnerLayout from './components/OwnerLayout';
import OwnerOverviewPage from './pages/owner/OverviewPage';
import MyPropertiesPage from './pages/owner/MyPropertiesPage';
import PropertyDetailPage from './pages/owner/PropertyDetailPage';
import AddPropertyPage from './pages/owner/AddPropertyPage';
import EditPropertyPage from './pages/owner/EditPropertyPage';
import OwnerAppointmentsPage from './pages/owner/AppointmentsPage';
import OwnerAgreementsPage from './pages/owner/AgreementsPage';
import OwnerAgreementDetailPage from './pages/owner/AgreementDetailPage';
import MessagesPage from './pages/owner/MessagesPage';
import ReviewsPage from './pages/owner/ReviewsPage';
import NotificationsPage from './pages/owner/NotificationsPage';
import OwnerReportsPage from './pages/owner/ReportsPage';
import AnalyticsPage from './pages/owner/AnalyticsPage';
import ProfilePage from './pages/owner/ProfilePage';
import PaymentHistoryPage from './pages/owner/PaymentHistoryPage';
import HelpSupportPage from './pages/owner/HelpSupportPage';
import PendingVerificationsPage from './pages/admin/PendingVerificationsPage';
import NotificationsAdminPage from './pages/admin/NotificationsPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
import AnalyticsAdminPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
import ReviewsAdminPage from './pages/admin/ReviewsPage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/*  Public rounting

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />   
        */}

          {/* Admin Routing */}
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
            <Route path="notifications" element={<NotificationsAdminPage />} />
            <Route path="audit-logs" element={<AuditLogsPage />} />
            <Route path="analytics" element={<AnalyticsAdminPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="reviews" element={<ReviewsAdminPage />} />
          </Route>

          {/* Keep legacy routes working with redirects */}
          <Route
            path="/admin/userdetails"
            element={<Navigate replace to="/admin/users/USR-4821" />}
          />
          <Route
            path="/admin/propertiesdetail"
            element={<Navigate replace to="/admin/properties/PRP-1024" />}
          />
          <Route
            path="/admin/reportdetail"
            element={<Navigate replace to="/admin/reports/RPT-7429" />}
          />
          <Route
            path="/admin/agreementdetail"
            element={<Navigate replace to="/admin/agreements/AG-9428" />}
          />

          {/* Owner Routing */}
          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<Navigate replace to="overview" />} />
            <Route path="overview" element={<OwnerOverviewPage />} />
            <Route path="properties" element={<MyPropertiesPage />} />
            <Route path="property-detail" element={<PropertyDetailPage />} />
            <Route path="add-property" element={<AddPropertyPage />} />
            <Route path="edit-property" element={<EditPropertyPage />} />
            <Route path="appointments" element={<OwnerAppointmentsPage />} />
            <Route path="agreements" element={<OwnerAgreementsPage />} />
            <Route path="agreement-detail" element={<OwnerAgreementDetailPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="reports" element={<OwnerReportsPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="payments" element={<PaymentHistoryPage />} />
            <Route path="help" element={<HelpSupportPage />} />
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
