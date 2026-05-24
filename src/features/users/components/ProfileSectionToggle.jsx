import { ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

/**
 * Clickable profile section header that expands/collapses content.
 */
export default function ProfileSectionToggle({
  title,
  subtitle,
  count,
  isOpen,
  onToggle,
  children,
  className = '',
}) {
  return (
    <Card className={cn('overflow-hidden rounded-3xl border-none shadow-xl', className)}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-3 p-6 text-left transition-colors hover:bg-muted/30"
        aria-expanded={isOpen}
      >
        <div className="min-w-0">
          <h3 className="text-lg font-bold text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          {count != null && (
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-bold text-primary">
              {count}
            </span>
          )}
          <ChevronDown
            size={20}
            className={cn(
              'text-muted-foreground transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </div>
      </button>

      {isOpen && (
        <CardContent className="border-t border-border/40 pt-0 pb-6 px-6">
          {children}
        </CardContent>
      )}
    </Card>
  );
}
