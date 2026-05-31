import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * Enterprise stat card with accent left border and optional trend indicator.
 */
function StatCard({
  title,
  value,
  borderColor = 'border-l-primary',
  icon: Icon,
  iconBg = 'bg-primary/10 text-primary',
  change,
  trend,
  subtitle,
  actionLabel,
  actionColor,
  onClick,
  className,
  index = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={cn(
          'border border-border/60 border-l-[3px] bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md',
          borderColor,
          onClick && 'cursor-pointer',
          className,
        )}
        onClick={onClick}
      >
        <CardContent className="p-5">
          <div className="flex items-start justify-between gap-3">
            {Icon && (
              <span className={cn('flex size-10 items-center justify-center rounded-lg', iconBg)}>
                <Icon size={18} strokeWidth={2} />
              </span>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {title}
              </p>
              <h3 className="text-foreground mt-1 text-2xl font-bold tabular-nums">{value}</h3>
              {subtitle && (
                <p className="text-muted-foreground mt-0.5 text-xs">{subtitle}</p>
              )}
            </div>
            {change && trend && (
              <span
                className={cn(
                  'inline-flex items-center gap-0.5 rounded-full px-2 py-0.5 text-xs font-semibold',
                  trend === 'up'
                    ? 'bg-emerald-500/10 text-emerald-600'
                    : 'bg-red-500/10 text-red-600',
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
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default StatCard;
