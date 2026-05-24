import { useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageSquare, ThumbsUp, Send, X, ChevronDown, Loader2 } from 'lucide-react';
import ErrorState from '@/components/ErrorState';
import { getApiErrorMessage } from '@/lib/apiErrors';
import {
  useOwnerReviews,
  useOwnerReviewStats,
  useReplyToReview,
} from '@/features/reviews/hooks/useOwnerReviews';
import {
  formatPropertyTitle,
  formatReviewDate,
  getReviewerInitial,
} from '@/features/reviews/utils/formatReview';

function ReviewsPage() {
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [expandedReply, setExpandedReply] = useState(null);

  const apiParams = useMemo(() => {
    const params = { limit: 100, sort: sortBy === 'oldest' ? 'oldest' : 'newest' };
    if (filterRating !== 'all') params.rating = Number(filterRating);
    return params;
  }, [filterRating, sortBy]);

  const {
    data: reviewsData,
    isLoading: reviewsLoading,
    isError: reviewsError,
    error: reviewsErrorObj,
    refetch: refetchReviews,
  } = useOwnerReviews(apiParams);

  const {
    data: stats,
    isLoading: statsLoading,
    isError: statsError,
    error: statsErrorObj,
    refetch: refetchStats,
  } = useOwnerReviewStats();

  const replyMutation = useReplyToReview();

  const reviews = reviewsData?.reviews ?? [];

  const filteredReviews = useMemo(() => {
    const sorted = [...reviews];
    if (sortBy === 'highest') sorted.sort((a, b) => b.rating - a.rating);
    if (sortBy === 'lowest') sorted.sort((a, b) => a.rating - b.rating);
    return sorted;
  }, [reviews, sortBy]);

  const avgRating = stats?.averageRating?.toFixed(1) ?? '0.0';
  const totalReviews = stats?.totalReviews ?? 0;
  const positivePercentage = stats?.positivePercentage ?? 0;
  const distribution = stats?.distribution ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({ star, count: distribution[star] ?? 0 }));

  const isLoading = reviewsLoading || statsLoading;
  const isError = reviewsError || statsError;

  const handleSubmitReply = (reviewId) => {
    if (!replyText.trim()) return;
    replyMutation.mutate(
      { reviewId, reply: replyText.trim() },
      {
        onSuccess: () => {
          setReplyingTo(null);
          setReplyText('');
        },
      },
    );
  };

  const RatingStars = ({ rating, size = 14 }) => (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} size={size} className={`transition-colors ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/20'}`} />
      ))}
    </div>
  );

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="scrollbar-hide h-screen overflow-y-auto p-8">
        <ErrorState
          title="Failed to load reviews"
          message={getApiErrorMessage(reviewsErrorObj || statsErrorObj, 'Unable to load your reviews.')}
          onRetry={() => {
            refetchReviews();
            refetchStats();
          }}
        />
      </div>
    );
  }

  return (
    <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Reviews Received</h1>
          <p className="text-muted-foreground mt-1">See what renters are saying about your properties.</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={filterRating} onValueChange={setFilterRating}>
            <SelectTrigger className="w-32"><SelectValue placeholder="Rating" /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="1">1 Star</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="oldest">Oldest</SelectItem>
                <SelectItem value="highest">Highest</SelectItem>
                <SelectItem value="lowest">Lowest</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <Card className="md:col-span-1 border-0">
          <CardContent className="flex flex-col items-center justify-center text-center py-6">
            <p className="text-5xl font-black text-foreground">{avgRating}</p>
            <RatingStars rating={Math.round(Number(avgRating))} size={20} />
            <p className="text-xs text-muted-foreground mt-2 font-medium">{totalReviews} total reviews</p>
            <div className="mt-2 flex items-center gap-1">
              <ThumbsUp size={12} className="text-emerald-500" />
              <span className="text-xs font-bold text-emerald-500">{positivePercentage}% positive</span>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-3 border-0">
          <CardContent className="space-y-2.5 py-4">
            {ratingCounts.map(({ star, count }) => {
              const percent = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <button
                  key={star}
                  onClick={() => setFilterRating(filterRating === String(star) ? 'all' : String(star))}
                  className={`w-full flex items-center gap-3 rounded-lg px-2 py-1 transition-colors ${filterRating === String(star) ? 'bg-amber-50' : 'hover:bg-muted/30'}`}
                >
                  <span className="text-xs font-bold w-3">{star}</span>
                  <Star size={12} className="text-amber-400 fill-amber-400" />
                  <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground font-bold w-6 text-right">{count}</span>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="text-center py-12">
              <Star size={32} className="mx-auto text-muted-foreground/20 mb-3" />
              <p className="text-muted-foreground">No reviews match your filter</p>
            </CardContent>
          </Card>
        ) : (
          filteredReviews.map((review) => {
            const reviewId = review.reviewId;
            const hasReply = Boolean(review.reply);
            const propertyTitle = formatPropertyTitle(review.propertyTitle);
            const reviewerName = review.reviewerName || 'Anonymous';

            return (
              <Card key={reviewId} className="hover:shadow-md transition-all duration-300">
                <CardContent>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                      {getReviewerInitial(reviewerName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-bold text-foreground">{reviewerName}</p>
                          <p className="text-xs text-muted-foreground">{propertyTitle}</p>
                        </div>
                        <div className="text-right">
                          <RatingStars rating={review.rating} />
                          <p className="text-[10px] text-muted-foreground mt-1">{formatReviewDate(review.createdAt)}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed mt-3">{review.comment}</p>

                      {hasReply && (
                        <div className="mt-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
                          <div className="flex items-center justify-between">
                            <p className="text-xs font-bold text-primary">Your Reply</p>
                            <button type="button" onClick={() => setExpandedReply(expandedReply === reviewId ? null : reviewId)} className="text-xs text-muted-foreground hover:text-foreground">
                              <ChevronDown size={14} className={`transition-transform ${expandedReply === reviewId ? 'rotate-180' : ''}`} />
                            </button>
                          </div>
                          {(expandedReply === reviewId || review.reply.length < 100) && (
                            <p className="text-xs text-foreground mt-1 leading-relaxed">{review.reply}</p>
                          )}
                        </div>
                      )}

                      {replyingTo === reviewId && (
                        <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                          <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            className="w-full h-20 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                            placeholder="Write your reply to this review..."
                            autoFocus
                          />
                          <div className="flex items-center justify-end gap-2 mt-2">
                            <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => { setReplyingTo(null); setReplyText(''); }} disabled={replyMutation.isPending}>
                              <X size={12} className="mr-1" /> Cancel
                            </Button>
                            <Button
                              size="sm"
                              className="h-7 text-xs gap-1"
                              onClick={() => handleSubmitReply(reviewId)}
                              disabled={!replyText.trim() || replyMutation.isPending}
                            >
                              {replyMutation.isPending ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />}
                              Send Reply
                            </Button>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-4">
                        {hasReply ? (
                          <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                            <MessageSquare size={12} /> Replied
                          </span>
                        ) : replyingTo !== reviewId ? (
                          <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setReplyingTo(reviewId)}>
                            <MessageSquare size={12} /> Reply
                          </Button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

export default ReviewsPage;
