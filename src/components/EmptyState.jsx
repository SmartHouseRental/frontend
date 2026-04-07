import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Inbox } from 'lucide-react';

function EmptyState({ icon: Icon = Inbox, title = 'No results found', description, actionLabel, onAction, className = '' }) {
    return (
        <Card className={`border-dashed ${className}`}>
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/50 mb-4">
                    <Icon size={28} className="text-muted-foreground/40" />
                </div>
                <p className="text-sm font-semibold text-foreground">{title}</p>
                {description && <p className="text-xs text-muted-foreground mt-1 max-w-sm">{description}</p>}
                {actionLabel && onAction && (
                    <Button className="mt-4 gap-2" size="sm" onClick={onAction}>
                        {actionLabel}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
}

export default EmptyState;
