import { LayoutGrid, List, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { SearchBar } from './SearchBar';

/**
 * Toolbar for data tables and property listings — search, filters, view toggle.
 */
export function DataTableToolbar({
  searchValue,
  onSearchChange,
  searchPlaceholder,
  onClearSearch,
  filters,
  viewMode,
  onViewModeChange,
  actions,
  className,
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-xl border border-border/60 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder={searchPlaceholder}
        onClear={onClearSearch}
        className="flex-1"
        filterSlot={
          filters && (
            <Button variant="outline" size="sm" className="hidden gap-1.5 sm:flex">
              <Filter size={14} />
              Filters
            </Button>
          )
        }
      />
      <div className="flex items-center gap-2">
        {filters}
        {onViewModeChange && (
          <div className="border-border/60 flex overflow-hidden rounded-lg border">
            <button
              type="button"
              onClick={() => onViewModeChange('list')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'list'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted',
              )}
              aria-label="List view"
            >
              <List size={16} />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('grid')}
              className={cn(
                'p-2 transition-colors',
                viewMode === 'grid'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted',
              )}
              aria-label="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
        )}
        {actions}
      </div>
    </div>
  );
}

export default DataTableToolbar;
