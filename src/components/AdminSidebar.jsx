import {
  Users,
  Handshake,
  TriangleAlert,
  Settings,
  TableProperties,
  LayoutDashboard,
  Building2,
  ClipboardCheck,
  Bell,
  ScrollText,
  BarChart3,
  Star,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AppSidebar } from '@/components/design-system/AppSidebar';

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX';

function AdminSidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const navSections = [
    {
      label: t('sidebar.main'),
      items: [
        { to: 'overview', label: t('dashboard'), Icon: LayoutDashboard, end: true },
        { to: 'users', label: t('sidebar.userManagement'), Icon: Users },
        { to: 'properties', label: t('sidebar.properties'), Icon: TableProperties },
        { to: 'agreements', label: t('sidebar.agreements'), Icon: Handshake },
        { to: 'reports', label: t('sidebar.reports'), Icon: TriangleAlert },
        { to: 'reviews', label: t('sidebar.reviews'), Icon: Star },
      ],
    },
    {
      label: t('sidebar.adminSection'),
      items: [
        { to: 'pending-verifications', label: t('sidebar.pendingVerifications'), Icon: ClipboardCheck },
        { to: 'notifications', label: t('sidebar.notifications'), Icon: Bell },
        { to: 'analytics', label: t('sidebar.analytics'), Icon: BarChart3 },
        { to: 'audit-logs', label: t('sidebar.auditLogs'), Icon: ScrollText },
        { to: 'settings', label: t('sidebar.settings'), Icon: Settings },
      ],
    },
  ];

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.email || 'Administrator';

  return (
    <AppSidebar
      brand="SmartRent"
      tagline={t('sidebar.adminControl')}
      navSections={navSections}
      basePath="/admin"
      userName={displayName}
      userRole="Super Admin"
      userAvatar={user?.profilePicture || user?.avatar || DEFAULT_AVATAR}
    />
  );
}

export default AdminSidebar;
