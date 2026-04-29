import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, MessageSquare, ThumbsUp, ThumbsDown, Filter, Send, X, ChevronDown } from 'lucide-react';

const initialReviews = [
    { id: 1, renter: 'Mulugeta K.', property: 'Bole Skyline Apartment', rating: 5, comment: 'Excellent apartment with a beautiful view. The owner was very responsive and helpful throughout the rental process. Highly recommended!', date: 'Mar 10, 2026', status: 'Published', avatar: 'M', replied: true, reply: 'Thank you for your kind words, Mulugeta! It was a pleasure working with you.', likes: 3, dislikes: 0 },
    { id: 2, renter: 'Sara T.', property: 'Luxury Villa in Bole Atlas', rating: 4, comment: 'Beautiful villa with great amenities. The garden is stunning. Only issue was a minor plumbing delay but it was quickly resolved.', date: 'Mar 5, 2026', status: 'Published', avatar: 'S', replied: false, reply: '', likes: 2, dislikes: 0 },
    { id: 3, renter: 'Helen G.', property: 'Cottage by the Lake', rating: 5, comment: 'Perfect getaway spot! The cottage is exactly as described — peaceful, clean, and beautifully maintained. Will definitely rent again.', date: 'Feb 28, 2026', status: 'Published', avatar: 'H', replied: true, reply: 'So glad you enjoyed your stay! Looking forward to welcoming you back.', likes: 5, dislikes: 0 },
    { id: 4, renter: 'Abebe W.', property: 'Modern Studio in Kazanchis', rating: 3, comment: 'Decent studio for the price. Location is great but the unit could use some updates. WiFi was sometimes unreliable.', date: 'Feb 20, 2026', status: 'Under Review', avatar: 'A', replied: false, reply: '', likes: 0, dislikes: 1 },
    { id: 5, renter: 'Yonas D.', property: 'Penthouse Suite CMC', rating: 5, comment: 'Absolutely stunning penthouse! The views are incredible, the furnishing is top-notch, and the security is excellent. Best rental experience I have had.', date: 'Feb 15, 2026', status: 'Published', avatar: 'Y', replied: true, reply: 'Thank you, Yonas! We strive to provide the best rental experience possible.', likes: 7, dislikes: 0 },
];

