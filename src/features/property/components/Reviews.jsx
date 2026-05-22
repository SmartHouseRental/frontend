import { Star } from "lucide-react";
import { usePropertyReviews, usePropertyReviewStats } from "../hooks/useReviews";

export default function Reviews({ property }) {
  const propertyId = property?.id;

  const { data: reviews, isLoading: isReviewsLoading } = usePropertyReviews(propertyId);
  const { data: stats, isLoading: isStatsLoading } = usePropertyReviewStats(propertyId);

  // Handle reviews that may be array directly or wrapped
  const reviewsArray = Array.isArray(reviews) ? reviews : [];
  const reviewStats = stats || { averageRating: 0, totalReviews: 0 };

  if (isReviewsLoading || isStatsLoading) {
    return <div className="animate-pulse h-32 bg-muted/20 rounded-xl" />;
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h3 className="text-2xl font-bold">Property Reviews</h3>
          <div className="flex items-center gap-1 text-primary">
            <Star className="w-5 h-5 fill-primary" />
            <span className="font-bold">
              {reviewStats.averageRating ? Number(reviewStats.averageRating).toFixed(1) : "New"}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              ({reviewStats.totalReviews} {reviewStats.totalReviews === 1 ? 'review' : 'reviews'})
            </span>
          </div>
        </div>

        {reviewsArray.length > 0 && (
          <button className="text-primary text-sm font-semibold hover:underline">
            Read all reviews
          </button>
        )}
      </div>

      {reviewsArray.length === 0 ? (
        <p className="text-muted-foreground italic text-sm">No reviews yet for this property.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {reviewsArray.slice(0, 4).map((review, idx) => (
            <div key={review.id || idx} className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary uppercase">
                  {review.reviewer?.email?.charAt(0) || "U"}
                </div>
                <div>
                  <p className="font-bold text-sm">{review.reviewer?.email || "Anonymous"}</p>
                  <div className="flex text-primary gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.rating ? "fill-primary" : "text-muted-foreground/30"}`} />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground italic leading-relaxed">
                "{review.comment || ''}"
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}