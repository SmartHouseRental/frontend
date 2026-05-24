import { Heart } from "lucide-react";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { useNavigate } from "react-router";
import { useFavorites, useToggleFavorite } from "../hooks/useFavorites";
import { cn } from "@/lib/utils";

/**
 * Premium heart toggle button for saving properties to favorites.
 * Handles both public floating layout and detail hero button layout.
 *
 * @param {{ property: object, variant?: string, showLabel?: boolean, className?: string }} props
 */
export default function HeartButton({ property, variant = "", showLabel = false, className = "" }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const { data: favorites } = useFavorites();
  const toggleFavorite = useToggleFavorite();

  const isSaved = Array.isArray(favorites) && favorites.some((fav) => fav.id === property?.id);

  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!property?.id) return;
    
    toggleFavorite.mutate({
      propertyId: property.id,
      isFavorite: isSaved,
      property
    });
  };

  const isOutlineWithText = variant === "outline-with-text";

  if (isOutlineWithText) {
    return (
      <button
        id={`heart-btn-${property?.id}`}
        onClick={handleClick}
        disabled={toggleFavorite.isPending}
        className={cn(
          "flex items-center gap-2 border bg-background font-semibold transition-all duration-300 rounded-xl hover:bg-muted text-sm",
          isSaved 
            ? "text-[#D97745] border-[#D97745]/20 bg-[#D97745]/5 hover:bg-[#D97745]/10" 
            : "text-foreground border-border/60 hover:bg-muted",
          className
        )}
        aria-label={isSaved ? "Remove from favorites" : "Save to favorites"}
      >
        <Heart
          className={cn(
            "h-4.5 w-4.5 transition-all duration-300",
            isSaved
              ? "fill-[#D97745] text-[#D97745] scale-110"
              : "fill-transparent text-foreground group-hover/heart:text-[#D97745]"
          )}
          strokeWidth={isSaved ? 2.5 : 2}
        />
        {showLabel && <span>{isSaved ? "Saved" : "Save"}</span>}
      </button>
    );
  }

  return (
    <button
      id={`heart-btn-${property?.id}`}
      onClick={handleClick}
      disabled={toggleFavorite.isPending}
      className={cn(
        "heart-btn group/heart relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
        isSaved
          ? "bg-[#D97745]/20 backdrop-blur-md shadow-lg"
          : "bg-white/20 backdrop-blur-sm hover:bg-white/40",
        className
      )}
      aria-label={isSaved ? "Remove from favorites" : "Save to favorites"}
    >
      <Heart
        className={cn(
          "h-5 w-5 transition-all duration-300",
          isSaved
            ? "fill-[#D97745] text-[#D97745] scale-110"
            : "fill-transparent text-white group-hover/heart:text-[#D97745]"
        )}
        strokeWidth={isSaved ? 2.5 : 2}
      />

      {/* Pulse ring on saved state */}
      {isSaved && (
        <span className="absolute inset-0 rounded-full animate-heart-ping bg-[#D97745]/30 pointer-events-none" />
      )}
    </button>
  );
}
