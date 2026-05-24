import { lazy, Suspense } from 'react';
import {
  ZoomIn,
  Home,
  Bed,
  Bath,
  MapPin,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Star,
  Calendar,
  Eye,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate, useParams } from 'react-router';
import { useAdminProperty } from '@/features/admin/hooks/useAdmin';
import {
  useAdminPropertyReviews,
  useAdminPropertyReviewStats,
} from '@/features/admin/hooks/useAdminPropertyReviews';
import { formatPersonName } from '@/features/admin/mappers';
import EmptyState from '@/components/EmptyState';
import {
  formatLocalizedText,
  formatPropertyCategory,
  formatPropertyPrice,
  getPropertyStatusMeta,
} from '@/features/admin/mappers';
import TableSkeleton from '@/components/TableSkeleton';
import ErrorState from '@/components/ErrorState';

const PropertyMap = lazy(() => import('@/components/map/PropertyMap'));

function getPropertyCoordinates(property) {
  const loc = property?.location;
  if (!loc || typeof loc !== 'object') return null;
  const lat = parseFloat(loc.lat ?? loc.latitude);
  const lng = parseFloat(loc.lng ?? loc.longitude ?? loc.lon);
  if (Number.isFinite(lat) && Number.isFinite(lng) && (lat !== 0 || lng !== 0)) {
    return { lat, lng };
  }
  return null;
}

