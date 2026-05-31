import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const accentMap = {
  primary: {
    icon: 'bg-primary/10 text-primary',
    border: 'border-l-primary',
    glow: 'group-hover:shadow-primary/10',
  },
  indigo: {
    icon: 'bg-[#262626]/10 text-[#171717] dark:text-[#a3a3a3]',
    border: 'border-l-[#262626]',
    glow: 'group-hover:shadow-black/5',
  },
  success: {
    icon: 'bg-[#22C55E]/10 text-[#22C55E]',
    border: 'border-l-[#22C55E]',
    glow: 'group-hover:shadow-[#22C55E]/10',
  },
  warning: {
    icon: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    border: 'border-l-amber-500',
    glow: 'group-hover:shadow-amber-500/10',
  },
  danger: {
    icon: 'bg-red-500/10 text-red-600 dark:text-red-400',
    border: 'border-l-red-500',
    glow: 'group-hover:shadow-red-500/10',
  },
};

/**
 * Enterprise KPI summary card with trend indicator and optional sparkline area.
 */
export function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = 'primary',
  change,
  trend,
  actionLabel,
  actionColor = 'text-amber-600',
  onClick,
  className,
  index = 0,
}) {
  const colors = accentMap[accent] || accentMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card
        className={cn(
          'group relative overflow-hidden border border-border/60 border-l-[3px] bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
          colors.border,
          colors.glow,
          onClick && 'cursor-pointer',
          className,
        )}
        onClick={onClick}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            {Icon && (
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-105',
                  colors.icon,
                )}
              >
                <Icon size={18} strokeWidth={2} />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {title}
              </p>
              <p className="text-foreground mt-1 text-2xl font-bold tracking-tight tabular-nums">
                {value}
              </p>
              {subtitle && (
                <p className="text-muted-foreground mt-0.5 text-xs">{subtitle}</p>
              )}
            </div>
            {(change || actionLabel) && (
              <div className="shrink-0 text-right">
                {change && trend && (
                  <span
                    className={cn(
                      'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
                      trend === 'up'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                        : 'bg-red-500/10 text-red-600 dark:text-red-400',
                    )}
                  >
                    {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                    {change}
                  </span>
                )}
                {actionLabel && (
                  <span className={cn('text-xs font-semibold', actionColor)}>{actionLabel}</span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default KpiCard;
