import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle, CalendarDays, Edit3 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router';
import ReviewModal from './ReviewModal';
import { usePropertyReviewStats } from '../hooks/useReviews';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useCreateConversation, useConversations } from '@/features/chat/hooks/useMessaging';
import { getLocalizedText } from '@/lib/utils/i18n';
import ScheduleVisitModal from '@/features/visits/components/ScheduleVisitModal';

export default function BookingCard({ property }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const createConversation = useCreateConversation();
  const { data: conversations = [] } = useConversations();

  const propertyData = property || {};

  // Format price from API: { value: 35000, currency: "ETB" }
  const displayPrice = property?.price
    ? `${property.currency || 'ETB'} ${property.price.toLocaleString()} /month`
    : 'Contact for pricing';

  const { data: stats } = usePropertyReviewStats(property?.id);
  const statsData = stats || { averageRating: 0 };

  const handleChat = async () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } });
      return;
    }

    const targetOwnerId = property.owner?.id;

    // Check locally for an existing conversation first
    const existingChat = conversations.find(
      (c) =>
        c.propertyId === property.id &&
        (c.ownerId === targetOwnerId || c.owner?.id === targetOwnerId) &&
        (c.renterId === user.id || c.renter?.id === user.id),
    );

    if (existingChat) {
      navigate('/chat', { state: { conversationId: existingChat.id } });
      return;
    }

    try {
      const response = await createConversation.mutateAsync({
        ownerId: targetOwnerId,
        renterId: user.id,
        propertyId: property.id,
      });
      navigate('/chat', { state: { conversationId: response.id } });
    } catch (error) {
      console.error('Failed to create conversation:', error);
      navigate('/chat');
    }
  };

  const handleSchedule = () => {
    navigate(`/renter/schedule-visit/${property.id}`);
  };

  const scheduleProperty = property?.id
    ? {
        id: property.id,
        title: getLocalizedText(property.title, 'en') || 'Property',
      }
    : null;

  return (
    <div className="sticky top-28">
      <Card className="relative overflow-hidden p-6 shadow-xl">
        <CardContent className="p-0">
          <div className="mb-6 flex justify-between">
            <div>
              <span className="text-primary text-3xl font-extrabold">
                {displayPrice.split('/')[0].trim()}
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="text-primary fill-primary h-4 w-4" />
              <span className="font-bold">
                {statsData.averageRating ? Number(statsData.averageRating).toFixed(1) : 'New'}
              </span>
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
                  navigate('/login', { state: { from: location } });
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

      <ScheduleVisitModal
        open={scheduleOpen}
        property={scheduleProperty}
        onClose={() => setScheduleOpen(false)}
      />
    </div>
  );
}
