import { useParams } from 'react-router';
import { properties } from '@/lib/dummyData';
import PropertyHero from '@/features/property/components/PropertyHero';
import PropertyContent from '@/features/property/components/PropertyContent';
import BookingCard from '@/features/property/components/BookingCard';
import OwnerCard from '@/features/property/components/OwnerCard';
import MapSection from '@/features/property/components/MapSection';
import Reviews from '@/features/property/components/Reviews';

export default function PropertyDetails() {
  const { id } = useParams();

  // Find property from dummy data or use the first one as fallback for demo
  const property = properties.find((p) => p.id === id) || properties[0];

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
