import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, MessageCircle, CalendarDays, Edit3 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useChat } from "@/features/chat/ChatContext"
import { useVisit } from "@/features/visits/VisitContext"
import { useAuth } from "@/features/users/AuthContext"
import { VisitCard } from "@/features/visits/components/VisitStatusCard"
import RequireAuthWrapper from "@/features/users/components/RequireAuthWrapper"
import ReviewModal from "./ReviewModal"

export default function BookingCard({ property }) {
  const navigate = useNavigate();
  const { openConversation } = useChat();
  const { getVisitForProperty, openScheduleModal, cancelVisit } = useVisit();
  const { isAuthenticated, openLoginModal } = useAuth();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const propertyData = property || {
    id: "modern-villa-old-airport",
    title: "Modern Villa, Old Airport",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVgURC1lpKm2NhTjoN7OKXfArljV4h3wLH6LpjWuPeGCTDtBV4kJ6qriA-GgEEHF6goYhJeqb-X1HUf1VAFWd3UGza05kHoGe5oin8TRXd4XbpTFnTYCD_yhWbtJvRw3xGH18_ymJt-97r6da6q_0I4Fi7xHoi5Yj8CB4Z_W5cmZx0S9tnPh2ZcqMF6zmzAB503SOjajS9edta0m4A1QiiqKhVLEpN3y9o1OzCZILWZefKYilnrTnmZvmQmpcWFj8hUaP_rQKBv34",
    ownerName: "Dawit",
    price: "45,000 ETB"
  };

  const displayPrice = property?.price || "45,000 ETB";

  const currentVisit = getVisitForProperty(propertyData.id);

  const handleChat = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    openConversation({
      propertyId: propertyData.id,
      propertyTitle: propertyData.title,
      propertyImage: propertyData.image,
      ownerName: propertyData.ownerName,
      ownerAvatar: null,
    });
    navigate("/chat");
  };

  const handleSchedule = () => {
    openScheduleModal(propertyData);
  };

  return (
    <div className="sticky top-28">

      <Card className="p-6 shadow-xl overflow-hidden relative">
        {/* Subtle background highlight if visit scheduled */}
        {currentVisit && currentVisit.status === "approved" && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 -mr-16 -mt-16 rounded-full blur-2xl" />
        )}

        <CardContent className="p-0">

          <div className="flex justify-between mb-6">

            <div>
              <span className="text-3xl font-extrabold text-primary">
                {displayPrice.split(' ')[0]} {displayPrice.split(' ')[1]}
              </span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </div>

            <div className="flex items-center gap-1">
              <Star className="text-primary w-4 h-4"/>
              4.9
            </div>

          </div>

          <div className="space-y-4">
            {currentVisit ? (
              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Your Scheduled Visit
                </p>
                <VisitCard 
                  visit={currentVisit} 
                  onReschedule={handleSchedule}
                  onCancel={() => cancelVisit(currentVisit.id)}
                />
              </div>
            ) : (
              <RequireAuthWrapper>
                <Button 
                  onClick={handleSchedule}
                  className="w-full bg-[#D97745] hover:bg-[#C96635] text-white flex items-center justify-center gap-2 font-bold py-6 rounded-xl"
                >
                  <CalendarDays className="h-5 w-5" />
                  Schedule a Visit
                </Button>
              </RequireAuthWrapper>
            )}

            <Button 
              variant="outline" 
              className="w-full gap-2 py-6 rounded-xl border-border/60 hover:border-[#D97745] hover:bg-[#D97745] hover:text-white transition-all text-foreground font-bold" 
              onClick={handleChat}
            >
              <MessageCircle size={18}/>
              Chat with Owner
            </Button>

            <RequireAuthWrapper>
              <Button 
                variant="ghost" 
                className="w-full gap-2 py-5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-xs font-bold" 
                onClick={() => setIsReviewModalOpen(true)}
              >
                <Edit3 size={16}/>
                Leave a Review
              </Button>
            </RequireAuthWrapper>
          </div>

          <p className="text-[10px] text-center text-muted-foreground mt-4">
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
  )
}