import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for stat cards.
 *
 * @param {object} props
 * @param {number} [props.count=4] - Number of skeleton cards
 * @param {string} [props.gridCols='lg:grid-cols-4'] - Grid column class
 */
function CardSkeleton({ count = 4, gridCols = 'lg:grid-cols-4' }) {
    return (
        <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 ${gridCols}`}>
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="border-0 border-l-4 border-slate-200 p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <Skeleton className="h-10 w-10 rounded-xl" />
                        <Skeleton className="h-3 w-12" />
                    </div>
                    <Skeleton className="mb-2 h-2.5 w-24" />
                    <Skeleton className="h-7 w-20" />
                </Card>
            ))}
        </div>
    );
}

export default CardSkeleton;
