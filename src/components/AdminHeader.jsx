import { Link, useLocation, useNavigate } from 'react-router';
import {
  Bell,
  MessageCircle,
  User,
  Settings,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Menu,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from './ThemeProvider';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features/auth/hooks/useAuth';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { cn } from '@/lib/utils';

function AdminHeader({ onMobileMenuOpen }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    navigate('/login');
  };

  const displayName =
    user?.first_name || user?.last_name
      ? `${user?.first_name || ''} ${user?.last_name || ''}`.trim()
      : user?.firstName && user?.lastName
        ? `${user.firstName} ${user.lastName}`
        : user?.fullName || user?.name || user?.email || t('header.systemManager');

  const avatar =
    user?.profilePicture || user?.avatar || user?.profile_picture || undefined;

  const segments = location.pathname.split('/').filter(Boolean);
  const adminIndex = segments.indexOf('admin');
  const subSegments = adminIndex !== -1 ? segments.slice(adminIndex + 1) : [];

  const breadcrumbMap = {
    overview: t('header.overview'),
    users: t('sidebar.userManagement'),
    properties: t('sidebar.properties'),
    agreements: t('sidebar.agreements'),
    reports: t('sidebar.reports'),
    'pending-verifications': t('sidebar.pendingVerifications'),
    notifications: t('sidebar.notifications'),
    'audit-logs': t('sidebar.auditLogs'),
    analytics: t('sidebar.analytics'),
    settings: t('sidebar.settings'),
    reviews: t('sidebar.reviews'),
    detail: t('header.detail'),
    edit: t('header.edit'),
  };

  const breadcrumbs = [
    {
      label: t('dashboard'),
      to: '',
    },
  ];

  let cumulativePath = '/admin';

  subSegments.forEach((segment) => {
    cumulativePath += `/${segment}`;

    const rawLabel = breadcrumbMap[segment];
    const label = rawLabel || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

    breadcrumbs.push({
      label,
      to: cumulativePath,
    });
  });

  const iconButtonClass =
    'relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground';

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur-md lg:px-8">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <button
          type="button"
          onClick={onMobileMenuOpen}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>
        <nav className="flex min-w-0 items-center truncate text-sm font-medium">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-3">
              {index > 0 && <span className="mx-3 text-muted-foreground">{'>'}</span>}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-muted-foreground">{crumb.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <LanguageSwitcher />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className={iconButtonClass}>
              <Bell size={20} />
              <span className="absolute top-2 right-2 size-2 rounded-full border-2 border-card bg-destructive" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>{t('sidebar.notifications')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex w-full justify-between">
                  <span className="font-bold">{t('header.newPropertySubmission')}</span>
                  <span className="text-[10px] text-muted-foreground">2m ago</span>
                </div>
                <p className="text-xs text-muted-foreground">{t('header.awaitingReview')}</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                <div className="flex w-full justify-between">
                  <span className="font-bold">{t('header.urgentReport')}</span>
                  <span className="text-[10px] text-muted-foreground">1h ago</span>
                </div>
                <p className="text-xs text-muted-foreground">{t('header.fraudReportFiled')}</p>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-center font-bold text-foreground">
              {t('header.viewAllNotifications')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


        <button
          type="button"
          onClick={toggleTheme}
          className={iconButtonClass}
          aria-label={t('header.toggleTheme')}
          title={theme === 'dark' ? t('header.switchToLightMode') : t('header.switchToDarkMode')}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div className="mx-1 hidden h-8 w-px bg-border sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-3 rounded-lg p-1 pr-2 transition-colors hover:bg-muted"
            >
              <div
                className={cn(
                  'flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-border bg-muted',
                  avatar && 'bg-cover bg-center',
                )}
                style={avatar ? { backgroundImage: `url('${avatar}')` } : undefined}
                aria-label={t('header.profile')}
              >
                {!avatar && <User size={18} className="text-muted-foreground" />}
              </div>
              <div className="hidden text-right md:block">
                <p className="text-sm leading-none font-bold text-foreground">{displayName}</p>
                <p className="text-xs font-medium text-muted-foreground">{t('header.systemManager')}</p>
              </div>
              <ChevronDown size={16} className="text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{t('header.myAccount')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/admin/profile')}>
              <User size={16} className="mr-2" />
              <span>{t('header.profile')}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/admin/settings')}>
              <Settings size={16} className="mr-2" />
              <span>{t('sidebar.settings')}</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
              <LogOut size={16} className="mr-2" />
              <span>{t('logout')}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default AdminHeader;
