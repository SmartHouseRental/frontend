import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Enterprise search bar with optional clear and filter slot.
 */
export function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className,
  onClear,
  filterSlot,
}) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative min-w-0 flex-1">
        <Search
          size={16}
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
          aria-hidden
        />
        <Input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="h-10 border-border/60 bg-background pl-10 pr-10 shadow-sm"
          aria-label={placeholder}
        />
        {value && onClear && (
          <Button
            type="button"
            variant="ghost"
            size="icon-xs"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={onClear}
            aria-label="Clear search"
          >
            <X size={14} />
          </Button>
        )}
      </div>
      {filterSlot}
    </div>
  );
}

export default SearchBar;
