import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { ThemeProvider } from './components/ThemeProvider';
import PageLoader from './components/PageLoader';
import { AdminLayout, MainLayout, OwnerLayout } from './routes/lazyLayouts';
import {
  SignUpPage,
  LoginPage,
  OTPVerificationPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  RenterPreferencesWizard,
  WelcomePage,
  LandingPage,
  ExplorePage,
  SearchResultsPage,
  PropertyDetailRenterPage,
  SavedPropertiesPage,
  AboutPage,
  ContactPage,
  RenterChatPage,
  EditProfilePage,
  UserProfilePage,
  AdminOverviewPage,
  UserManagementPage,
  UserDetailPage,
  AdminPropertiesPage,
  PropertiesDetailPage,
  AdminReportsPage,
  ReportDetailPage,
  AdminAgreementsPage,
  AdminAgreementDetailPage,
  PendingVerificationsPage,
  NotificationsAdminPage,
  AuditLogsPage,
  AnalyticsAdminPage,
  SettingsPage,
  ReviewsAdminPage,
  OwnerOverviewPage,
  MyPropertiesPage,
  OwnerPropertyDetailPage,
  AddPropertyPage,
  EditPropertyPage,
  OwnerAppointmentsPage,
  OwnerAgreementsPage,
  OwnerCreateAgreementPage,
  OwnerEditAgreementPage,
  OwnerAgreementDetailPage,
  MessagesPage,
  ReviewsPage,
  NotificationsPage,
  OwnerReportsPage,
  AnalyticsPage,
  OwnerProfilePage,
  PaymentHistoryPage,
  HelpSupportPage,
} from './routes/lazyPages';

