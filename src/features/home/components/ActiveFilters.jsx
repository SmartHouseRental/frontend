import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function ActiveFilters({ filters = [], onRemove, onClearAll }) {
    if (!filters.length) return null;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-muted-foreground mr-1 text-sm font-semibold">Active Filters:</span>

            {filters.map((filter) => (
                <Badge
                    key={filter.id}
                    variant="secondary"
                    className="gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all hover:shadow-sm"
                >
                    <span className="text-muted-foreground text-[10px] uppercase">{filter.label}:</span>
                    {filter.value}
                    <button
                        onClick={() => onRemove?.(filter.id)}
                        className="hover:bg-foreground/10 -mr-1 ml-0.5 rounded-full p-0.5 transition-colors"
                        aria-label={`Remove ${filter.label} filter`}
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}

            <Button
                variant="ghost"
                size="sm"
                onClick={onClearAll}
                className="text-primary h-auto px-2 py-1 text-xs font-bold hover:underline"
            >
                Clear All
            </Button>
        </div>
    );
}
