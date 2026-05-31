import { Link } from 'react-router';
import { MapPin, BedDouble, Bath, Maximize2, Eye, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PropertyStatusBadge } from './PropertyStatusBadge';

/**
 * Enterprise property listing card for grid views.
 */
export function PropertyCard({
  id,
  title,
  address,
  image,
  price,
  currency = 'ETB',
  status,
  bedrooms,
  bathrooms,
  area,
  areaUnit = 'm²',
  views = 0,
  detailPath,
  editPath,
  onDelete,
  menuItems,
  index = 0,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.06 }}
      className={cn('group', className)}
    >
      <div className="overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Link to={detailPath || `#`} className="relative block aspect-[16/10] overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="grid-pattern flex size-full items-center justify-center bg-muted">
              <Maximize2 size={32} className="text-muted-foreground/30" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          {status && (
            <div className="absolute top-3 left-3">
              <PropertyStatusBadge status={status} />
            </div>
          )}
          <div className="absolute right-3 bottom-3 left-3">
            <p className="truncate text-sm font-semibold text-white">{title}</p>
            {address && (
              <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-white/80">
                <MapPin size={10} className="shrink-0" />
                {address}
              </p>
            )}
          </div>
        </Link>

        <div className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-primary text-lg font-bold tabular-nums">
              {price?.toLocaleString?.() ?? price} {currency}
              <span className="text-muted-foreground text-xs font-normal">/mo</span>
            </p>
            {views > 0 && (
              <span className="text-muted-foreground flex items-center gap-1 text-xs">
                <Eye size={12} />
                {views.toLocaleString()}
              </span>
            )}
          </div>

          <div className="text-muted-foreground mb-4 flex items-center gap-3 text-xs">
            {bedrooms != null && (
              <span className="flex items-center gap-1">
                <BedDouble size={12} /> {bedrooms}
              </span>
            )}
            {bathrooms != null && (
              <span className="flex items-center gap-1">
                <Bath size={12} /> {bathrooms}
              </span>
            )}
            {area != null && (
              <span className="flex items-center gap-1">
                <Maximize2 size={12} /> {area} {areaUnit}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {detailPath && (
              <Link to={detailPath} className="flex-1">
                <Button variant="outline" size="sm" className="w-full text-xs">
                  View Details
                </Button>
              </Link>
            )}
            {(editPath || onDelete || menuItems) && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon-sm" className="shrink-0">
                    <MoreVertical size={14} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  {menuItems}
                  {editPath && (
                    <DropdownMenuItem asChild>
                      <Link to={editPath}>Edit Property</Link>
                    </DropdownMenuItem>
                  )}
                  {onDelete && (
                    <DropdownMenuItem
                      className="text-destructive focus:text-destructive"
                      onClick={onDelete}
                    >
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PropertyCard;
