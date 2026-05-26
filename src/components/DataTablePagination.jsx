import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Reusable pagination footer for data tables.
 *
 * @param {object} props
 * @param {number} props.currentPage - Active page (1-indexed)
 * @param {number} props.totalPages - Total number of pages
 * @param {number} props.totalItems - Total number of items
 * @param {number} [props.itemsPerPage=6] - Items per page (for label)
 * @param {string} [props.itemLabel='items'] - Label for items (e.g. 'users', 'properties')
 * @param {function} [props.onPageChange] - Callback(pageNumber)
 */
function DataTablePagination({
    currentPage = 1,
    totalPages = 1,
    totalItems = 0,
    itemsPerPage = 6,
    itemLabel = 'items',
    showingLabel = 'Showing',
    ofLabel = 'of',
    onPageChange,
}) {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalItems);

    const getVisiblePages = () => {
        const pages = [];
        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) pages.push(i);
            if (currentPage < totalPages - 2) pages.push('...');
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
            <span className="text-muted-foreground text-xs font-medium">
                {showingLabel} {startItem}-{endItem} {ofLabel} {totalItems.toLocaleString()} {itemLabel}
            </span>
            <div className="flex items-center gap-1">
                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:bg-white disabled:opacity-40"
                    disabled={currentPage <= 1}
                    onClick={() => onPageChange?.(currentPage - 1)}
                >
                    <ChevronLeft size={16} />
                </button>

                {getVisiblePages().map((page, idx) =>
                    page === '...' ? (
                        <span key={`dots-${idx}`} className="text-muted-foreground px-1">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            className={cn(
                                'flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-colors',
                                page === currentPage
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-card',
                            )}
                            onClick={() => onPageChange?.(page)}
                        >
                            {page}
                        </button>
                    ),
                )}

                <button
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-400 transition-colors hover:bg-white disabled:opacity-40"
                    disabled={currentPage >= totalPages}
                    onClick={() => onPageChange?.(currentPage + 1)}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}

export default DataTablePagination;
