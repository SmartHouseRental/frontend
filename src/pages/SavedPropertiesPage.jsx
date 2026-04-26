import { useEffect } from "react";
import { Heart, Eye, MessageCircle, CalendarDays, Trash2, Home, ArrowLeft } from "lucide-react";
import { useFavorites } from "@/features/favorites/FavoritesContext";
import { useChat } from "@/features/chat/ChatContext";
import { useAuth } from "@/features/users/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <section className="relative py-14 px-6 lg:px-20 border-b bg-gradient-to-br from-[#D97745]/5 via-background to-[#D97745]/10">
        <div className="max-w-7xl mx-auto">
          {/* <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary font-medium mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link> */}

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="size-12 bg-[#D97745]/10 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-[#D97745] fill-[#D97745]" />
                </div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Saved Properties
                </h1>
              </div>
              <p className="text-muted-foreground ml-[60px]">
                {favorites.length === 0
                  ? "You haven't saved any properties yet."
                  : `You have ${favorites.length} saved ${favorites.length === 1 ? "property" : "properties"}.`}
              </p>
            </div>

            {favorites.length > 0 && (
              <Badge
                variant="outline"
                className="self-start sm:self-auto border-[#D97745]/30 text-[#D97745] bg-[#D97745]/5 text-sm px-4 py-1.5"
              >
                <Heart className="h-3.5 w-3.5 mr-1.5 fill-[#D97745]" />
                {favorites.length} Saved
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        {favorites.length === 0 ? (
          /* ---- Empty State ---- */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="size-24 bg-muted rounded-2xl flex items-center justify-center mb-6">
              <Home className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold mb-2">No Saved Properties</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Start exploring homes and tap the{" "}
              <Heart className="inline h-4 w-4 text-[#D97745]" /> icon to save
              your favorites here.
            </p>
            <Link to="/explore">
              <Button className="bg-primary text-primary-foreground rounded-xl px-8 py-3 font-bold shadow-lg">
                Explore Listings
              </Button>
            </Link>
          </div>
        ) : (
          /* ---- Saved Grid ---- */
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((property) => (
              <Card
                key={property.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border border-border/60 relative"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Remove button */}
                  <button
                    id={`remove-fav-${property.id}`}
                    onClick={() => removeFavorite(property.id)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#D97745]/20 backdrop-blur-md flex items-center justify-center transition-all hover:bg-red-500/20 group/del"
                    aria-label="Remove from favorites"
                  >
                    <Heart className="h-4.5 w-4.5 fill-[#D97745] text-[#D97745] group-hover/del:fill-red-500 group-hover/del:text-red-500 transition-colors" />
                  </button>

                  {/* Price tag */}
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-lg text-sm font-bold">
                    {property.price}
                    {property.priceUnit && (
                      <span className="text-xs font-normal text-muted-foreground ml-1">
                        {property.priceUnit}
                      </span>
                    )}
                  </div>

                  {property.badge && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs">
                      {property.badge}
                    </Badge>
                  )}
                </div>

                {/* Details */}
                <CardContent className="p-5">
                  <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                    {property.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {property.location || "Addis Ababa, Ethiopia"}
                  </p>

                  {/* Stats row */}
                  {(property.beds || property.baths || property.size) && (
                    <div className="flex gap-4 text-xs text-muted-foreground border-t pt-3 mb-4">
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
                        className="w-full rounded-xl text-xs font-semibold gap-1.5 h-9 border-border/80 hover:bg-primary hover:text-white transition-all"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Details
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      className="rounded-xl text-xs font-semibold gap-1.5 h-9 border-border/80 hover:bg-primary hover:text-white transition-all"
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
                          ownerName: "Owner",
                          ownerAvatar: null,
                        });
                        navigate("/chat");
                      }}
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      variant="outline"
                      className="rounded-xl text-xs font-semibold gap-1.5 h-9 border-border/80 hover:bg-[#D97745] hover:text-white transition-all"
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
      <div className="fixed inset-0 ethiopian-pattern pointer-events-none -z-10" />
    </div>
  );
}
