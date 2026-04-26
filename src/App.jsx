import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import OverviewPage from './pages/admin/OverviewPage';
import UserManagmentPage from './pages/admin/UserManagmentPage';
import PropertiesPage from './pages/admin/PropertiesPage';
import ReportsPage from './pages/admin/ReportsPage';
import AgreementsPage from './pages/admin/AgreementsPage';
import USerDetailPage from './pages/admin/UserDetailPage';

import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage"
import MainLayout from "./components/MainLayout";
import  VerificationPage  from "./pages/owner/VerificationPage";
import OwnerLayout from "./components/OwnerLayout";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ChatPage from "./pages/owner/ChatPage";
import AddPropertyPage from './pages/owner/AddPropertyPage';

import PropertyDetails from "./pages/PropertyDetails";
import SavedPropertiesPage from "./pages/SavedPropertiesPage";
import RenterChatPage from "./pages/RenterChatPage";
import { FavoritesProvider } from "./features/favorites/FavoritesContext";
import { ChatProvider } from "./features/chat/ChatContext";
import { VisitProvider } from "./features/visits/VisitContext";
import { AuthProvider } from "./features/users/AuthContext";
import ScheduleVisitModal from "./features/visits/components/ScheduleVisitModal";
import LoginModal from "./features/users/components/LoginModal";
import ProtectedRoute from "./features/users/components/ProtectedRoute";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import ProfilePage from "./pages/ProfilePage";
import EditProfilePage from "./pages/EditProfilePage";

function App() {
  return (
    <AuthProvider>
    <FavoritesProvider>
    <ChatProvider>
    <VisitProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* ... existing routes ... */}
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
                <ProtectedRoute>
                  <SavedPropertiesPage />
                </ProtectedRoute>
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
                <ProtectedRoute>
                  <RenterChatPage />
                </ProtectedRoute>
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
              <ProtectedRoute>
                <VerificationPage />
              </ProtectedRoute>
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

        {/* Owner */}
          <Route path="/owner" element={<OwnerLayout />}>
            <Route index element={<OwnerDashboard />} />
            <Route path="properties" element={<PropertiesPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="properties/new" element={<AddPropertyPage />} />
          </Route>

          {/* Admin */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate replace to="overview" />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="users" element={<UserManagmentPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="agreements" element={<AgreementsPage />} />
          <Route path="userdetails" element={<USerDetailPage />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>

      {/* Global Modals */}
      <ScheduleVisitModal />
      <LoginModal />
    </BrowserRouter>
    </VisitProvider>
    </ChatProvider>
    </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;

