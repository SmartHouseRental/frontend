import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router';
import { Loader2, MapPin, Navigation, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import HeartButton from '@/features/favorites/components/HeartButton';
import { useGeolocation } from '@/features/property/hooks/useGeolocation';
import { useNearbyProperties, DEFAULT_RADIUS_KM } from '@/features/property/hooks/useNearbyProperties';
import { getPropertyCardFields } from '@/features/property/utils/propertyCardHelpers';

function LocationMessage({ icon: Icon, title, description, children }) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-muted/20 px-6 py-12 text-center">
      <div className="flex size-12 items-center justify-center rounded-full bg-muted">
        <Icon className="h-6 w-6 text-muted-foreground" />
      </div>
      <div className="max-w-md space-y-1">
        <p className="font-semibold text-foreground">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

export default function NearMeSection() {
  const navigate = useNavigate();
  const { status: geoStatus, coords, error: geoError, request: requestLocation } =
    useGeolocation({ auto: true });

  const {
    data,
    isLoading: isLoadingProperties,
    isError: isPropertiesError,
    error: propertiesError,
    refetch,
  } = useNearbyProperties({
    lat: coords?.lat,
    lng: coords?.lng,
    radius: DEFAULT_RADIUS_KM,
    limit: 6,
    status: 'available',
    enabled: geoStatus === 'success',
  });

  const listings = data?.properties ?? [];

  const handleRetryProperties = () => {
    refetch().catch(() => {
      toast.error('Could not load nearby properties. Please try again.');
    });
  };

  const renderBody = () => {
    if (geoStatus === 'loading' || geoStatus === 'idle') {
      return (
        <LocationMessage
          icon={Navigation}
          title="Finding your location"
          description="Allow location access when prompted so we can show rentals near you."
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </LocationMessage>
      );
    }

    if (geoStatus === 'denied' || geoStatus === 'unsupported' || geoStatus === 'error') {
      return (
        <LocationMessage
          icon={AlertCircle}
          title={
            geoStatus === 'denied'
              ? 'Location permission needed'
              : 'Location unavailable'
          }
          description={geoError || 'We could not determine your location.'}
        >
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="outline" className="font-semibold" onClick={requestLocation}>
              Try again
            </Button>
            <Button variant="ghost" className="font-semibold text-primary" asChild>
              <Link to="/explore">Browse all listings</Link>
            </Button>
          </div>
        </LocationMessage>
      );
    }

    if (isLoadingProperties) {
      return (
        <div className="flex min-h-[220px] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }

    if (isPropertiesError) {
      const message =
        propertiesError?.response?.data?.message ||
        propertiesError?.message ||
        'Could not load nearby properties.';

      return (
        <LocationMessage
          icon={AlertCircle}
          title="Failed to load nearby homes"
          description={message}
        >
          <Button variant="outline" className="font-semibold" onClick={handleRetryProperties}>
            Retry
          </Button>
        </LocationMessage>
      );
    }

    if (listings.length === 0) {
      return (
        <LocationMessage
          icon={MapPin}
          title="No rentals nearby"
          description={`We could not find available properties within ${DEFAULT_RADIUS_KM} km of your location.`}
        >
          <Button variant="ghost" className="font-semibold text-primary" asChild>
            <Link to="/explore">Explore more areas</Link>
          </Button>
        </LocationMessage>
      );
    }

    return (
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {listings.map((home) => {
          const { title, address, priceValue, priceCurrency, areaValue, type, image } =
            getPropertyCardFields(home);

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
                {home.distance != null && (
                  <Badge className="absolute top-4 right-14 bg-white/95 text-foreground text-xs font-semibold shadow-sm">
                    {home.distance} km
                  </Badge>
                )}
                <HeartButton property={home} className="absolute top-4 right-4 z-10" />
                <div className="absolute bottom-4 left-4 rounded-md bg-white/90 px-3 py-1 text-sm font-bold">
                  {priceValue} {priceCurrency} /mo
                </div>
              </div>

              <CardContent className="p-5">
                <h3 className="group-hover:text-primary mb-1 text-lg font-bold transition-colors line-clamp-1">
                  {title}
                </h3>
                <p className="text-muted-foreground mb-4 text-sm line-clamp-1">{address}</p>

                <div className="text-muted-foreground flex gap-4 border-t pt-3 text-sm">
                  <span>{home.bedrooms} Beds</span>
                  <span>{home.bathrooms} Baths</span>
                  <span>{areaValue} m²</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <section className="px-6 py-16 lg:px-20 bg-muted/20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-extrabold">Near Me</h2>
            <p className="text-muted-foreground">
              Available rentals within {DEFAULT_RADIUS_KM} km of your current location
            </p>
          </div>
          {geoStatus === 'success' && (
            <Button
              variant="outline"
              size="sm"
              className="font-semibold shrink-0"
              onClick={requestLocation}
            >
              <Navigation className="mr-2 h-4 w-4" />
              Refresh location
            </Button>
          )}
        </div>

        {renderBody()}
      </div>
    </section>
  );
}
