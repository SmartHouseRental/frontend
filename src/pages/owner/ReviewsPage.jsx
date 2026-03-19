import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Filter } from 'lucide-react';

function ReviewsPage() {
    const reviews = [
        { id: 1, renter: 'Mulugeta K.', property: 'Bole Skyline Apartment', rating: 5, comment: 'Excellent apartment with a beautiful view. The owner was very responsive and helpful throughout the rental process. Highly recommended!', date: 'Mar 10, 2026', status: 'Published', avatar: 'M', replied: true },
        { id: 2, renter: 'Sara T.', property: 'Luxury Villa in Bole Atlas', rating: 4, comment: 'Beautiful villa with great amenities. The garden is stunning. Only issue was a minor plumbing delay but it was quickly resolved.', date: 'Mar 5, 2026', status: 'Published', avatar: 'S', replied: false },
        { id: 3, renter: 'Helen G.', property: 'Cottage by the Lake', rating: 5, comment: 'Perfect getaway spot! The cottage is exactly as described — peaceful, clean, and beautifully maintained. Will definitely rent again.', date: 'Feb 28, 2026', status: 'Published', avatar: 'H', replied: true },
        { id: 4, renter: 'Abebe W.', property: 'Modern Studio in Kazanchis', rating: 3, comment: 'Decent studio for the price. Location is great but the unit could use some updates. WiFi was sometimes unreliable.', date: 'Feb 20, 2026', status: 'Under Review', avatar: 'A', replied: false },
        { id: 5, renter: 'Yonas D.', property: 'Penthouse Suite CMC', rating: 5, comment: 'Absolutely stunning penthouse! The views are incredible, the furnishing is top-notch, and the security is excellent. Best rental experience I have had.', date: 'Feb 15, 2026', status: 'Published', avatar: 'Y', replied: true },
    ];

    const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

    const RatingStars = ({ rating, size = 14 }) => (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={size} className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/30'} />
            ))}
        </div>
    );

    return (
        <div className="scrollbar-hide h-screen overflow-y-auto p-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground">Reviews Received</h1>
                    <p className="text-muted-foreground mt-1">See what renters are saying about your properties.</p>
                </div>
                <Button variant="outline" className="gap-2"><Filter size={14} /> Filter</Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Card className="md:col-span-1 border-0">
                    <CardContent className="flex flex-col items-center justify-center text-center py-6">
                        <p className="text-4xl font-black text-foreground">{avgRating}</p>
                        <RatingStars rating={Math.round(avgRating)} size={18} />
                        <p className="text-xs text-muted-foreground mt-2">{reviews.length} total reviews</p>
                    </CardContent>
                </Card>
                <Card className="md:col-span-3 border-0">
                    <CardContent className="space-y-2 py-4">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviews.filter(r => r.rating === star).length;
                            const percent = (count / reviews.length) * 100;
                            return (
                                <div key={star} className="flex items-center gap-3">
                                    <span className="text-xs font-bold w-3">{star}</span>
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-400 rounded-full transition-all" style={{ width: `${percent}%` }}></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground w-6 text-right">{count}</span>
                                </div>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>

            {/* Reviews List */}
            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card key={review.id} className="hover:shadow-md transition-shadow">
                        <CardContent>
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-sm">
                                    {review.avatar}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-foreground">{review.renter}</p>
                                            <p className="text-xs text-muted-foreground">{review.property}</p>
                                        </div>
                                        <div className="text-right">
                                            <RatingStars rating={review.rating} />
                                            <p className="text-[10px] text-muted-foreground mt-1">{review.date}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed mt-3">{review.comment}</p>
                                    <div className="flex items-center gap-3 mt-4">
                                        <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${review.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            {review.status}
                                        </span>
                                        {review.replied ? (
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <MessageSquare size={12} /> Replied
                                            </span>
                                        ) : (
                                            <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                                                <MessageSquare size={12} /> Reply
                                            </Button>
                                        )}
                                        <div className="ml-auto flex items-center gap-1">
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                                <ThumbsUp size={12} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground">
                                                <ThumbsDown size={12} />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default ReviewsPage;
