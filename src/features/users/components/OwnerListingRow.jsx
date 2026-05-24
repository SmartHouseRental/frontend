import { useNavigate } from 'react-router';
import { ChevronRight, Home } from 'lucide-react';
import { formatListingPrice } from '../hooks/useOwnerProfile';

/**
 * Vertical (horizontal row) property card for owner profile listings.
 */
export default function OwnerListingRow({ listing }) {
  const navigate = useNavigate();

  const title = listing.title || 'Property';
  const location = listing.location || 'Addis Ababa';
  const price = formatListingPrice(listing.price);
  const image =
    listing.image || 'https://via.placeholder.com/160x120?text=Property';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => navigate(`/property/${listing.id}`)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(`/property/${listing.id}`);
        }
      }}
      className="group bg-card border-border/40 flex cursor-pointer gap-4 rounded-2xl border p-3 transition-all hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-muted">
        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Home size={24} />
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
        <h4 className="truncate font-bold transition-colors group-hover:text-primary">
          {title}
        </h4>
        <p className="text-muted-foreground mb-1 truncate text-xs">{location}</p>
        <p className="text-primary font-extrabold text-sm">{price}</p>
      </div>
      <div className="flex shrink-0 items-center self-center pr-1">
        <ChevronRight className="text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
    </div>
  );
}
