import { lazy } from 'react';

/** Auth */
export const SignUpPage = lazy(() => import('@/pages/auth/SignUpPage'));
export const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
export const OTPVerificationPage = lazy(() => import('@/pages/auth/OTPVerificationPage'));
export const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'));
export const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'));
export const RenterPreferencesWizard = lazy(() => import('@/pages/auth/RenterPreferencesWizard'));
export const WelcomePage = lazy(() => import('@/pages/auth/WelcomePage'));

/** Public / renter */
export const LandingPage = lazy(() => import('@/pages/home/LandingPage'));
export const ExplorePage = lazy(() => import('@/pages/home/ExplorePage'));
export const SearchResultsPage = lazy(() => import('@/pages/home/SearchResultsPage'));
export const PropertyDetailRenterPage = lazy(() => import('@/pages/home/PropertyDetailPage'));
export const SavedPropertiesPage = lazy(() => import('@/pages/SavedPropertiesPage'));
export const AboutPage = lazy(() => import('@/pages/AboutPage'));
export const ContactPage = lazy(() => import('@/pages/ContactPage'));
export const RenterChatPage = lazy(() => import('@/pages/RenterChatPage'));
export const EditProfilePage = lazy(() => import('@/pages/EditProfilePage'));
export const UserProfilePage = lazy(() => import('@/pages/ProfilePage'));

/** Admin */
export const AdminOverviewPage = lazy(() => import('@/pages/admin/OverviewPage'));
export const UserManagementPage = lazy(() => import('@/pages/admin/UserManagementPage'));
export const UserDetailPage = lazy(() => import('@/pages/admin/UserDetailPage'));
export const AdminPropertiesPage = lazy(() => import('@/pages/admin/PropertiesPage'));
export const PropertiesDetailPage = lazy(() => import('@/pages/admin/PropertiesDetailPage'));
export const AdminReportsPage = lazy(() => import('@/pages/admin/ReportsPage'));
export const ReportDetailPage = lazy(() => import('@/pages/admin/ReportDetailPage'));
export const AdminAgreementsPage = lazy(() => import('@/pages/admin/AgreementsPage'));
export const AdminAgreementDetailPage = lazy(() => import('@/pages/admin/AgreementDetailPage'));
export const PendingVerificationsPage = lazy(() => import('@/pages/admin/PendingVerificationsPage'));
export const NotificationsAdminPage = lazy(() => import('@/pages/admin/NotificationsPage'));
export const AuditLogsPage = lazy(() => import('@/pages/admin/AuditLogsPage'));
export const AnalyticsAdminPage = lazy(() => import('@/pages/admin/AnalyticsPage'));
export const SettingsPage = lazy(() => import('@/pages/admin/SettingsPage'));
export const ReviewsAdminPage = lazy(() => import('@/pages/admin/ReviewsPage'));

/** Owner */
export const OwnerOverviewPage = lazy(() => import('@/pages/owner/OverviewPage'));
export const MyPropertiesPage = lazy(() => import('@/pages/owner/MyPropertiesPage'));
export const OwnerPropertyDetailPage = lazy(() => import('@/pages/owner/PropertyDetailPage'));
export const AddPropertyPage = lazy(() => import('@/pages/owner/AddPropertyPage'));
export const EditPropertyPage = lazy(() => import('@/pages/owner/EditPropertyPage'));
export const OwnerAppointmentsPage = lazy(() => import('@/pages/owner/AppointmentsPage'));
export const OwnerAgreementsPage = lazy(() => import('@/pages/owner/AgreementsPage'));
export const OwnerCreateAgreementPage = lazy(() => import('@/pages/owner/CreateAgreementPage'));
export const OwnerEditAgreementPage = lazy(() => import('@/pages/owner/EditAgreementPage'));
export const OwnerAgreementDetailPage = lazy(() => import('@/pages/owner/AgreementDetailPage'));
export const MessagesPage = lazy(() => import('@/pages/owner/MessagesPage'));
export const ReviewsPage = lazy(() => import('@/pages/owner/ReviewsPage'));
export const NotificationsPage = lazy(() => import('@/pages/owner/NotificationsPage'));
export const OwnerReportsPage = lazy(() => import('@/pages/owner/ReportsPage'));
export const AnalyticsPage = lazy(() => import('@/pages/owner/AnalyticsPage'));
export const OwnerProfilePage = lazy(() => import('@/pages/owner/ProfilePage'));
export const PaymentHistoryPage = lazy(() => import('@/pages/owner/PaymentHistoryPage'));
export const HelpSupportPage = lazy(() => import('@/pages/owner/HelpSupportPage'));
