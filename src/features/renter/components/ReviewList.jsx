import { useState } from 'react';
import { Star, Calendar, Edit2, Trash2, Loader2, X, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useReviews, useUpdateReview, useDeleteReview } from '../hooks/useReviews';

function getPropertyTitle(property) {
  if (!property) return 'Property Details';
  if (typeof property.title === 'object') {
    return property.title.en || property.title.am || 'Property Details';
  }
  return property.title || 'Property Details';
}

function EditReviewModal({ review, isOpen, onClose, t }) {
  const [rating, setRating] = useState(review?.rating ?? 0);
  const [comment, setComment] = useState(review?.comment ?? '');
  const [hoveredRating, setHoveredRating] = useState(0);
  const updateReview = useUpdateReview();

  if (!isOpen || !review) return null;

  const propertyTitle = getPropertyTitle(review.property);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateReview.mutate(
      {
        id: review.id,
        propertyId: review.property?.id,
        data: { rating, comment },
      },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <div className="w-full max-w-lg bg-card rounded-[28px] p-8 shadow-2xl animate-in zoom-in-95 duration-300 border border-border/40">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">{t('renter.reviews.modal.editTitle')}</h2>
            <p className="text-muted-foreground text-sm">{propertyTitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">
              {t('renter.reviews.modal.rating')}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className="transition-transform active:scale-90"
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    size={32}
                    className={`transition-colors duration-200 ${
                      (hoveredRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">
              {t('renter.reviews.modal.feedback')}
            </label>
            <Textarea
              placeholder={t('renter.reviews.modal.placeholder')}
              className="min-h-[140px] rounded-2xl p-4 bg-muted/30 border-border/40 focus:ring-primary/20"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="outline"
              className="flex-1 py-5 rounded-xl font-bold border-border/60"
              onClick={onClose}
              disabled={updateReview.isPending}
            >
              {t('renter.reviews.modal.cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 py-5 rounded-xl font-bold bg-[#D97745] hover:bg-[#C96635] shadow-lg shadow-[#D97745]/20"
              disabled={rating === 0 || updateReview.isPending}
            >
              {updateReview.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t('renter.reviews.modal.saving')}
                </>
              ) : (
                t('renter.reviews.modal.saveChanges')
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteReviewModal({ review, isOpen, onClose, t }) {
  const deleteReview = useDeleteReview();

  if (!isOpen || !review) return null;

  const propertyTitle = getPropertyTitle(review.property);

  const handleDelete = () => {
    deleteReview.mutate(
      { id: review.id, propertyId: review.property?.id },
      { onSuccess: () => onClose() }
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-md animate-in zoom-in-95 duration-300 border-destructive/20 shadow-2xl">
        <CardContent className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">{t('renter.reviews.modal.deleteTitle')}</h3>
              <p className="text-muted-foreground text-sm">{t('renter.reviews.modal.deleteDescription')}</p>
            </div>
          </div>

          <p className="text-muted-foreground mb-2 leading-relaxed">
            {t('renter.reviews.modal.deletePrompt', { property: propertyTitle })}
          </p>
          <p className="text-xs text-muted-foreground/80 mb-8">
            {t('renter.reviews.modal.deleteInfo')}
          </p>

          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 rounded-xl font-semibold"
              onClick={onClose}
              disabled={deleteReview.isPending}
            >
              {t('renter.reviews.modal.keepReview')}
            </Button>
            <Button
              variant="destructive"
              className="flex-1 rounded-xl font-semibold"
              onClick={handleDelete}
              disabled={deleteReview.isPending}
            >
              {deleteReview.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  {t('renter.reviews.modal.deleting')}
                </>
              ) : (
                t('renter.reviews.modal.deleteReview')
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ReviewList() {
  const { t } = useTranslation();
  const { data: reviews, isLoading, isError, error } = useReviews();
  const [editingReview, setEditingReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-destructive font-medium">{t('renter.reviews.errors.failedLoad')}</p>
        <p className="text-muted-foreground text-sm">{error?.message || t('renter.reviews.errors.tryAgain')}</p>
        <Button variant="outline" onClick={() => window.location.reload()}>
          {t('renter.reviews.errors.tryAgain')}
        </Button>
      </div>
    );
  }

  const reviewsArray = Array.isArray(reviews) ? reviews : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('renter.reviews.title')}</h1>
        <p className="text-muted-foreground mt-1">{t('renter.reviews.subtitle')}</p>
      </div>

      <div className="grid gap-6">
        {reviewsArray.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>{t('renter.reviews.empty')}</p>
          </div>
        ) : (
          reviewsArray.map((review) => {
            const propertyTitle = getPropertyTitle(review.property);

            return (
              <Card key={review.id} className="border-none shadow-sm bg-white overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-6 md:p-8 flex-1">
                      <div className="flex justify-between items-start mb-4 gap-4">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary transition-colors mb-1">
                            {propertyTitle}
                          </h3>
                          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium uppercase tracking-wider">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-full">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                                }`}
                              />
                            ))}
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/5"
                            onClick={() => setEditingReview(review)}
                            aria-label={t('renter.reviews.actions.editReview')}
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/5"
                            onClick={() => setDeletingReview(review)}
                            aria-label={t('renter.reviews.actions.deleteReview')}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="relative bg-slate-50/50 p-6 rounded-2xl border border-slate-100 italic text-slate-700 leading-relaxed text-sm">
                        &ldquo;{review.comment || ''}&rdquo;
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <EditReviewModal
        key={editingReview?.id ?? 'closed'}
        review={editingReview}
        isOpen={!!editingReview}
        onClose={() => setEditingReview(null)}
        t={t}
      />

      <DeleteReviewModal
        review={deletingReview}
        isOpen={!!deletingReview}
        onClose={() => setDeletingReview(null)}
        t={t}
      />
    </div>
  );
}
