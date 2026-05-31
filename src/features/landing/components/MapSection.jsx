import PropertyMap from '@/components/map/PropertyMap';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { useProperties } from '@/features/property/hooks/useProperties';
import { parseLocation, cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function MapSection() {
  const { t } = useTranslation();
  const { data: propertiesData, isLoading } = useProperties({
    status: 'available',
    limit: 6,
  });

  const listings = propertiesData?.data || [];

  const enrichedProperties = listings.map((p) => {
    const coords = parseLocation(p.location);
    const title = p.title && typeof p.title === 'object' ? p.title.en || p.title.am : p.title;
    const price = p.price && typeof p.price === 'object' ? p.price.value : p.price;
    const currency = p.price && typeof p.price === 'object' ? p.price.currency || 'ETB' : 'ETB';

    return {
      ...p,
      lat: coords?.lat || 9.0128,
      lng: coords?.lng || 38.7508,
      titleStr: title || t('landing.map.propertyDetails'),
      priceStr: `${price} ${currency}`,
      image: p.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
    };
  });

  const locations = [
    t('landing.map.locations.boleAtlas'),
    t('landing.map.locations.oldAirport'),
    t('landing.map.locations.sarbet'),
    t('landing.map.locations.kazanchis'),
    t('landing.map.locations.cmc'),
    t('landing.map.locations.ayat'),
  ];

  return (
    <section
      className={cn(
        'relative -mx-6 overflow-hidden rounded-t-[3rem] px-6 py-24 lg:px-20',
        'border-t border-border bg-foreground text-background',
        'dark:bg-secondary dark:text-foreground',
      )}
    >
      <div className="relative z-10 mx-auto flex flex-col items-center gap-16 lg:flex-row">
        <div className="lg:w-1/3">
          <h2 className="mb-6 text-4xl leading-tight font-black opacity-50 md:text-5xl">
            {t('landing.map.availableAcross')} <br />
            <span className="italic opacity-100">{t('landing.map.addisAbaba')}</span>
          </h2>
          <p className="mb-10 text-lg leading-relaxed opacity-60">
            {t('landing.map.subtitle')}
          </p>

          <div className="mb-10 grid grid-cols-2 gap-4">
            {locations.map((loc) => (
              <div
                key={loc}
                className="flex cursor-default items-center gap-2 text-sm font-medium opacity-70 transition-opacity hover:opacity-100"
              >
                <div className="size-1.5 rounded-full bg-current" />
                {loc}
              </div>
            ))}
          </div>

          <Button
            size="lg"
            asChild
            className={cn(
              'h-14 rounded-full px-8 text-lg font-bold shadow-xl transition-transform hover:scale-105',
              'bg-background text-foreground shadow-background/20',
              'dark:bg-primary dark:text-primary-foreground dark:shadow-none',
            )}
          >
            <Link to="/explore?view=map">{t('landing.map.exploreFullMap')}</Link>
          </Button>
        </div>

        <div className="relative h-125 w-full overflow-hidden rounded-[2rem] border border-border shadow-2xl ring-8 ring-border/20 lg:w-2/3">
          {isLoading ? (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <PropertyMap properties={enrichedProperties} mode="preview" zoom={12} />
          )}
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-1/2 left-0 z-0 h-96 w-96 -translate-y-1/2 rounded-full bg-background/10 blur-[120px] dark:bg-foreground/5"
        aria-hidden
      />
    </section>
  );
}
