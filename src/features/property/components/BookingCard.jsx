import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle, CalendarDays, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router';
import ReviewModal from './ReviewModal';
import { usePropertyReviewStats } from '../hooks/useReviews';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function BookingCard({ property }) {
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  const propertyData = property || {};
  const displayPrice = property?.priceStr || '0 ETB / month';
  
  const { data: statsResponse } = usePropertyReviewStats(property?.id);
  const stats = statsResponse?.data || statsResponse || { averageRating: 0 };

  const handleChat = () => {
    navigate('/chat');
  };

  const handleSchedule = () => {
    navigate(`/renter/schedule-visit/${property.id}`);
  };

  return (
    <div className="sticky top-28">
      <Card className="relative overflow-hidden p-6 shadow-xl">
        <CardContent className="p-0">
          <div className="mb-6 flex justify-between">
            <div>
              <span className="text-primary text-3xl font-extrabold">
                {displayPrice.includes('month') ? displayPrice.replace('/ month', '').replace('/month', '').trim() : displayPrice}
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="text-primary h-4 w-4 fill-primary" />
              <span className="font-bold">{stats.averageRating ? Number(stats.averageRating).toFixed(1) : "New"}</span>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleSchedule}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97745] py-6 font-bold text-white hover:bg-[#C96635]"
            >
              <CalendarDays className="h-5 w-5" />
              Schedule a Visit
            </Button>

            <Button
              variant="outline"
              className="border-border/60 text-foreground w-full gap-2 rounded-xl py-6 font-bold transition-all hover:border-[#D97745] hover:bg-[#D97745] hover:text-white"
              onClick={handleChat}
            >
              <MessageCircle size={18} />
              Chat with Owner
            </Button>

            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-primary hover:bg-primary/5 w-full gap-2 rounded-xl py-5 text-xs font-bold transition-all"
              onClick={() => {
                if (!isAuthenticated) {
                  navigate('/login');
                } else {
                  setIsReviewModalOpen(true);
                }
              }}
            >
              <Edit3 size={16} />
              Leave a Review
            </Button>
          </div>

          <p className="text-muted-foreground mt-4 text-center text-[10px]">
            No charge yet. You won't be charged until you agree to a lease.
          </p>
        </CardContent>
      </Card>

      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        property={propertyData}
      />
    </div>
  );
}
