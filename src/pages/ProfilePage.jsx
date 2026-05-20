import { useParams, useNavigate } from 'react-router';
import { users, reviews, properties } from '@/lib/dummyData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  Star,
  MessageCircle,
  Phone,
  Home,
  Calendar,
  MapPin,
  Mail,
  ChevronRight,
} from 'lucide-react';

export default function ProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find user by ID or use the first user as fallback
  const userProfile = users.find((u) => u.id === id) || users[0];

  const userReviews = reviews.filter((r) => r.targetId === userProfile.id);

  // If owner/agent, get their properties
  const userProperties = properties.filter((p) => userProfile.listedProperties?.includes(p.id));

  const handleChat = () => {
    navigate('/chat');
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Profile Header */}
      <div className="bg-primary px-6 pt-16 pb-32">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-white md:flex-row">
          <Avatar className="size-32 border-4 border-white/20 shadow-2xl">
            <AvatarImage src={userProfile.avatar} />
            <AvatarFallback className="text-primary bg-white text-4xl font-bold">
              {userProfile.name.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="mb-2 flex flex-col items-center gap-3 md:flex-row">
              <h1 className="text-4xl font-extrabold">{userProfile.name}</h1>
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-bold tracking-widest uppercase">
                {userProfile.role}
              </span>
            </div>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-white/80 md:justify-start">
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

          <div className="flex min-w-[200px] flex-col gap-3">
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="mx-auto -mt-16 max-w-4xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Left Column - Stats & Info */}
          <div className="space-y-6 md:col-span-1">
            <Card className="overflow-hidden rounded-3xl border-none shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-muted-foreground mb-4 text-xs font-bold tracking-wider uppercase">
                  Verification
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">ID Verified</span>
                    <span className="font-bold text-green-600">Yes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Phone Verified</span>
                    <span className="font-bold text-green-600">Yes</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Properties Managed</span>
                    <span className="font-bold">{userProfile.listedProperties?.length || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="from-primary to-primary/80 overflow-hidden rounded-3xl border-none bg-gradient-to-br text-white shadow-xl">
              <CardContent className="flex flex-col items-center p-6 text-center">
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-white/20 text-2xl font-bold">
                  {userReviews.length > 0
                    ? (
                      userReviews.reduce((acc, r) => acc + r.rating, 0) / userReviews.length
                    ).toFixed(1)
                    : '0'}
                </div>
                <h3 className="mb-1 font-bold">Average Rating</h3>
                <p className="text-xs text-white/70">Based on {userReviews.length} reviews</p>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Listings & Reviews */}
          <div className="space-y-8 md:col-span-2">
            {/* Properties Listed (for Owners/Agents) */}
            {userProfile.role !== 'renter' && (
              <section>
                <div className="mb-4 flex items-end justify-between px-2">
                  <h2 className="text-xl font-bold">
                    Listings by {userProfile.name.split(' ')[0]}
                  </h2>
                  <span className="text-primary text-xs font-bold">
                    {userProperties.length} total
                  </span>
                </div>
                <div className="space-y-4">
                  {userProperties.map((property) => (
                    <div
                      key={property.id}
                      className="group bg-card border-border/40 flex cursor-pointer gap-4 rounded-2xl border p-3 transition-all hover:shadow-lg"
                      onClick={() => navigate(`/property/${property.id}`)}
                    >
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                        <img
                          src={property.image}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 py-1">
                        <h4 className="group-hover:text-primary font-bold transition-colors">
                          {property.title}
                        </h4>
                        <p className="text-muted-foreground mb-2 text-xs">{property.location}</p>
                        <div className="text-primary font-extrabold">{property.price}</div>
                      </div>
                      <div className="self-center pr-2">
                        <ChevronRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  ))}
                  {userProperties.length === 0 && (
                    <p className="text-muted-foreground px-2 text-sm italic">
                      No active listings at the moment.
                    </p>
                  )}
                </div>
              </section>
            )}

            {/* Reviews Section */}
            <section>
              <h2 className="mb-4 px-2 text-xl font-bold">User Reviews</h2>
              <div className="space-y-4">
                {userReviews.map((review) => (
                  <Card
                    key={review.id}
                    className="border-border/40 overflow-hidden rounded-2xl shadow-sm"
                  >
                    <CardContent className="p-6">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="size-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-bold">
                              {review.author.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-bold">{review.author}</div>
                            <div className="text-muted-foreground text-[10px]">{review.date}</div>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={
                                i < review.rating ? 'fill-[#D97745] text-[#D97745]' : 'text-muted'
                              }
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-foreground/80 text-sm leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </CardContent>
                  </Card>
                ))}
                {userReviews.length === 0 && (
                  <p className="text-muted-foreground px-2 text-sm italic">No reviews yet.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10" />
    </div>
  );
}