function LazyRoute({ children }) {
  return <Suspense fallback={<PageLoader />}>{children}</Suspense>;
}
import ProtectedRoute from './components/ProtectedRoute';
import RenterLayout from './components/RenterLayout';
import AppointmentsPage from './pages/renter/AppointmentsPage';
import RenterAgreementsPage from './pages/renter/AgreementsPage';
import RenterAgreementDetailPage from './pages/renter/AgreementDetailPage';
import AgreementPaymentReturnPage from './pages/renter/AgreementPaymentReturnPage';
import RenterReviewsPage from './pages/renter/ReviewsPage';
import RenterProfilePage from './pages/renter/ProfilePage';
import ScheduleVisitPage from './pages/renter/ScheduleVisitPage';
import RenterNotificationsPage from './pages/renter/NotificationsPage';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route
            path="/signup"
            element={
              <LazyRoute>
                <SignUpPage />
              </LazyRoute>
            }
          />
          <Route
            path="/login"
            element={
              <LazyRoute>
                <LoginPage />
              </LazyRoute>
            }
          />
          <Route
            path="/verify-otp"
            element={
              <LazyRoute>
                <OTPVerificationPage />
              </LazyRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <ProtectedRoute allowedRoles={['renter']}>
                <MainLayout>
                  <SavedPropertiesPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reset-password"
            element={
              <LazyRoute>
                <ResetPasswordPage />
              </LazyRoute>
            }
          />
          <Route
            path="/preferences"
            element={
              <LazyRoute>
                <RenterPreferencesWizard />
              </LazyRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute allowedRoles={['renter']}>
                <MainLayout>
                  <RenterChatPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            element={
              <LazyRoute>
                <MainLayout />
              </LazyRoute>
            }
          >
            <Route
              index
              element={
                <LazyRoute>
                  <LandingPage />
                </LazyRoute>
              }
            />
            <Route
              path="explore"
              element={
                <LazyRoute>
                  <ExplorePage />
                </LazyRoute>
              }
            />
            <Route
              path="search"
              element={
                <LazyRoute>
                  <SearchResultsPage />
                </LazyRoute>
              }
            />
            <Route
              path="saved"
              element={
                <LazyRoute>
                  <SavedPropertiesPage />
                </LazyRoute>
              }
            />
            <Route
              path="about"
              element={
                <LazyRoute>
                  <AboutPage />
                </LazyRoute>
              }
            />
            <Route
              path="contact"
              element={
                <LazyRoute>
                  <ContactPage />
                </LazyRoute>
              }
            />
            <Route
              path="chat"
              element={
                <LazyRoute>
                  <RenterChatPage />
                </LazyRoute>
              }
            />
            <Route
              path="property/:id"
              element={
                <LazyRoute>
                  <PropertyDetailRenterPage />
                </LazyRoute>
              }
            />
            <Route
              path="profile/edit"
              element={
                <LazyRoute>
                  <EditProfilePage />
                </LazyRoute>
              }
            />
            <Route
              path="profile"
              element={
                <LazyRoute>
                  <UserProfilePage />
                </LazyRoute>
              }
            />
            <Route
              path="profile/:id"
              element={
                <LazyRoute>
                  <UserProfilePage />
                </LazyRoute>
              }
            />
          </Route>

          {/* <Route
            path="/admin"
            element={
              <LazyRoute>
                <AdminLayout />
              </LazyRoute>
            }
          /> */}

          {/* Admin Routing */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Navigate replace to="overview" />} />
            <Route
              path="overview"
              element={
                <LazyRoute>
                  <AdminOverviewPage />
                </LazyRoute>
              }
            />
            <Route
              path="users"
              element={
                <LazyRoute>
                  <UserManagementPage />
                </LazyRoute>
              }
            />
            <Route
              path="users/:id"
              element={
                <LazyRoute>
                  <UserDetailPage />
                </LazyRoute>
              }
            />
            <Route
              path="properties"
              element={
                <LazyRoute>
                  <AdminPropertiesPage />
                </LazyRoute>
              }
            />
            <Route
              path="properties/:id"
              element={
                <LazyRoute>
                  <PropertiesDetailPage />
                </LazyRoute>
              }
            />
            <Route
              path="reports"
              element={
                <LazyRoute>
                  <AdminReportsPage />
                </LazyRoute>
              }
            />
            <Route
              path="reports/:id"
              element={
                <LazyRoute>
                  <ReportDetailPage />
                </LazyRoute>
              }
            />
            <Route
              path="agreements"
              element={
                <LazyRoute>
                  <AdminAgreementsPage />
                </LazyRoute>
              }
            />
            <Route
              path="agreements/:id"
              element={
                <LazyRoute>
                  <AdminAgreementDetailPage />
                </LazyRoute>
              }
            />
            <Route
              path="pending-verifications"
              element={
                <LazyRoute>
                  <PendingVerificationsPage />
                </LazyRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <LazyRoute>
                  <NotificationsAdminPage />
                </LazyRoute>
              }
            />
            <Route
              path="audit-logs"
              element={
                <LazyRoute>
                  <AuditLogsPage />
                </LazyRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <LazyRoute>
                  <AnalyticsAdminPage />
                </LazyRoute>
              }
            />
            <Route
              path="settings"
              element={
                <LazyRoute>
                  <SettingsPage />
                </LazyRoute>
              }
            />
            <Route
              path="reviews"
              element={
                <LazyRoute>
                  <ReviewsAdminPage />
                </LazyRoute>
              }
            />
          </Route>

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
            <Route
              path="overview"
              element={
                <LazyRoute>
                  <OwnerOverviewPage />
                </LazyRoute>
              }
            />
            <Route
              path="properties"
              element={
                <LazyRoute>
                  <MyPropertiesPage />
                </LazyRoute>
              }
            />
            <Route
              path="properties/:id"
              element={
                <LazyRoute>
                  <OwnerPropertyDetailPage />
                </LazyRoute>
              }
            />
            <Route
              path="add-property"
              element={
                <LazyRoute>
                  <AddPropertyPage />
                </LazyRoute>
              }
            />
            <Route
              path="properties/edit/:id"
              element={
                <LazyRoute>
                  <EditPropertyPage />
                </LazyRoute>
              }
            />
            <Route
              path="appointments"
              element={
                <LazyRoute>
                  <OwnerAppointmentsPage />
                </LazyRoute>
              }
            />
            <Route
              path="agreements/create"
              element={
                <LazyRoute>
                  <OwnerCreateAgreementPage />
                </LazyRoute>
              }
            />
            <Route
              path="agreements/:id/edit"
              element={
                <LazyRoute>
                  <OwnerEditAgreementPage />
                </LazyRoute>
              }
            />
            <Route
              path="agreements/:id"
              element={
                <LazyRoute>
                  <OwnerAgreementDetailPage />
                </LazyRoute>
              }
            />
            <Route
              path="agreements"
              element={
                <LazyRoute>
                  <OwnerAgreementsPage />
                </LazyRoute>
              }
            />
            <Route
              path="agreement-detail"
              element={<Navigate replace to="/owner/agreements" />}
            />
            <Route
              path="messages"
              element={
                <LazyRoute>
                  <MessagesPage />
                </LazyRoute>
              }
            />
            <Route
              path="reviews"
              element={
                <LazyRoute>
                  <ReviewsPage />
                </LazyRoute>
              }
            />
            <Route
              path="notifications"
              element={
                <LazyRoute>
                  <NotificationsPage />
                </LazyRoute>
              }
            />
            <Route
              path="reports"
              element={
                <LazyRoute>
                  <OwnerReportsPage />
                </LazyRoute>
              }
            />
            <Route
              path="analytics"
              element={
                <LazyRoute>
                  <AnalyticsPage />
                </LazyRoute>
              }
            />
            <Route
              path="profile"
              element={
                <LazyRoute>
                  <OwnerProfilePage />
                </LazyRoute>
              }
            />
            <Route
              path="payments"
              element={
                <LazyRoute>
                  <PaymentHistoryPage />
                </LazyRoute>
              }
            />
            <Route
              path="help"
              element={
                <LazyRoute>
                  <HelpSupportPage />
                </LazyRoute>
              }
            />
          </Route>
          
          {/* Chapa return URL — must match backend FRONTEND_URL redirect */}
          <Route
            path="/agreements/payment/return"
            element={
              <ProtectedRoute allowedRoles={['renter']}>
                <AgreementPaymentReturnPage />
              </ProtectedRoute>
            }
          />

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
            <Route path="notifications" element={<RenterNotificationsPage />} />
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
