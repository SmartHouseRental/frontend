import {
  LayoutDashboard,
  Building2,
  CalendarDays,
  Handshake,
  MessageCircle,
  Star,
  Bell,
  AlertTriangle,
  BarChart3,
  User,
  Wallet,
  HelpCircle,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { AppSidebar } from '@/components/design-system/AppSidebar';

const DEFAULT_AVATAR =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX';

function OwnerSidebar() {
  const { t } = useTranslation();
  const { user } = useAuth();

  const navSections = [
    {
      label: t('sidebar.main', { defaultValue: 'Main' }),
      items: [
        { to: 'overview', label: t('dashboard'), Icon: LayoutDashboard, end: true },
        { to: 'properties', label: t('sidebar.myProperties'), Icon: Building2 },
        { to: 'appointments', label: t('sidebar.appointments'), Icon: CalendarDays },
        { to: 'agreements', label: t('sidebar.agreements'), Icon: Handshake },
        { to: 'messages', label: t('messages'), Icon: MessageCircle },
      ],
    },
    {
      label: t('sidebar.insights', { defaultValue: 'Insights' }),
      items: [
        { to: 'reviews', label: t('sidebar.reviews'), Icon: Star },
        { to: 'analytics', label: t('sidebar.analytics'), Icon: BarChart3 },
        { to: 'payments', label: t('sidebar.payments'), Icon: Wallet },
      ],
    },
    {
      label: t('sidebar.account', { defaultValue: 'Account' }),
      items: [
        { to: 'notifications', label: t('sidebar.notifications'), Icon: Bell },
        { to: 'reports', label: t('sidebar.reportsAgainstMe'), Icon: AlertTriangle },
        { to: 'profile', label: t('sidebar.profileAndSettings'), Icon: User },
        { to: 'help', label: t('sidebar.helpAndSupport'), Icon: HelpCircle },
      ],
    },
  ];

  const displayName =
    user?.firstName && user?.lastName
      ? `${user.firstName} ${user.lastName}`
      : user?.firstName || user?.email || 'Property Owner';

  return (
    <AppSidebar
      brand="SmartRent"
      tagline={t('sidebar.ownerPortal')}
      navSections={navSections}
      basePath="/owner"
      userName={displayName}
      userRole={t('user.propertyOwner')}
      userAvatar={user?.profilePicture || user?.avatar || DEFAULT_AVATAR}
    />
  );
}

export default OwnerSidebar;
