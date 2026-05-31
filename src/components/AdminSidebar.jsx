import {
  Users,
  Handshake,
  TriangleAlert,
  Settings,
  TableProperties,
  LayoutDashboard,
  Shield,
  ClipboardCheck,
  Bell,
  ScrollText,
  BarChart3,
  Star,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AppSidebar } from '@/components/design-system/AppSidebar';

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
    user?.first_name || user?.last_name
      ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
      : user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.fullName || user?.name || user?.email || t('header.systemManager');

  const avatar =
    user?.profilePicture || user?.avatar || user?.profile_picture || undefined;

  return (
    <AppSidebar
      brand="Bet-Connect"
      brandIcon={Shield}
      tagline={t('sidebar.adminControl')}
      navSections={navSections}
      basePath="/admin"
      userName={displayName}
      userRole={t('header.systemManager')}
      userAvatar={avatar}
    />
  );
}

export default AdminSidebar;
