import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

function EmptyState({
  icon: Icon = Inbox,
  title = 'No results found',
  description,
  actionLabel,
  onAction,
  className = '',
}) {
  return (
    <Card className={cn('border-dashed border-border/60 bg-muted/20', className)}>
      <CardContent className="flex flex-col items-center justify-center py-16 text-center">
        <div className="grid-pattern mb-4 flex size-16 items-center justify-center rounded-2xl border border-border/40 bg-card">
          <Icon size={28} className="text-muted-foreground/50" strokeWidth={1.5} />
        </div>
        <p className="text-foreground text-sm font-semibold">{title}</p>
        {description && (
          <p className="text-muted-foreground mt-1 max-w-sm text-xs">{description}</p>
        )}
        {actionLabel && onAction && (
          <Button className="mt-4 gap-2 shadow-sm" size="sm" onClick={onAction}>
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default EmptyState;
