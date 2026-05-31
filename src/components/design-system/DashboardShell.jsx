import { cn } from '@/lib/utils';

/**
 * Responsive dashboard layout shell with sidebar offset.
 */
export function DashboardShell({ sidebar, header, children, sidebarWidth = 'lg:pl-64' }) {
  return (
    <div className="bg-background font-display text-foreground min-h-screen">
      {sidebar}
      <div className={cn('flex min-h-screen flex-col transition-all duration-300', sidebarWidth)}>
        {header}
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default DashboardShell;
