import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const colorMap = {
  primary: {
    icon: 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground',
    arrow: 'group-hover:text-primary',
  },
  indigo: {
    icon: 'bg-[#262626]/10 text-[#171717] group-hover:bg-[#171717] group-hover:text-white',
    arrow: 'group-hover:text-[#171717]',
  },
  success: {
    icon: 'bg-[#22C55E]/10 text-[#22C55E] group-hover:bg-[#22C55E] group-hover:text-white',
    arrow: 'group-hover:text-[#22C55E]',
  },
  warning: {
    icon: 'bg-amber-500/10 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
    arrow: 'group-hover:text-amber-600',
  },
  danger: {
    icon: 'bg-red-500/10 text-red-600 group-hover:bg-red-600 group-hover:text-white',
    arrow: 'group-hover:text-red-600',
  },
};

export function QuickActionCard({
  label,
  desc,
  icon: Icon,
  color = 'primary',
  to,
  onClick,
  index = 0,
}) {
  const colors = colorMap[color] || colorMap.primary;

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group flex w-full items-center gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-md"
    >
      <div
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-lg transition-all duration-300',
          colors.icon,
        )}
      >
        <Icon size={20} strokeWidth={2} />
      </div>
      <div className="min-w-0 flex-1 text-left">
        <p className="text-foreground text-sm font-semibold">{label}</p>
        {desc && <p className="text-muted-foreground mt-0.5 text-xs">{desc}</p>}
      </div>
      <ArrowRight
        size={16}
        className={cn(
          'text-muted-foreground shrink-0 transition-all duration-300 group-hover:translate-x-0.5',
          colors.arrow,
        )}
      />
    </motion.div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full text-left">
        {content}
      </button>
    );
  }

  if (to) {
    return <Link to={to}>{content}</Link>;
  }

  return content;
}

export default QuickActionCard;
