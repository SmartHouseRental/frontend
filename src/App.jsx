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

import OwnerLayout from "./components/OwnerLayout";
import OwnerDashboard from "./pages/owner/OwnerDashboard";

import PropertyDetails from "./pages/PropertyDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/*  Public rounting
        <Route path="/login" element={<Login />} />   
        */}
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
            path="/property"
            element={
              <MainLayout>
                <PropertyDetails />
              </MainLayout>
            }
          />

        {/* Owner */}
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<OwnerDashboard />} />
          {/* <Route path="properties" element={<OwnerPropertiesPage />} /> */}
        </Route>

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
    </BrowserRouter>
  );
}

export default App;
