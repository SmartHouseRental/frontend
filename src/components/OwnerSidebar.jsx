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
  LogOut,
  Home,
} from 'lucide-react';
import { NavLink } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useLogout } from '@/features/auth/hooks/useLogout';

function OwnerSidebar() {
  const { t } = useTranslation();
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { to: 'overview', label: t('dashboard'), Icon: LayoutDashboard, end: true },
    { to: 'properties', label: t('sidebar.myProperties'), Icon: Building2 },
    { to: 'appointments', label: t('sidebar.appointments'), Icon: CalendarDays },
    { to: 'agreements', label: t('sidebar.agreements'), Icon: Handshake },
    { to: 'messages', label: t('messages'), Icon: MessageCircle },
    { to: 'reviews', label: t('sidebar.reviews'), Icon: Star },
    { to: 'notifications', label: t('sidebar.notifications'), Icon: Bell },
    { to: 'reports', label: t('sidebar.reportsAgainstMe'), Icon: AlertTriangle },
    { to: 'analytics', label: t('sidebar.analytics'), Icon: BarChart3 },
    { to: 'payments', label: t('sidebar.payments'), Icon: Wallet },
    { to: 'profile', label: t('sidebar.profileAndSettings'), Icon: User },
    { to: 'help', label: t('sidebar.helpAndSupport'), Icon: HelpCircle },
  ];

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary/12 text-primary border-r-primary border-r-4 shadow-sm'
        : 'text-muted-foreground hover:bg-primary/6 hover:text-primary'
    }`;

  return (
    <aside className="bg-card border-r border-border fixed inset-y-0 left-0 z-50 flex w-72 flex-col">
      <div className="border-b border-border flex items-center gap-3 px-5 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
          <Home size={22} className="text-primary" />
        </div>
        <div>
          <h1 className="text-lg leading-tight font-extrabold text-foreground">Smart House Rental</h1>
          <p className="text-primary text-[10px] tracking-widest uppercase font-semibold">
            {t('sidebar.ownerPortal')}
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4 scrollbar-hide">
        {navItems.map(({ to, label, Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={getNavLinkClass}>
            <Icon size={18} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-muted/50">
          <div
            className="size-10 rounded-full bg-primary/15 bg-cover bg-center ring-2 ring-primary/20"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBWKDkeduEeZuHzT6W3ZOMblu3MgjqO8N6jZPH2fz0GKV7r2zzuDztbdpuj0A1Zt1OKticOnFwMa-LFAE5kSlJ1Rp8J619Y-c6ShG2WgXku0Kxhu5Osw9U0OhDciIrDnR3a9L3uYi9jBCORyrv9zhp-7umn6YZ8tMxe3ob62BkUeCkSYlpnAoVidLcqHVcievINEgNMl24C2op3jaZTXFlw0xk8rlIR9wpEsJuTQAYaNCvcY_GUtcYSIG3buan-rs1VL7JVTSanWSCX')",
            }}
            aria-label="Owner profile picture"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground">Dawit Mekonnen</p>
            <p className="truncate text-xs text-muted-foreground">{t('user.propertyOwner')}</p>
          </div>
          <button
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
            className="text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
            aria-label={t('logout')}
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default OwnerSidebar;
