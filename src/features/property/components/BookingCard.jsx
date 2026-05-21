import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageCircle, CalendarDays, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router';
import ReviewModal from './ReviewModal';
import ScheduleVisitModal from '@/features/visits/components/ScheduleVisitModal';
import { getLocalizedText } from '@/lib/utils/i18n';

export default function BookingCard({ property }) {
  const navigate = useNavigate();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  const propertyData = property || {
    id: 'modern-villa-old-airport',
    title: 'Modern Villa, Old Airport',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCVgURC1lpKm2NhTjoN7OKXfArljV4h3wLH6LpjWuPeGCTDtBV4kJ6qriA-GgEEHF6goYhJeqb-X1HUf1VAFWd3UGza05kHoGe5oin8TRXd4XbpTFnTYCD_yhWbtJvRw3xGH18_ymJt-97r6da6q_0I4Fi7xHoi5Yj8CB4Z_W5cmZx0S9tnPh2ZcqMF6zmzAB503SOjajS9edta0m4A1QiiqKhVLEpN3y9o1OzCZILWZefKYilnrTnmZvmQmpcWFj8hUaP_rQKBv34',
    ownerName: 'Dawit',
    price: '45,000 ETB',
  };

  const displayPrice =
    property?.price?.value != null
      ? `${property.price.value.toLocaleString()} ${property.price.currency || 'ETB'}`
      : property?.price || '45,000 ETB';

  const handleChat = () => {
    navigate('/chat');
  };

  const handleSchedule = () => {
    if (!property?.id) return;
    setScheduleOpen(true);
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
                {displayPrice.split(' ')[0]} {displayPrice.split(' ')[1]}
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="text-primary h-4 w-4" />
              4.9
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
              onClick={() => setIsReviewModalOpen(true)}
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
