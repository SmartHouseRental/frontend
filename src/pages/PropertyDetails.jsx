import { useParams } from 'react-router';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useProperty } from '@/features/property/hooks/useProperty';
import { adaptProperty } from '@/features/property/utils/propertyAdapter';
import PropertyHero from '@/features/property/components/PropertyHero';
import PropertyContent from '@/features/property/components/PropertyContent';
import BookingCard from '@/features/property/components/BookingCard';
import OwnerCard from '@/features/property/components/OwnerCard';
import MapSection from '@/features/property/components/MapSection';
import Reviews from '@/features/property/components/Reviews';

export default function PropertyDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { data: rawProperty, isLoading, isError, error } = useProperty(id);

  const property = rawProperty ? adaptProperty(rawProperty, i18n.language) : null;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">{t('propertyDetail.notFoundTitle')}</h2>
          <p className="text-muted-foreground">
            {error?.message || t('propertyDetail.notFoundDesc')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-6 py-8">
        <PropertyHero property={property} />

        <div className="flex flex-col gap-12 lg:flex-row">
          <PropertyContent property={property} />

          <div className="lg:w-1/3">
            <BookingCard property={property} />
          </div>
        </div>

        <OwnerCard property={property} />
        <MapSection property={property} />
        <Reviews property={property} />
      </main>

      <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10"></div>
    </div>
  );
}