function GallerySection({ images, title }) {
  const primaryImage = images?.[0];
  const thumbnailImages = images?.slice(0, 4) || [];

  return (
    <div className="space-y-3">
      <div className="group border-border/60 relative aspect-[16/10] overflow-hidden rounded-xl border bg-black shadow-md">
        <img
          src={primaryImage || 'https://via.placeholder.com/960x600?text=No+Image'}
          alt={title || 'Property image'}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute right-3 bottom-3 flex gap-2 opacity-90">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md"
            aria-label="Zoom"
          >
            <ZoomIn className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {thumbnailImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {thumbnailImages.map((image, idx) => (
            <div
              key={`thumb-${idx}`}
              className="border-border/60 relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border"
            >
              <img src={image} alt={`Thumbnail ${idx + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyInfoCard({ property, reviewStats }) {
  const statusMeta = getPropertyStatusMeta(property?.status);
  const title = property.displayTitle ?? formatLocalizedText(property?.title, 'Property');
  const address =
    property.displayAddress ??
    formatLocalizedText(property?.address || property?.location, 'Address not available');
  const price = property.displayPrice ?? formatPropertyPrice(property?.price, '-');
  const categoryLabel =
    property.categoryType ?? formatPropertyCategory(property?.category);
  const avgRating = reviewStats?.averageRating ?? 0;
  const reviewCount = reviewStats?.totalReviews ?? 0;
  const listedAt = property?.createdAt
    ? new Date(property.createdAt).toLocaleDateString()
    : 'Recently';

  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            variant="outline"
            className="border-green-200 bg-green-50 text-green-700 hover:bg-green-50"
          >
            <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
            {statusMeta.label}
          </Badge>
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700">
            <Home className="mr-1.5 h-3.5 w-3.5" />
            {categoryLabel}
          </Badge>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-2">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">{title}</h1>
            <p className="text-muted-foreground flex items-start gap-2 text-sm">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{address}</span>
            </p>
            <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                Listed {listedAt}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {property.viewCount ?? 0} views
              </span>
              {reviewCount > 0 && (
                <span className="flex items-center gap-1">
                  <Star className="fill-amber-400 text-amber-400 h-3.5 w-3.5" />
                  {avgRating.toFixed(1)} ({reviewCount} reviews)
                </span>
              )}
            </div>
          </div>
          <div className="shrink-0 text-left sm:text-right">
            <p className="text-muted-foreground text-[10px] font-semibold uppercase tracking-wider">
              Monthly rent
            </p>
            <p className="text-primary text-2xl font-extrabold sm:text-3xl">{price}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function PropertyMapSection({ property, address }) {
  const coords = getPropertyCoordinates(property);

  if (!coords) {
    return (
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Location</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground flex items-start gap-2 text-sm">
            <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
            {address}
          </p>
          <p className="text-muted-foreground mt-3 text-xs">
            Map preview unavailable — no coordinates on this listing.
          </p>
        </CardContent>
      </Card>
    );
  }

  const mapProperty = {
    id: property.id,
    title: property.title,
    lat: coords.lat,
    lng: coords.lng,
    images: property.images,
    price: property.price,
  };

  return (
    <Card className="border-border/60 overflow-hidden shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Location</CardTitle>
        <p className="text-muted-foreground flex items-start gap-2 text-sm">
          <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
          {address}
        </p>
      </CardHeader>
      <CardContent className="p-0 pb-4 px-4">
        <div className="h-56 overflow-hidden rounded-xl border sm:h-64">
          <Suspense
            fallback={
              <div className="bg-muted/40 flex h-full items-center justify-center text-sm text-muted-foreground">
                Loading map…
              </div>
            }
          >
            <PropertyMap
              properties={[mapProperty]}
              center={[coords.lat, coords.lng]}
              zoom={15}
              mode="preview"
            />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}

function DescriptionSection({ property }) {
  const description =
    property.displayDescription ??
    formatLocalizedText(property?.description, 'No description available');
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Description</CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground space-y-3 pt-0 text-sm leading-relaxed">
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}

function SpecificationsCard({ property }) {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Specifications</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-0">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-muted/30 flex items-center gap-3 rounded-lg border px-3 py-3">
            <Bed className="text-primary h-5 w-5" />
            <div>
              <p className="font-semibold">{property.bedrooms ?? '—'}</p>
              <p className="text-muted-foreground text-xs">Bedrooms</p>
            </div>
          </div>
          <div className="bg-muted/30 flex items-center gap-3 rounded-lg border px-3 py-3">
            <Bath className="text-primary h-5 w-5" />
            <div>
              <p className="font-semibold">{property.bathrooms ?? '—'}</p>
              <p className="text-muted-foreground text-xs">Bathrooms</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground text-xs">Listing ID</p>
            <p className="mt-0.5 truncate font-medium">{property.id}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Views</p>
            <p className="text-primary mt-0.5 font-bold">{property.viewCount ?? 0}</p>
          </div>
        </div>

        {Array.isArray(property.amenities) && property.amenities.length > 0 && (
          <div>
            <p className="text-muted-foreground mb-2 text-xs font-semibold uppercase">Amenities</p>
            <div className="flex flex-wrap gap-1.5">
              {property.amenities.map((item, idx) => (
                <Badge key={`amenity-${idx}`} variant="secondary" className="text-xs font-normal">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OwnerCard({ property }) {
  if (!property.owner) return null;
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Owner</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-semibold">
          {property.owner.displayName || formatPersonName(property.owner)}
        </p>
        {property.owner.email && (
          <p className="text-muted-foreground mt-1 text-sm">{property.owner.email}</p>
        )}
        {property.owner.phone && (
          <p className="text-muted-foreground text-sm">{property.owner.phone}</p>
        )}
      </CardContent>
    </Card>
  );
}

function PropertyReviewsSection({ propertyId }) {
  const { data: reviews = [], isLoading } = useAdminPropertyReviews(propertyId);
  const { data: stats } = useAdminPropertyReviewStats(propertyId);

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base font-semibold">
          <span className="flex items-center gap-2">
            <MessageSquare className="text-primary h-4 w-4" />
            Reviews ({stats?.totalReviews ?? reviews.length})
          </span>
          {stats?.totalReviews > 0 && (
            <span className="text-muted-foreground flex items-center gap-1 text-xs font-medium">
              <Star className="fill-amber-400 text-amber-400 h-3.5 w-3.5" />
              {stats.averageRating.toFixed(1)} avg
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {isLoading ? (
          <p className="text-muted-foreground text-sm">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <EmptyState title="No reviews yet" description="This property has no published reviews." />
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="rounded-lg border p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold">{review.reviewerLabel}</p>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={12}
                      className={
                        s <= review.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-muted-foreground/30'
                      }
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">{review.comment}</p>
              <p className="text-muted-foreground mt-1 text-xs">
                {review.createdAt ? new Date(review.createdAt).toLocaleString() : ''}
              </p>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function PropertiesDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: property, isLoading, isError, refetch } = useAdminProperty(id);
  const { data: reviewStats } = useAdminPropertyReviewStats(id);

  if (isLoading) {
    return (
      <main className="bg-background min-h-screen px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <TableSkeleton rows={4} columns={2} showHeader={false} />
        </div>
      </main>
    );
  }

  if (isError || !property) {
    return (
      <main className="bg-background min-h-screen px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <ErrorState title="Failed to load property details" onRetry={refetch} />
        </div>
      </main>
    );
  }

  const address =
    property.displayAddress ??
    formatLocalizedText(property.address || property.location, 'Address not available');

  return (
    <main className="bg-background min-h-screen pb-12">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <div className="mb-6 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="hover:bg-muted flex h-9 w-9 items-center justify-center rounded-full border bg-card shadow-sm transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold tracking-tight sm:text-xl">Property Details</h1>
            <p className="text-muted-foreground text-xs">Admin listing review</p>
          </div>
        </div>

        <div className="space-y-5">
          <GallerySection
            images={property.images}
            title={property.displayTitle ?? formatLocalizedText(property.title, 'Property')}
          />

          <PropertyInfoCard property={property} reviewStats={reviewStats} />

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="space-y-5 lg:col-span-2">
              <DescriptionSection property={property} />
              <PropertyMapSection property={property} address={address} />
              <PropertyReviewsSection propertyId={property.id} />
            </div>
            <div className="space-y-5">
              <SpecificationsCard property={property} />
              <OwnerCard property={property} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default PropertiesDetailPage;
