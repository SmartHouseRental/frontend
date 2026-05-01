import { useState } from "react";
import { Heart } from "lucide-react";

/**
 * Animated heart toggle button for property cards.
 * Stub: uses local state only until favorites integration.
 *
 * @param {{ property: object, className?: string }} props
 */
export default function HeartButton({ property, className = "" }) {
  const [saved, setSaved] = useState(false);

  return (
    <button
      id={`heart-btn-${property.id}`}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setSaved((prev) => !prev);
      }}
      className={`heart-btn group/heart w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${saved
          ? "bg-[#D97745]/20 backdrop-blur-md shadow-lg"
          : "bg-white/20 backdrop-blur-sm hover:bg-white/40"
        } ${className}`}
      aria-label={saved ? "Remove from favorites" : "Save to favorites"}
    >
      <Heart
        className={`h-5 w-5 transition-all duration-300 ${saved
            ? "fill-[#D97745] text-[#D97745] scale-110"
            : "fill-transparent text-white group-hover/heart:text-[#D97745]"
          }`}
        strokeWidth={saved ? 2.5 : 2}
      />

      {/* Pulse ring on saved state */}
      {saved && (
        <span className="absolute inset-0 rounded-full animate-heart-ping bg-[#D97745]/30 pointer-events-none" />
      )}
    </button>
  );
}
