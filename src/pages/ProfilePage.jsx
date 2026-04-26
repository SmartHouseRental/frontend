import { useParams, useNavigate } from "react-router-dom";
import { users, reviews, properties } from "@/lib/dummyData";
import { useChat } from "@/features/chat/ChatContext";
import { useAuth } from "@/features/users/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star, MessageCircle, Phone, Home, Calendar, MapPin, Mail, ChevronRight, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { openConversation } = useChat();
  const { user: currentUser, isAuthenticated, openLoginModal } = useAuth();

  // Find user by ID or use the current user
  const userProfile = users.find(u => u.id === id) || (id ? null : currentUser) || users[0];
  
  const isOwnProfile = currentUser && userProfile && currentUser.id === userProfile.id;

  const userReviews = reviews.filter(r => r.targetId === userProfile.id);
  
  // If owner/agent, get their properties
  const userProperties = properties.filter(p => userProfile.listedProperties?.includes(p.id));

  const handleChat = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    openConversation({
      propertyId: "profile-chat",
      propertyTitle: "Direct Message",
      ownerName: userProfile.name,
      ownerAvatar: userProfile.avatar,
    });
    navigate("/chat");
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Profile Header */}
      <div className="bg-primary pt-16 pb-32 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 text-white">
          <Avatar className="size-32 border-4 border-white/20 shadow-2xl">
            <AvatarImage src={userProfile.avatar} />
            <AvatarFallback className="bg-white text-primary text-4xl font-bold">
              {userProfile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
              <h1 className="text-4xl font-extrabold">{userProfile.name}</h1>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-widest">
                {userProfile.role}
              </span>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                Addis Ababa, ET
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                Joined {userProfile.joinedDate}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px]">
            {isOwnProfile ? (
              <Button 
                variant="secondary"
                className="w-full bg-white text-primary hover:bg-white/90 font-bold py-6 rounded-xl shadow-lg border-2 border-white/20"
                onClick={() => navigate("/profile/edit")}
              >
                <Edit3 size={18} className="mr-2" />
                Edit Profile
              </Button>
            ) : (
              <>
                <Button 
                   variant="secondary"
                   className="w-full bg-white text-primary hover:bg-white/90 font-bold py-6 rounded-xl shadow-lg"
                   onClick={() => window.location.href = `tel:${userProfile.phone}`}
                >
                  <Phone size={18} className="mr-2" />
                  {userProfile.phone}
                </Button>
                <Button 
                  className="w-full bg-[#D97745] hover:bg-[#C96635] text-white font-bold py-6 rounded-xl shadow-lg"
                  onClick={handleChat}
                >
                  <MessageCircle size={18} className="mr-2" />
                  Chat Now
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-16">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left Column - Stats & Info */}
          <div className="md:col-span-1 space-y-6">
            <Card className="rounded-3xl border-none shadow-xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="font-bold mb-4 uppercase tracking-wider text-xs text-muted-foreground">Verification</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ID Verified</span>
                    <span className="text-green-600 font-bold">Yes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Phone Verified</span>
                    <span className="text-green-600 font-bold">Yes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Properties Managed</span>
                    <span className="font-bold">{userProfile.listedProperties?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-none shadow-xl overflow-hidden bg-gradient-to-br from-primary to-primary/80 text-white">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="size-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 text-2xl font-bold">
                  {userReviews.length > 0 
                    ? (userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length).toFixed(1)
                    : "0"}
                </div>
                <h3 className="font-bold mb-1">Average Rating</h3>
                <p className="text-xs text-white/70">Based on {userReviews.length} reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Listings & Reviews */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Properties Listed (for Owners/Agents) */}
            {userProfile.role !== "renter" && (
              <section>
                <div className="flex justify-between items-end mb-4 px-2">
                  <h2 className="text-xl font-bold">Listings by {userProfile.name.split(' ')[0]}</h2>
                  <span className="text-xs font-bold text-primary">{userProperties.length} total</span>
                </div>
                <div className="space-y-4">
                  {userProperties.map(property => (
                    <div 
                      key={property.id}
                      className="group bg-card border border-border/40 rounded-2xl p-3 flex gap-4 hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <img src={property.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="font-bold group-hover:text-primary transition-colors">{property.title}</h4>
                        <p className="text-xs text-muted-foreground mb-2">{property.location}</p>
                        <div className="text-primary font-extrabold">{property.price}</div>
                      </div>
                      <div className="self-center pr-2">
                        <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                  {userProperties.length === 0 && (
                    <p className="text-muted-foreground text-sm italic px-2">No active listings at the moment.</p>
                  )}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section>
              <h2 className="text-xl font-bold mb-4 px-2">User Reviews</h2>
              <div className="space-y-4">
                {userReviews.map(review => (
                  <Card key={review.id} className="rounded-2xl border-border/40 shadow-sm overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                              {review.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-bold">{review.author}</div>
                            <div className="text-[10px] text-muted-foreground">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < review.rating ? "fill-[#D97745] text-[#D97745]" : "text-muted"} 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-foreground/80 leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
                {userReviews.length === 0 && (
                  <p className="text-muted-foreground text-sm italic px-2">No reviews yet.</p>
                )}
              </div>
            </section>

          </div>

        </div>
      </div>

       {/* Subtle background pattern */}
       <div className="fixed inset-0 ethiopian-pattern pointer-events-none -z-10" />
    </div>
  );
}
