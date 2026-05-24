import { useMemo } from 'react';
import { Loader2, AlertCircle, SearchX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PropertyCard } from '@/features/explore/components/PropertyCard';
import PropertyMap from '@/components/map/PropertyMap';
import { parseLocation } from '@/lib/utils';
import { getLocalizedField } from '@/lib/i18n/getLocalizedField';
import { useLanguage } from '@/contexts/LanguageContext';

function enrichProperties(properties, locale) {
  return properties.map((p) => {
    const coords = parseLocation(p.location);

    const title = getLocalizedField(p.title, locale);
    const address = getLocalizedField(p.address, locale);
    const price = p.price && typeof p.price === 'object' ? p.price.value : p.price;
    const currency =
      p.price && typeof p.price === 'object' ? p.price.currency || 'ETB' : 'ETB';
    const area = p.area && typeof p.area === 'object' ? p.area.value : p.area;
    const category = getLocalizedField(p.category, locale);
    const type = getLocalizedField(p.type, locale) || category;

    return {
      ...p,
      lat: coords?.lat || 9.0128,
      lng: coords?.lng || 38.7508,
      titleStr: title || 'Property Details',
      addressStr: address || p.location || 'Addis Ababa, Ethiopia',
      image:
        p.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
      priceStr: `${price} ${currency}`,
      beds: p.bedrooms,
      baths: p.bathrooms,
      size: `${area} sqm`,
      statusStr:
        p.status === 'AVAILABLE' || p.status === 'available'
          ? 'Available'
          : p.status,
      typeStr: type || 'Villa',
      category: category || 'Property',
    };
  });
}

export function PropertyListingsSection({
  properties = [],
  meta,
  filters,
  viewMode,
  isInitialLoading,
  isListUpdating,
  isError,
  error,
  onRetry,
  onPageChange,
  emptyTitle = 'No properties found',
  emptyDescription = 'Try adjusting your filters to find more properties.',
  errorTitle = 'Failed to load properties',
}) {
  const { locale } = useLanguage();

  const enrichedProperties = useMemo(
    () => enrichProperties(properties, locale),
    [properties, locale],
  );

  const pageStart = meta ? (meta.page - 1) * meta.limit + 1 : 1;
  const pageEnd = meta
    ? Math.min(meta.page * meta.limit, meta.total)
    : enrichedProperties.length;

  if (isInitialLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-2xl border border-dashed">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-2xl border border-dashed py-20 text-center">
        <div className="bg-destructive/10 rounded-full p-4">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        <div className="max-w-md space-y-2">
          <h3 className="text-xl font-bold">{errorTitle}</h3>
          <p className="text-muted-foreground">
            {error?.response?.data?.message ||
              error?.message ||
              'We encountered an error while fetching listings. Please try again.'}
          </p>
        </div>
        <Button variant="outline" onClick={onRetry} className="rounded-xl px-8">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-6">
      {isListUpdating && (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-background/60 backdrop-blur-[1px]"
          aria-live="polite"
          aria-busy="true"
        >
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}

      {viewMode === 'grid' ? (
        <>
          {enrichedProperties.length > 0 ? (
            <div
              className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-opacity duration-200 ${
                isListUpdating ? 'opacity-60' : 'opacity-100'
              }`}
            >
              {enrichedProperties.map((p) => (
                <PropertyCard
                  key={p.id}
                  id={p.id}
                  title={p.titleStr}
                  location={p.addressStr}
                  price={p.priceStr}
                  beds={p.beds}
                  baths={p.baths}
                  size={p.size}
                  image={p.image}
                  rating={p.rating || 0}
                  status={p.statusStr}
                  badge={p.typeStr}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed py-20 text-center">
              <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
                <SearchX className="text-muted-foreground h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold">{emptyTitle}</h3>
              <p className="text-muted-foreground max-w-md text-sm">{emptyDescription}</p>
            </div>
          )}

          {enrichedProperties.length > 0 && meta?.totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-6 border-t pt-6 sm:flex-row">
              <p className="text-muted-foreground text-sm">
                Showing{' '}
                <span className="text-foreground font-bold">
                  {pageStart} - {pageEnd}
                </span>{' '}
                of <span className="text-foreground font-bold">{meta.total}</span>
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors disabled:opacity-50"
                  disabled={filters.page <= 1 || isListUpdating}
                  onClick={() => onPageChange(filters.page - 1)}
                >
                  ‹
                </button>
                <span className="bg-primary flex h-10 min-w-10 items-center justify-center rounded-xl px-2 font-bold text-white">
                  {filters.page}
                </span>
                <button
                  type="button"
                  className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors disabled:opacity-50"
                  disabled={filters.page >= meta.totalPages || isListUpdating}
                  onClick={() => onPageChange(filters.page + 1)}
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div
          className={`border-border h-[calc(100vh-280px)] min-h-[500px] flex-1 overflow-hidden rounded-3xl border shadow-2xl transition-opacity duration-200 ${
            isListUpdating ? 'opacity-60' : 'opacity-100'
          }`}
        >
          <PropertyMap properties={enrichedProperties} mode="full" />
        </div>
      )}
    </div>
  );
}
