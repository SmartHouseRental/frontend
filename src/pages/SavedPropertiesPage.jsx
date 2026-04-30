import { useEffect } from 'react';
import { Heart, Eye, MessageCircle, CalendarDays, Trash2, Home, ArrowLeft } from 'lucide-react';
import { useFavorites } from '@/features/favorites/FavoritesContext';
import { useChat } from '@/features/chat/ChatContext';
import { useAuth } from '@/features/users/AuthContext';
import { Link, useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function SavedPropertiesPage() {
  const navigate = useNavigate();
  const { openConversation } = useChat();
  const { isAuthenticated, openLoginModal } = useAuth();
  const { favorites, removeFavorite, markFavoritesAsSeen } = useFavorites();

  useEffect(() => {
    markFavoritesAsSeen();
  }, [markFavoritesAsSeen]);

  return (
    <div className="min-h-screen">
      {/* Hero / Header */}
      <section className="via-background relative border-b bg-gradient-to-br from-[#D97745]/5 to-[#D97745]/10 px-6 py-14 lg:px-20">
        <div className="mx-auto max-w-7xl">
          {/* <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link> */}

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#D97745]/10">
                  <Heart className="h-6 w-6 fill-[#D97745] text-[#D97745]" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">Saved Properties</h1>
              </div>
              <p className="text-muted-foreground ml-[60px]">
                {favorites.length === 0
                  ? "You haven't saved any properties yet."
                  : `You have ${favorites.length} saved ${favorites.length === 1 ? 'property' : 'properties'}.`}
              </p>
            </div>

            {favorites.length > 0 && (
              <Badge
                variant="outline"
                className="self-start border-[#D97745]/30 bg-[#D97745]/5 px-4 py-1.5 text-sm text-[#D97745] sm:self-auto"
              >
                <Heart className="mr-1.5 h-3.5 w-3.5 fill-[#D97745]" />
                {favorites.length} Saved
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-20">
        {favorites.length === 0 ? (
          /* ---- Empty State ---- */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="bg-muted mb-6 flex size-24 items-center justify-center rounded-2xl">
              <Home className="text-muted-foreground h-10 w-10" />
            </div>
            <h2 className="mb-2 text-xl font-bold">No Saved Properties</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Start exploring homes and tap the <Heart className="inline h-4 w-4 text-[#D97745]" />{' '}
              icon to save your favorites here.
            </p>
            <Link to="/explore">
              <Button className="bg-primary text-primary-foreground rounded-xl px-8 py-3 font-bold shadow-lg">
                Explore Listings
              </Button>
            </Link>
          </div>
        ) : (
          /* ---- Saved Grid ---- */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((property) => (
              <Card
                key={property.id}
                className="group border-border/60 relative overflow-hidden border transition-all duration-300 hover:shadow-xl"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Remove button */}
                  <button
                    id={`remove-fav-${property.id}`}
                    onClick={() => removeFavorite(property.id)}
                    className="group/del absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#D97745]/20 backdrop-blur-md transition-all hover:bg-red-500/20"
                    aria-label="Remove from favorites"
                  >
                    <Heart className="h-4.5 w-4.5 fill-[#D97745] text-[#D97745] transition-colors group-hover/del:fill-red-500 group-hover/del:text-red-500" />
                  </button>

                  {/* Price tag */}
                  <div className="absolute bottom-3 left-3 rounded-lg bg-white/90 px-3 py-1 text-sm font-bold backdrop-blur">
                    {property.price}
                    {property.priceUnit && (
                      <span className="text-muted-foreground ml-1 text-xs font-normal">
                        {property.priceUnit}
                      </span>
                    )}
                  </div>

                  {property.badge && (
                    <Badge className="bg-primary text-primary-foreground absolute top-3 left-3 text-xs">
                      {property.badge}
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <CardContent className="p-5">
                  <h3 className="group-hover:text-primary mb-1 text-lg font-bold transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm">
                    {property.location || 'Addis Ababa, Ethiopia'}
                  </p>

                  {/* Stats row */}
                  {(property.beds || property.baths || property.size) && (
                    <div className="text-muted-foreground mb-4 flex gap-4 border-t pt-3 text-xs">
                      {property.beds && <span>{property.beds} Beds</span>}
                      {property.baths && <span>{property.baths} Baths</span>}
                      {property.size && <span>{property.size}</span>}
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="flex gap-2">
                    <Link to={`/property/${property.id}`} className="flex-1">
                      <Button
                        variant="outline"
                        className="border-border/80 hover:bg-primary h-9 w-full gap-1.5 rounded-xl text-xs font-semibold transition-all hover:text-white"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Details
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      className="border-border/80 hover:bg-primary h-9 gap-1.5 rounded-xl text-xs font-semibold transition-all hover:text-white"
                      title="Chat with owner"
                      onClick={() => {
                        if (!isAuthenticated) {
                          openLoginModal();
                          return;
                        }
                        openConversation({
                          propertyId: property.id,
                          propertyTitle: property.title,
                          propertyImage: property.image,
                          ownerName: 'Owner',
                          ownerAvatar: null,
                        });
                        navigate('/chat');
                      }}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      variant="outline"
                      className="border-border/80 h-9 gap-1.5 rounded-xl text-xs font-semibold transition-all hover:bg-[#D97745] hover:text-white"
                      title="Schedule visit"
                    >
                      <CalendarDays className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Subtle background pattern */}
      <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10" />
    </div>
  );
}
