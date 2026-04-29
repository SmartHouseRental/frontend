import { Card } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader that mimics a data table.
 *
 * @param {object} props
 * @param {number} [props.rows=5] - Number of skeleton rows
 * @param {number} [props.columns=6] - Number of columns
 * @param {boolean} [props.showHeader=true] - Show table header skeletons
 */
function TableSkeleton({ rows = 5, columns = 6, showHeader = true }) {
    return (
        <Card className="gap-0 overflow-hidden p-0">
            <Table className="w-full min-w-full border-collapse text-left">
                {showHeader && (
                    <TableHeader className="bg-muted w-full">
                        <TableRow>
                            {Array.from({ length: columns }).map((_, i) => (
                                <TableHead key={i} className="px-6 py-4">
                                    <Skeleton className="h-3 w-20" />
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                )}
                <TableBody>
                    {Array.from({ length: rows }).map((_, rowIdx) => (
                        <TableRow key={rowIdx}>
                            {Array.from({ length: columns }).map((_, colIdx) => (
                                <TableCell key={colIdx} className="px-6 py-4">
                                    {colIdx === 0 ? (
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-10 w-10 rounded-lg" />
                                            <div className="space-y-1.5">
                                                <Skeleton className="h-3 w-24" />
                                                <Skeleton className="h-2.5 w-16" />
                                            </div>
                                        </div>
                                    ) : colIdx === columns - 1 ? (
                                        <Skeleton className="h-8 w-8 rounded-lg" />
                                    ) : (
                                        <Skeleton
                                            className="h-3"
                                            style={{ width: `${40 + Math.random() * 60}%` }}
                                        />
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-4">
                <Skeleton className="h-3 w-40" />
                <div className="flex gap-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} className="h-8 w-8 rounded-lg" />
                    ))}
                </div>
            </div>
        </Card>
    );
}

export default TableSkeleton;
