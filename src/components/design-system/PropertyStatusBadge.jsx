import { cn } from '@/lib/utils';

const statusConfig = {
  AVAILABLE: {
    label: 'Available',
    className: 'bg-[#22C55E]/10 text-[#15803d] dark:text-[#22C55E] ring-[#22C55E]/20',
    dot: 'bg-[#22C55E]',
  },
  RENTED: {
    label: 'Rented',
    className: 'bg-[#262626]/10 text-[#171717] dark:text-[#a3a3a3] ring-[#262626]/20',
    dot: 'bg-[#262626]',
  },
  MAINTENANCE: {
    label: 'Maintenance',
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
    dot: 'bg-amber-500',
  },
  UNAVAILABLE: {
    label: 'Unavailable',
    className: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 ring-slate-500/20',
    dot: 'bg-slate-400',
  },
  PENDING: {
    label: 'Pending',
    className: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-amber-500/20',
    dot: 'bg-amber-500',
  },
};

export function PropertyStatusBadge({ status, className, showDot = true }) {
  const key = (status || '').toUpperCase();
  const config = statusConfig[key] || {
    label: status || 'Unknown',
    className: 'bg-muted text-muted-foreground ring-border',
    dot: 'bg-muted-foreground',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset',
        config.className,
        className,
      )}
    >
      {showDot && <span className={cn('size-1.5 rounded-full', config.dot)} />}
      {config.label}
    </span>
  );
}

export default PropertyStatusBadge;
