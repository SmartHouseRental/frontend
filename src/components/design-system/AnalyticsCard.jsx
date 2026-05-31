import { cn } from '@/lib/utils';

/**
 * Container for charts and analytics sections with consistent header/actions.
 */
export function AnalyticsCard({
  title,
  subtitle,
  children,
  actions,
  className,
  contentClassName,
  noPadding = false,
}) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm',
        className,
      )}
    >
      {(title || actions) && (
        <div className="flex items-start justify-between gap-4 border-b border-border/60 px-6 py-4">
          <div>
            {title && (
              <h3 className="text-foreground text-base font-semibold">{title}</h3>
            )}
            {subtitle && (
              <p className="text-muted-foreground mt-0.5 text-sm">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className={cn(!noPadding && 'p-6', contentClassName)}>{children}</div>
    </div>
  );
}

export default AnalyticsCard;
