import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ThemeProvider } from './components/ThemeProvider';
import ProtectedRoute from './components/ProtectedRoute';
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
import RenterLayout from './components/RenterLayout';
import AppointmentsPage from './pages/renter/AppointmentsPage';
import RenterAgreementsPage from './pages/renter/AgreementsPage';
import RenterAgreementDetailPage from './pages/renter/AgreementDetailPage';
import RenterReviewsPage from './pages/renter/ReviewsPage';
import RenterProfilePage from './pages/renter/ProfilePage';
import ScheduleVisitPage from './pages/renter/ScheduleVisitPage';
import { Toaster } from '@/components/ui/sonner';

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
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import MainLayout from './components/MainLayout';
import SavedPropertiesPage from './pages/SavedPropertiesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RenterChatPage from './pages/RenterChatPage';
import EditProfilePage from './pages/EditProfilePage';
import LandingPage from './pages/home/LandingPage';
import ExplorePage from './pages/home/ExplorePage';
import PropertyDetailRenterPage from './pages/home/PropertyDetailPage';
import SearchResultsPage from './pages/home/SearchResultsPage';
import LoginPage from './pages/auth/LoginPage';
import UserProfilePage from './pages/ProfilePage';

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
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-otp" element={<OTPVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
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
            path="/search"
            element={
              <MainLayout>
                <SearchResultsPage />
              </MainLayout>
            }
          />

          <Route
            path="/saved"
            element={
              <ProtectedRoute allowedRoles={['renter']}>
                <MainLayout>
                  <SavedPropertiesPage />
                </MainLayout>
              </ProtectedRoute>
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
              <ProtectedRoute allowedRoles={['renter']}>
                <MainLayout>
                  <RenterChatPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/property/:id"
            element={
              <MainLayout>
                <PropertyDetailRenterPage />
              </MainLayout>
            }
          />

          <Route path="/verify" element={<MainLayout></MainLayout>} />

          <Route
            path="/profile/edit"
            element={
              <MainLayout>
                <EditProfilePage />
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <UserProfilePage />
              </MainLayout>
            }
          />

          <Route
            path="/profile/:id"
            element={
              <MainLayout>
                <UserProfilePage />
              </MainLayout>
            }
          />

          {/* Admin Routing */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
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
          <Route path="/owner" element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerLayout />
            </ProtectedRoute>
          }>
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
          
          {/* Renter Dashboard Routing */}
          <Route path="/renter" element={
            <ProtectedRoute allowedRoles={['renter']}>
              <RenterLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate replace to="appointments" />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="agreements" element={<RenterAgreementsPage />} />
            <Route path="agreements/:id" element={<RenterAgreementDetailPage />} />
            <Route path="reviews" element={<RenterReviewsPage />} />
            <Route path="profile" element={<RenterProfilePage />} />
            <Route path="schedule-visit/:id" element={<ScheduleVisitPage />} />
          </Route>

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
        <Toaster />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
