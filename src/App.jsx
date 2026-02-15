import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AdminLayout from './components/AdminLayout';
import Overview from './pages/admin/Overview';
import UserManagment from './pages/admin/UserManagment';
import PropertiesPage from './pages/admin/PropertiesPage';
import ReportsPage from './pages/admin/ReportsPages';
import AgreementsPage from './pages/admin/AgreementsPage';
import USerDetailPage from './pages/admin/UserDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> */}

        {/* <Route path="/dashboard" element={<UserLayout />}>
          <Route index element={<UserDashboard />} /> 
          <Route path="profile" element={<UserProfile />} />
          <Route path="rentals" element={<UserRentals />} />
        </Route> */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate replace to="overview" />} />
          <Route path="overview" element={<Overview />} />
          <Route path="users" element={<UserManagment />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="agreements" element={<AgreementsPage />} />
          <Route path="userdetails" element={<USerDetailPage />} />

          {/*<Route path="listings" element={<ListingsPage />} /> 
          <Route path="verifications" element={<VerificationsPage />} />
          <Route path="agreements" element={<AgreementsPage />} />
          <Route path="financials" element={<FinancialsPage />} /> */}
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
