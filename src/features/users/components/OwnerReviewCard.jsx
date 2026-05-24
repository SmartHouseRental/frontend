import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Star } from 'lucide-react';

export default function OwnerReviewCard({ review }) {
  const reviewerName = review.reviewerName || 'Anonymous';
  const dateLabel = review.date
    ? new Date(review.date).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : '';

  return (
    <Card className="border-border/40 overflow-hidden rounded-2xl shadow-sm">
      <CardContent className="p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="size-8 shrink-0">
              <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                {reviewerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold">{reviewerName}</div>
              {dateLabel && (
                <div className="text-muted-foreground text-[10px]">{dateLabel}</div>
              )}
            </div>
          </div>
          <div className="flex shrink-0 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < review.rating ? 'fill-[#D97745] text-[#D97745]' : 'text-muted'
                }
              />
            ))}
          </div>
        </div>
        <p className="text-foreground/80 text-sm leading-relaxed italic">
          &ldquo;{review.comment}&rdquo;
        </p>
      </CardContent>
    </Card>
  );
}
