import { cloneElement, isValidElement, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/**
 * Responsive dashboard layout — sidebar width, header, and main share one grid.
 */
export function DashboardShell({ sidebar, header, children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const applySidebarWidth = () => {
      const isLg = window.matchMedia('(min-width: 1024px)').matches;
      root.style.setProperty(
        '--dashboard-sidebar-width',
        isLg ? (collapsed ? '68px' : '16rem') : '0px',
      );
    };

    applySidebarWidth();
    window.addEventListener('resize', applySidebarWidth);

    return () => {
      window.removeEventListener('resize', applySidebarWidth);
      root.style.removeProperty('--dashboard-sidebar-width');
    };
  }, [collapsed]);

  const sidebarNode = isValidElement(sidebar)
    ? cloneElement(sidebar, {
        collapsed,
        onCollapsedChange: setCollapsed,
        mobileOpen,
        onMobileOpenChange: setMobileOpen,
      })
    : sidebar;

  const headerNode = isValidElement(header)
    ? cloneElement(header, {
        onMobileMenuOpen: () => setMobileOpen(true),
      })
    : header;

  return (
    <div className="bg-background font-display text-foreground min-h-screen">
      {sidebarNode}
      <div
        className={cn(
          'flex min-h-screen flex-col transition-[padding] duration-300',
          'lg:pl-[var(--dashboard-sidebar-width,16rem)]',
        )}
      >
        {headerNode}
        <main className="flex-1 px-6 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}

export default DashboardShell;
