import { ChevronLeft, ChevronRight } from 'lucide-react';

function DataTablePagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }) {
    if (totalPages <= 1) return null;

    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    return (
        <div className="flex items-center justify-between border-t border-border bg-muted/20 px-6 py-4">
            <p className="text-muted-foreground text-xs font-medium">
                Showing {start}–{end} of {totalItems}
            </p>
            <div className="flex items-center gap-2">
                <button
                    className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50 hover:bg-muted/50 transition-colors"
                    disabled={currentPage === 1}
                    onClick={() => onPageChange(currentPage - 1)}
                >
                    <ChevronLeft size={16} />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        className={`rounded-lg px-3 py-1 text-xs font-bold transition-colors ${currentPage === page
                                ? 'bg-primary text-primary-foreground'
                                : 'text-muted-foreground hover:bg-card'
                            }`}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="rounded-lg border border-border p-2 text-muted-foreground disabled:opacity-50 hover:bg-muted/50 transition-colors"
                    disabled={currentPage === totalPages}
                    onClick={() => onPageChange(currentPage + 1)}
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );
}

export default DataTablePagination;
