import { useState } from 'react';
import { NavLink } from 'react-router';
import {
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Building2,
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useTranslation } from 'react-i18next';

/**
 * Enterprise sidebar navigation — config-driven, collapsible, mobile-responsive.
 */
export function AppSidebar({
  brand = 'SmartRent',
  tagline,
  brandIcon: BrandIcon = Building2,
  navSections = [],
  userName,
  userRole,
  userAvatar,
  basePath = '',
  collapsed: controlledCollapsed,
  onCollapsedChange,
  mobileOpen: controlledMobileOpen,
  onMobileOpenChange,
}) {
  const { t } = useTranslation();
  const logoutMutation = useLogout();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [internalMobileOpen, setInternalMobileOpen] = useState(false);

  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;
  const mobileOpen = controlledMobileOpen ?? internalMobileOpen;
  const setMobileOpen = onMobileOpenChange ?? setInternalMobileOpen;

  const getNavLinkClass = ({ isActive }) =>
    cn(
      'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-sidebar-accent font-semibold text-sidebar-foreground shadow-sm'
        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
      collapsed && 'justify-center px-2',
    );

  const sidebarContent = (
    <>
      <div
        className={cn(
          'flex h-16 shrink-0 items-center gap-3 border-b border-sidebar-border px-4',
          collapsed && 'justify-center px-2',
        )}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground">
          <BrandIcon size={18} strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-base font-bold tracking-tight text-sidebar-foreground">
              {brand}
            </h1>
            {tagline && (
              <p className="truncate text-[10px] font-medium tracking-widest text-sidebar-foreground/50 uppercase">
                {tagline}
              </p>
            )}
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="hidden rounded-md p-1 text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground lg:block"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navSections.map((section, si) => (
          <div key={section.label ?? si}>
            {section.label && !collapsed && (
              <p className="mb-2 px-3 text-[10px] font-semibold tracking-widest text-sidebar-foreground/40 uppercase">
                {section.label}
              </p>
            )}
            <div className="space-y-0.5">
              {section.items.map(({ to, label, Icon, end, badge }) => (
                <NavLink
                  key={to}
                  to={to.startsWith('/') ? to : `${basePath}/${to}`}
                  end={end}
                  className={getNavLinkClass}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? label : undefined}
                >
                  <Icon size={18} strokeWidth={2} className="shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 truncate">{label}</span>
                      {badge != null && badge > 0 && (
                        <span className="rounded-full bg-sidebar-foreground px-1.5 py-0.5 text-[10px] font-bold text-sidebar">
                          {badge > 99 ? '99+' : badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-sidebar-border p-3">
        <div
          className={cn(
            'flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-sidebar-accent',
            collapsed && 'justify-center',
          )}
        >
          <div
            className={cn(
              'flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sidebar-accent ring-2 ring-sidebar-border',
              userAvatar && 'bg-cover bg-center',
            )}
            style={userAvatar ? { backgroundImage: `url('${userAvatar}')` } : undefined}
            aria-hidden
          >
            {!userAvatar && <User size={16} className="text-sidebar-foreground/70" />}
          </div>
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-sidebar-foreground">{userName}</p>
                <p className="truncate text-xs text-sidebar-foreground/50">{userRole}</p>
              </div>
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="rounded-md p-1.5 text-sidebar-foreground/50 transition-colors hover:text-destructive disabled:opacity-50"
                aria-label={t('logout')}
              >
                <LogOut size={16} />
              </button>
            </>
          )}
        </div>
        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="mt-2 flex w-full items-center justify-center rounded-md p-1.5 text-sidebar-foreground/50 transition-colors hover:text-sidebar-foreground"
            aria-label="Expand sidebar"
          >
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-all duration-300',
          collapsed ? 'w-[68px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <button
          type="button"
          className="absolute top-4 right-3 rounded-md p-1 text-sidebar-foreground/70 transition-colors hover:text-sidebar-foreground lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close navigation"
        >
          <X size={18} />
        </button>
        {sidebarContent}
      </aside>
    </>
  );
}

export default AppSidebar;
