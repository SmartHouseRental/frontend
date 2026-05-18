import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star, X } from "lucide-react";

export default function ReviewModal({ isOpen, onClose, property }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredRating, setHoveredRating] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you'd send this to an API
    console.log("Review submitted:", { rating, comment, propertyId: property.id });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
      <div 
        className="w-full max-w-2xl bg-card rounded-t-[32px] p-8 shadow-2xl animate-in slide-in-from-bottom duration-500 ease-out border-t border-border/40 pb-12"
      >
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Leave a Review</h2>
            <p className="text-muted-foreground text-sm">
              Share your experience at {property.titleStr || (typeof property.title === 'object' ? (property.title?.en || property.title?.am) : property.title) || 'this property'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">
              Rating
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
                    size={36} 
                    className={`transition-colors duration-200 ${
                      (hoveredRating || rating) >= star 
                        ? "fill-primary text-primary" 
                        : "text-muted border-2 border-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-muted-foreground">
              Your Review
            </label>
            <Textarea
              placeholder="What did you think of this place?"
              className="min-h-[150px] rounded-2xl p-4 bg-muted/30 border-border/40 focus:ring-primary/20"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4 pt-2">
            <Button 
              type="button" 
              variant="outline" 
              className="flex-1 py-6 rounded-xl font-bold border-border/60"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="flex-1 py-6 rounded-xl font-bold bg-[#D97745] hover:bg-[#C96635] shadow-lg shadow-[#D97745]/20"
              disabled={rating === 0}
            >
              Submit Review
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
