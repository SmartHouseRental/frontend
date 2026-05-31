import { Link, useNavigate } from 'react-router';
import { MapPin, BedDouble, Bath, Maximize2, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import HeartButton from '@/features/favorites/components/HeartButton';

export function LuxuryPropertyCard({
  property,
  title,
  address,
  price,
  currency = 'ETB',
  image,
  bedrooms,
  bathrooms,
  area,
  type,
  index = 0,
  perMonthLabel = '/mo',
}) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={() => navigate(`/property/${property.id}`)}
    >
      <div className="overflow-hidden rounded-[24px] border border-border/50 bg-card shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {type && (
            <span className="absolute top-4 left-4 rounded-full text-black px-3 py-1 text-[11px] font-bold tracking-wide uppercase backdrop-blur-sm">
              {type}
            </span>
          )}

          {property && (
            <HeartButton property={property} className="absolute top-4 right-4 z-10" />
          )}

          <Link
            to={`/property/${property.id}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 hover:scale-110"
            aria-label="View property"
          >
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="p-5 md:p-6">
          <div className="mb-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-foreground truncate text-lg font-bold tracking-tight transition-colors group-hover:text-primary">
                {title}
              </h3>
              {address && (
                <p className="text-muted-foreground mt-1 flex items-center gap-1 truncate text-sm">
                  <MapPin size={12} className="shrink-0" />
                  {address}
                </p>
              )}
            </div>
            <p className="text-primary shrink-0 text-lg font-bold tabular-nums">
              {price}
              <span className="text-muted-foreground text-xs font-normal"> {currency}{perMonthLabel}</span>
            </p>
          </div>

          <div className="text-muted-foreground flex items-center gap-4 border-t border-border/40 pt-4 text-sm">
            {bedrooms != null && (
              <span className="flex items-center gap-1.5">
                <BedDouble size={14} /> {bedrooms}
              </span>
            )}
            {bathrooms != null && (
              <span className="flex items-center gap-1.5">
                <Bath size={14} /> {bathrooms}
              </span>
            )}
            {area != null && (
              <span className="flex items-center gap-1.5">
                <Maximize2 size={14} /> {area} m²
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default LuxuryPropertyCard;
