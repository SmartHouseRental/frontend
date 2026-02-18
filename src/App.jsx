import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import AdminLayout from './components/AdminLayout';
import OverviewPage from './pages/admin/OverviewPage';
import UserManagmentPage from './pages/admin/UserManagmentPage';
import PropertiesPage from './pages/admin/PropertiesPage';
import ReportsPage from './pages/admin/ReportsPage';
import AgreementsPage from './pages/admin/AgreementsPage';
import UserDetailPage from './pages/admin/UserDetailPage';
import PropertiesDetailPage from './pages/admin/PropertiesDetailPage';
import ReportDetailPage from './pages/admin/ReportDetailPage';
import AgreementDetailPage from './pages/admin/AgreementDetailPage';

function App() {
  return (
    <BrowserRouter basename="/frontend">
      <Routes>
        {/*  Public rounting

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />   
        */}

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate replace to="overview" />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="users" element={<UserManagmentPage />} />
          <Route path="properties" element={<PropertiesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="agreements" element={<AgreementsPage />} />
          <Route path="userdetails" element={<UserDetailPage />} />
          <Route path="reportdetail" element={<ReportDetailPage />} />
          <Route path="propertiesdetail" element={<PropertiesDetailPage />} />
          <Route path="agreementdetail" element={<AgreementDetailPage />} />
        </Route>

        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
