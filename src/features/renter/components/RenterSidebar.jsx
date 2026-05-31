import { NavLink } from 'react-router';
import {
  Calendar,
  FileText,
  Star,
  Settings,
  LogOut,
  User,
  ChevronRight,
  Sparkles,
  Bell,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useNotifications, getUnreadCount } from '@/features/notifications/hooks/useNotifications';
import { useTranslation } from 'react-i18next';

export default function RenterSidebar({ isOpen, onClose }) {
  const { t } = useTranslation();
  const { user } = useAuth();
  const logoutMutation = useLogout();
  const { data: notifications = [] } = useNotifications();
  const unreadCount = getUnreadCount(notifications);

  const menuItems = [
    {
      title: t('sidebar.recommendations', 'For You'),
      icon: Sparkles,
      path: '/renter/recommendations',
      description: t('sidebar.tailoredPropertySuggestions', 'Tailored Property Suggestions'),
    },
    {
      title: t('sidebar.myAppointments'),
      icon: Calendar,
      path: '/renter/appointments',
      description: t('sidebar.managePropertyVisits'),
    },
    {
      title: t('sidebar.myAgreements'),
      icon: FileText,
      path: '/renter/agreements',
      description: t('sidebar.offersDepositsPayments'),
    },
    {
      title: t('sidebar.myReviews'),
      icon: Star,
      path: '/renter/reviews',
      description: t('sidebar.yourFeedbackHistory'),
    },
    {
      title: t('sidebar.notifications'),
      icon: Bell,
      path: '/renter/notifications',
      description: t('sidebar.systemAlertsUpdates'),
    },
    {
      title: t('sidebar.profileAndSettings'),
      icon: Settings,
      path: '/renter/profile',
      description: t('sidebar.personalizeAccount'),
    },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const userName =
    user?.first_name || user?.last_name
      ? `${user.first_name || ''} ${user.last_name || ''}`.trim()
      : user?.fullName || user?.name || t('auth.renter');

  const notificationsLabel = t('sidebar.notifications');

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed top-[73px] bottom-0 left-0 z-40 flex w-72 flex-col overflow-y-auto border-r border-border bg-card transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="p-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-foreground">
              <User className="size-6" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t('sidebar.renterDashboard')}</h3>
              <p className="text-xs font-medium tracking-tighter text-muted-foreground">{userName}</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center justify-between rounded-xl p-3 transition-all duration-200',
                    isActive
                      ? 'bg-foreground text-background shadow-sm dark:bg-primary dark:text-primary-foreground'
                      : 'font-medium text-muted-foreground hover:bg-muted hover:text-foreground',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <item.icon className="size-5 transition-transform group-hover:scale-110" />
                      <span className="text-sm">{item.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {item.title === notificationsLabel && unreadCount > 0 && (
                        <span
                          className={cn(
                            'flex h-5 items-center justify-center rounded-full px-2 text-[10px] font-bold',
                            isActive
                              ? 'bg-background text-foreground dark:bg-primary-foreground dark:text-primary'
                              : 'bg-foreground text-background dark:bg-primary dark:text-primary-foreground',
                          )}
                        >
                          {unreadCount}
                        </span>
                      )}
                      <ChevronRight className="size-4 opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto border-t border-border bg-muted/30 p-6">
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-xl p-3 font-medium text-muted-foreground transition-all hover:bg-destructive/10 hover:text-destructive"
            onClick={handleLogout}
            disabled={logoutMutation.isPending}
          >
            <LogOut className="size-5" />
            <span className="text-sm">{logoutMutation.isPending ? t('loggingOut') : t('logout')}</span>
          </button>
        </div>
      </aside>
    </>
  );
}
