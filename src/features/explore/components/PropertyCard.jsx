import { useNavigate } from 'react-router';
import { Star } from 'lucide-react';
import HeartButton from '@/features/favorites/components/HeartButton';

export function PropertyCard(props) {
  const navigate = useNavigate();
  // Build a property object with an id for the favorites system
  const property = {
    id: props.id || props.title.toLowerCase().replace(/\s+/g, '-'),
    title: props.title,
    location: props.location,
    price: props.price,
    priceUnit: '/ month',
    beds: props.beds,
    baths: props.baths,
    size: props.size,
    image: props.image,
    rating: props.rating,
    status: props.status,
    badge: props.badge,
  };

  return (
    <div
      className="group cursor-pointer overflow-hidden rounded-xl border shadow-sm transition hover:shadow-lg"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <div className="relative h-64">
        {props.badge && (
          <span className="text-primary absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs">
            {props.badge}
          </span>
        )}

        {/* Favorites heart button */}
        <HeartButton property={property} className="absolute top-4 right-4 z-10" />

        <img
          src={props.image}
          alt={props.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">{props.title}</h3>
            <p className="text-muted-foreground text-sm">{props.location}</p>
          </div>
          <div className="text-right">
            <span className="text-primary text-lg font-bold">{props.price}</span>
            <span className="text-muted-foreground text-xs">/ month</span>
          </div>
        </div>

        <div className="my-3 flex items-center gap-4 border-y py-3 text-xs">
          <span>{props.beds} Beds</span>
          <span>{props.baths} Baths</span>
          <span>{props.size}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(parseFloat(props.rating))
                    ? 'text-primary h-4 w-4'
                    : 'text-muted h-4 w-4'
                }
              />
            ))}
            <span className="ml-1 text-xs">({props.rating})</span>
          </div>
          <span className="text-xs font-bold text-green-600">{props.status}</span>
        </div>
      </div>
    </div>
  );
}
