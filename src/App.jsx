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
import SignUpPage from './pages/auth/SignUpPage';
import OTPVerificationPage from './pages/auth/OTPVerificationPage';
import RenterPreferencesWizard from './pages/auth/RenterPreferencesWizard';
import WelcomePage from './pages/auth/WelcomePage';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './features/users/components/ProtectedRoute';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RenterChatPage from './pages/RenterChatPage';
import PropertyDetails from './pages/PropertyDetails';
import EditProfilePage from './pages/EditProfilePage';
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/*  Public rounting

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />  
        
        */}

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/preferences" element={<RenterPreferencesWizard />} />
          <Route path="/welcome" element={<WelcomePage />} />

          <Route
            path="/"
            element={
              <MainLayout>
                <LandingPage />
              </MainLayout>
            }
          />

          <Route
            path="/explore"
            element={
              <MainLayout>
                <ExplorePage />
              </MainLayout>
            }
          />

          <Route
            path="/saved"
            element={
              <MainLayout>
                <SavedPropertiesPage />
                <ProtectedRoute></ProtectedRoute>
              </MainLayout>
            }
          />

          <Route
            path="/about"
            element={
              <MainLayout>
                <AboutPage />
              </MainLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <MainLayout>
                <ContactPage />
              </MainLayout>
            }
          />

          <Route
            path="/chat"
            element={
              <MainLayout>
                <RenterChatPage />
                <ProtectedRoute></ProtectedRoute>
              </MainLayout>
            }
          />

          <Route
            path="/property/:id"
            element={
              <MainLayout>
                <PropertyDetails />
              </MainLayout>
            }
          />

          <Route
            path="/verify"
            element={
              <MainLayout>
                <ProtectedRoute>{/* <VerificationPage /> */}</ProtectedRoute>
              </MainLayout>
            }
          />

          <Route
            path="/profile/edit"
            element={
              <MainLayout>
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <MainLayout>
                <ProfilePage />
              </MainLayout>
            }
          />

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
