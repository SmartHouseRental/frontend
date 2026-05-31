import { useState } from 'react';
import { NavLink } from 'react-router';
import { LogOut, ChevronLeft, ChevronRight, Menu, X, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { Button } from '@/components/ui/button';

/**
 * Enterprise sidebar navigation — config-driven, collapsible, mobile-responsive.
 */
export function AppSidebar({
  brand = 'SmartRent',
  tagline,
  navSections = [],
  userName,
  userRole,
  userAvatar,
  basePath = '',
}) {
  const logoutMutation = useLogout();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const getNavLinkClass = ({ isActive }) =>
    cn(
      'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
      isActive
        ? 'bg-sidebar-primary/15 text-sidebar-primary shadow-sm'
        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
      collapsed && 'justify-center px-2',
    );

  const sidebarContent = (
    <>
      {/* Brand */}
      <div
        className={cn(
          'flex items-center gap-3 border-b border-sidebar-border px-4 py-4',
          collapsed && 'justify-center px-2',
        )}
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
          <Building2 size={18} className="text-sidebar-primary-foreground" strokeWidth={2.5} />
        </div>
        {!collapsed && (
          <div className="min-w-0 flex-1">
            <h1 className="text-sidebar-foreground truncate text-base font-bold tracking-tight">
              {brand}
            </h1>
            {tagline && (
              <p className="text-sidebar-foreground/50 truncate text-[10px] font-medium tracking-widest uppercase">
                {tagline}
              </p>
            )}
          </div>
        )}
        {!collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(true)}
            className="text-sidebar-foreground/50 hover:text-sidebar-foreground hidden rounded-md p-1 transition-colors lg:block"
            aria-label="Collapse sidebar"
          >
            <ChevronLeft size={16} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navSections.map((section, si) => (
          <div key={section.label ?? si}>
            {section.label && !collapsed && (
              <p className="text-sidebar-foreground/40 mb-2 px-3 text-[10px] font-semibold tracking-widest uppercase">
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
                        <span className="rounded-full bg-sidebar-primary px-1.5 py-0.5 text-[10px] font-bold text-sidebar-primary-foreground">
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

      {/* User footer */}
      <div className="border-t border-sidebar-border p-3">
        <div
          className={cn(
            'flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-sidebar-accent',
            collapsed && 'justify-center',
          )}
        >
          <div
            className="size-9 shrink-0 rounded-full bg-sidebar-accent bg-cover bg-center ring-2 ring-sidebar-border"
            style={userAvatar ? { backgroundImage: `url('${userAvatar}')` } : undefined}
            aria-hidden
          />
          {!collapsed && (
            <>
              <div className="min-w-0 flex-1">
                <p className="text-sidebar-foreground truncate text-sm font-semibold">{userName}</p>
                <p className="text-sidebar-foreground/50 truncate text-xs">{userRole}</p>
              </div>
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="text-sidebar-foreground/50 hover:text-red-400 rounded-md p-1.5 transition-colors disabled:opacity-50"
                aria-label="Sign out"
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
            className="text-sidebar-foreground/50 hover:text-sidebar-foreground mt-2 flex w-full items-center justify-center rounded-md p-1.5 transition-colors"
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
      {/* Mobile toggle */}
      <Button
        variant="outline"
        size="icon-sm"
        className="fixed top-3.5 left-3 z-50 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
      >
        <Menu size={18} />
      </Button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sidebar-border transition-all duration-300',
          collapsed ? 'w-[68px]' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        )}
      >
        <button
          type="button"
          className="text-sidebar-foreground/70 hover:text-sidebar-foreground absolute top-4 right-3 rounded-md p-1 lg:hidden"
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