function ReviewsPage() {
    const [reviews, setReviews] = useState(initialReviews);
    const [replyingTo, setReplyingTo] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [filterRating, setFilterRating] = useState('all');
    const [sortBy, setSortBy] = useState('newest');
    const [expandedReply, setExpandedReply] = useState(null);

    const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
    const ratingCounts = [5, 4, 3, 2, 1].map(star => ({ star, count: reviews.filter(r => r.rating === star).length }));

    const filteredReviews = reviews
        .filter(r => filterRating === 'all' || r.rating === parseInt(filterRating))
        .sort((a, b) => {
            if (sortBy === 'highest') return b.rating - a.rating;
            if (sortBy === 'lowest') return a.rating - b.rating;
            return 0; // 'newest' — already in order
        });

    const handleSubmitReply = (id) => {
        if (!replyText.trim()) return;
        setReviews(prev => prev.map(r => r.id === id ? { ...r, replied: true, reply: replyText } : r));
        setReplyingTo(null);
        setReplyText('');
    };

    const handleLike = (id) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, likes: r.likes + 1 } : r));
    };

    const handleDislike = (id) => {
        setReviews(prev => prev.map(r => r.id === id ? { ...r, dislikes: r.dislikes + 1 } : r));
    };

    const RatingStars = ({ rating, size = 14 }) => (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={size} className={`transition-colors ${s <= rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground/20'}`} />
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
                                <SelectItem value="highest">Highest</SelectItem>
                                <SelectItem value="lowest">Lowest</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                <Card className="md:col-span-1 border-0">
                    <CardContent className="flex flex-col items-center justify-center text-center py-6">
                        <p className="text-5xl font-black text-foreground">{avgRating}</p>
                        <RatingStars rating={Math.round(avgRating)} size={20} />
                        <p className="text-xs text-muted-foreground mt-2 font-medium">{reviews.length} total reviews</p>
                        <div className="mt-2 flex items-center gap-1">
                            <ThumbsUp size={12} className="text-emerald-500" />
                            <span className="text-xs font-bold text-emerald-500">{Math.round((reviews.filter(r => r.rating >= 4).length / reviews.length) * 100)}% positive</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="md:col-span-3 border-0">
                    <CardContent className="space-y-2.5 py-4">
                        {ratingCounts.map(({ star, count }) => {
                            const percent = (count / reviews.length) * 100;
                            return (
                                <button
                                    key={star}
                                    onClick={() => setFilterRating(filterRating === String(star) ? 'all' : String(star))}
                                    className={`w-full flex items-center gap-3 rounded-lg px-2 py-1 transition-colors ${filterRating === String(star) ? 'bg-amber-50' : 'hover:bg-muted/30'}`}
                                >
                                    <span className="text-xs font-bold w-3">{star}</span>
                                    <Star size={12} className="text-amber-400 fill-amber-400" />
                                    <div className="flex-1 h-2.5 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-amber-400 rounded-full transition-all duration-500" style={{ width: `${percent}%` }}></div>
                                    </div>
                                    <span className="text-xs text-muted-foreground font-bold w-6 text-right">{count}</span>
                                </button>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>

            {/* Reviews */}
            <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                    <Card className="border-dashed"><CardContent className="text-center py-12"><Star size={32} className="mx-auto text-muted-foreground/20 mb-3" /><p className="text-muted-foreground">No reviews match your filter</p></CardContent></Card>
                ) : (
                    filteredReviews.map((review) => (
                        <Card key={review.id} className="hover:shadow-md transition-all duration-300">
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

                                        {/* Owner Reply */}
                                        {review.replied && review.reply && (
                                            <div className="mt-3 rounded-lg bg-primary/5 border border-primary/10 p-3">
                                                <div className="flex items-center justify-between">
                                                    <p className="text-xs font-bold text-primary">Your Reply</p>
                                                    <button onClick={() => setExpandedReply(expandedReply === review.id ? null : review.id)} className="text-xs text-muted-foreground hover:text-foreground">
                                                        <ChevronDown size={14} className={`transition-transform ${expandedReply === review.id ? 'rotate-180' : ''}`} />
                                                    </button>
                                                </div>
                                                {(expandedReply === review.id || review.reply.length < 100) && (
                                                    <p className="text-xs text-foreground mt-1 leading-relaxed">{review.reply}</p>
                                                )}
                                            </div>
                                        )}

                                        {/* Reply Form */}
                                        {replyingTo === review.id && (
                                            <div className="mt-3 animate-in slide-in-from-top-2 duration-200">
                                                <textarea
                                                    value={replyText}
                                                    onChange={(e) => setReplyText(e.target.value)}
                                                    className="w-full h-20 rounded-lg border border-border bg-background p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-primary/20"
                                                    placeholder="Write your reply to this review..."
                                                    autoFocus
                                                />
                                                <div className="flex items-center justify-end gap-2 mt-2">
                                                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => { setReplyingTo(null); setReplyText(''); }}>Cancel</Button>
                                                    <Button size="sm" className="h-7 text-xs gap-1" onClick={() => handleSubmitReply(review.id)} disabled={!replyText.trim()}>
                                                        <Send size={12} /> Send Reply
                                                    </Button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-3 mt-4">
                                            <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${review.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {review.status}
                                            </span>
                                            {review.replied ? (
                                                <span className="text-xs text-emerald-600 flex items-center gap-1 font-medium">
                                                    <MessageSquare size={12} /> Replied
                                                </span>
                                            ) : replyingTo !== review.id ? (
                                                <Button variant="outline" size="sm" className="h-7 text-xs gap-1" onClick={() => setReplyingTo(review.id)}>
                                                    <MessageSquare size={12} /> Reply
                                                </Button>
                                            ) : null}
                                            <div className="ml-auto flex items-center gap-2">
                                                <button onClick={() => handleLike(review.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-emerald-500 transition-colors">
                                                    <ThumbsUp size={12} /> {review.likes > 0 && <span className="font-bold">{review.likes}</span>}
                                                </button>
                                                <button onClick={() => handleDislike(review.id)} className="flex items-center gap-1 text-xs text-muted-foreground hover:text-rose-500 transition-colors">
                                                    <ThumbsDown size={12} /> {review.dislikes > 0 && <span className="font-bold">{review.dislikes}</span>}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default ReviewsPage;
