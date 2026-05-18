import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import HeartButton from '@/features/favorites/components/HeartButton';
import { useProperties } from '@/features/property/hooks/useProperties';
import { Loader2 } from 'lucide-react';

export default function FeaturedListings() {
  const navigate = useNavigate();
  const { data: propertiesData, isLoading, isError } = useProperties({
    status: 'available',
    limit: 3,
    sortBy: 'createdAt',
    order: 'desc'
  });

  const listings = propertiesData?.data || [];

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
        <p className="text-muted-foreground">Could not load featured listings at this time.</p>
        <Button variant="link" onClick={() => window.location.reload()} className="text-primary font-bold">
          Try Again
        </Button>
      </div>
    );
  }

  if (listings.length === 0) return null;

  return (
    <section className="px-6 py-16 lg:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-extrabold">Featured Family Homes</h2>
            <p className="text-muted-foreground">Hand-picked residences for comfort and security</p>
          </div>
          <Button
            variant="ghost"
            className="text-primary font-bold transition-all hover:translate-x-1"
            asChild
          >
            <Link to="/explore">See all listings →</Link>
          </Button>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {listings.map((home) => {
            const title = (home.title && typeof home.title === 'object') ? (home.title.en || home.title.am) : home.title;
            const address = (home.address && typeof home.address === 'object') ? (home.address.en || home.address.am) : home.address;
            const price = (home.price && typeof home.price === 'object') ? home.price.value : home.price;
            const currency = (home.price && typeof home.price === 'object') ? (home.price.currency || 'ETB') : 'ETB';
            const area = (home.area && typeof home.area === 'object') ? home.area.value : home.area;
            const type = (home.type && typeof home.type === 'object') ? (home.type.en || home.type.am) : home.type;
            const image = home.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image';

            return (
              <Card
                key={home.id}
                className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl"
                onClick={() => navigate(`/property/${home.id}`)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {type && (
                    <Badge className="bg-primary text-primary-foreground absolute top-4 left-4">
                      {type}
                    </Badge>
                  )}

                  {/* Heart button */}
                  <HeartButton property={home} className="absolute top-4 right-4 z-10" />

                  <div className="absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-1 text-sm font-bold">
                    {price} {currency} /mo
                  </div>
                </div>

                <CardContent className="p-5">
                  <h3 className="group-hover:text-primary mb-1 text-lg font-bold transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <p className="text-muted-foreground mb-4 text-sm line-clamp-1">{address || home.location || 'Addis Ababa, Ethiopia'}</p>

                  <div className="text-muted-foreground flex gap-4 border-t pt-3 text-sm">
                    <span>{home.bedrooms} Beds</span>
                    <span>{home.bathrooms} Baths</span>
                    <span>{area} m²</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
