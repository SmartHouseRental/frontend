import {
  Users,
  Handshake,
  LogOut,
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
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@/features/auth/hooks/useLogout';

function AdminSidebar() {
  const { t } = useTranslation();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const mainNavItems = [
    {
      to: 'overview',
      label: t('dashboard'),
      Icon: LayoutDashboard,
      end: true,
    },
    {
      to: 'users',
      label: t('sidebar.userManagement'),
      Icon: Users,
    },
    {
      to: 'properties',
      label: t('sidebar.properties'),
      Icon: TableProperties,
    },
    {
      to: 'agreements',
      label: t('sidebar.agreements'),
      Icon: Handshake,
    },
    {
      to: 'reports',
      label: t('sidebar.reports'),
      Icon: TriangleAlert,
    },
    {
      to: 'reviews',
      label: t('sidebar.reviews'),
      Icon: Star,
    },
  ];

  const adminNavItems = [
    {
      to: 'pending-verifications',
      label: t('sidebar.pendingVerifications'),
      Icon: ClipboardCheck,
    },
    {
      to: 'notifications',
      label: t('sidebar.notifications'),
      Icon: Bell,
    },
    {
      to: 'analytics',
      label: t('sidebar.analytics'),
      Icon: BarChart3,
    },
    {
      to: 'audit-logs',
      label: t('sidebar.auditLogs'),
      Icon: ScrollText,
    },
    {
      to: 'settings',
      label: t('sidebar.settings'),
      Icon: Settings,
    },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors ${isActive
      ? 'bg-sidebar-primary/15  text-sidebar-primary border-r-sidebar-primary border-r-4'
      : ' hover:bg-sidebar-primary/10 hover:text-sidebar-primary'
    }`;

  return (
    <aside className="bg-sidebar text-primary fixed inset-y-0 left-0 z-50 flex w-72 flex-col">
      <div className="border-b-border flex items-center gap-3 border-b px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20">
          <Building2 size={24} />
        </div>
        <div>
          <h1 className="text-2xl leading-tight font-extrabold">Smart House</h1>
          <p className="text-sidebar-primary text-[10px] tracking-widest uppercase">
            {t('sidebar.adminControl')}
          </p>
        </div>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-4 py-4">
        <p className="text-muted-foreground mb-2 px-3 text-[10px] font-bold tracking-widest uppercase">
          {t('sidebar.main')}
        </p>
        {mainNavItems.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={getNavLinkClass}>
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="my-4 border-t border-white/10" />

        <p className="text-muted-foreground mb-2 px-3 text-[10px] font-bold tracking-widest uppercase">
          {t('sidebar.adminSection')}
        </p>
        {adminNavItems.map(({ to, label, Icon }) => (
          <NavLink key={to} to={to} className={getNavLinkClass}>
            <Icon size={20} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-white/10">
          <div
            className="size-10 rounded-full bg-slate-300 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX')",
            }}
            aria-label="Headshot of system administrator"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold">Alex Rivera</p>
            <p className="truncate text-xs text-white/50">Super Admin</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-white/70 transition-colors hover:text-white"
            aria-label={t('logout')}
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
