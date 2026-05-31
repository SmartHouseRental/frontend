import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

/**
 * Recent activity timeline feed for dashboards.
 */
export function ActivityFeed({ items = [], emptyMessage = 'No recent activity', className }) {
  if (items.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-8 text-center', className)}>
        <div className="mb-3 size-10 rounded-full bg-muted" />
        <p className="text-muted-foreground text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-1', className)}>
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.id ?? index}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group hover:bg-muted/40 -mx-2 flex cursor-pointer items-start gap-3 rounded-lg px-2 py-2.5 transition-colors"
          >
            <div
              className={cn(
                'mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-105',
                item.bgColor || 'bg-primary/10',
              )}
            >
              {Icon && (
                <Icon size={14} className={item.iconColor || 'text-primary'} strokeWidth={2} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-foreground text-sm font-medium">{item.title}</p>
              {item.desc && (
                <p className="text-muted-foreground truncate text-xs">{item.desc}</p>
              )}
              {item.time && (
                <p className="text-muted-foreground/60 mt-0.5 text-[10px]">{item.time}</p>
              )}
            </div>
            {item.badge && (
              <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                {item.badge}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

export default ActivityFeed;
