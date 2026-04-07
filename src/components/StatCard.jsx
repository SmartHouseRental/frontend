import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Stat card with accent left border and optional trend indicator.
 *
 * @param {object} props
 * @param {string} props.title - Stat label
 * @param {string|number} props.value - Main value
 * @param {string} [props.borderColor] - Border color class (e.g. 'border-blue-400')
 * @param {React.ElementType} [props.icon] - Lucide icon component
 * @param {string} [props.iconBg] - Icon background class (e.g. 'bg-blue-50 text-blue-600')
 * @param {string} [props.change] - Change percentage (e.g. '+12%')
 * @param {'up'|'down'} [props.trend] - Trend direction
 * @param {string} [props.subtitle] - Small text below value
 * @param {string} [props.actionLabel] - Label shown instead of trend (e.g. 'Action Needed')
 * @param {string} [props.actionColor] - Color class for action label
 * @param {function} [props.onClick] - Click handler (makes card clickable)
 * @param {string} [props.className] - Additional classes
 */
function StatCard({
  title,
  value,
  borderColor = 'border-primary',
  icon: Icon,
  iconBg = 'bg-primary/10 text-primary',
  change,
  trend,
  subtitle,
  actionLabel,
  actionColor,
  onClick,
  className,
}) {
  return (
    <Card
      className={cn(
        'border-0 border-l-4',
        borderColor,
        onClick && 'cursor-pointer transition-shadow hover:shadow-md',
        className,
      )}
      onClick={onClick}
    >
      <CardHeader className="flex justify-between">
        {Icon && (
          <span className={cn('rounded-lg p-2', iconBg)}>
            <Icon />
          </span>
        )}
        {change && trend && (
          <span
            className={cn(
              'flex items-center gap-1 text-xs font-bold',
              trend === 'up' ? 'text-emerald-500' : 'text-rose-500',
            )}
          >
            {trend === 'up' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {change}
          </span>
        )}
        {actionLabel && (
          <span className={cn('flex items-center gap-1 text-xs font-bold', actionColor)}>
            {actionLabel}
          </span>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
          {title}
        </p>
        <h3 className="mt-1 text-3xl font-bold">{value}</h3>
        {subtitle && <p className="text-muted-foreground mt-2 text-[11px]">{subtitle}</p>}
      </CardContent>
    </Card>
  );
}

export default StatCard;
