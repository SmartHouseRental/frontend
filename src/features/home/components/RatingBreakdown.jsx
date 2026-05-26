import { Star } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const dummyBreakdown = [
    { stars: 5, count: 28, percentage: 67 },
    { stars: 4, count: 9, percentage: 21 },
    { stars: 3, count: 3, percentage: 7 },
    { stars: 2, count: 1, percentage: 3 },
    { stars: 1, count: 1, percentage: 2 },
];

export default function RatingBreakdown({ rating = 4.8, reviewCount = 42 }) {
    const { t } = useLanguage();

    return (
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-12">
            {/* Overall score */}
            <div className="flex flex-col items-center gap-1">
                <span className="text-5xl font-extrabold">{rating}</span>
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`h-4 w-4 ${i < Math.round(rating) ? 'fill-primary text-primary' : 'text-muted'
                                }`}
                        />
                    ))}
                </div>
                <span className="text-muted-foreground text-sm">
                    {t('propertyDetail.reviewCount', { count: reviewCount })}
                </span>
            </div>

            {/* Breakdown bars */}
            <div className="flex flex-1 flex-col gap-2">
                {dummyBreakdown.map((row) => (
                    <div key={row.stars} className="flex items-center gap-3">
                        <span className="w-3 text-right text-sm font-semibold">{row.stars}</span>
                        <Star className="fill-primary text-primary h-3.5 w-3.5" />
                        <div className="bg-muted h-2.5 flex-1 overflow-hidden rounded-full">
                            <div
                                className="bg-primary h-full rounded-full transition-all duration-700"
                                style={{ width: `${row.percentage}%` }}
                            />
                        </div>
                        <span className="text-muted-foreground w-8 text-right text-xs">{row.count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
