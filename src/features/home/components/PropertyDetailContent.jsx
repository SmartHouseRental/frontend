import { useParams } from 'react-router';
import { useState } from 'react';
import { properties } from '@/lib/dummyData';
import PropertyHero from '@/features/property/components/PropertyHero';
import PropertyContent from '@/features/property/components/PropertyContent';
import BookingCard from '@/features/property/components/BookingCard';
import OwnerCard from '@/features/property/components/OwnerCard';
import MapSection from '@/features/property/components/MapSection';
import Reviews from '@/features/property/components/Reviews';
import RatingBreakdown from './RatingBreakdown';
import SimilarProperties from './SimilarProperties';
import { Badge } from '@/components/ui/badge';
import {
    Video,
    BedDouble,
    Bath,
    Square,
    Armchair,
    Home,
    Star,
} from 'lucide-react';

export default function PropertyDetailContent() {
    const { id } = useParams();
    const property = properties.find((p) => p.id === id) || properties[0];

    return (
        <div className="min-h-screen">
            <main className="mx-auto max-w-7xl px-6 py-8">
                <PropertyHero property={property} />

                {/* Quick info tags */}
                <div className="mb-8 flex flex-wrap gap-3">
                    <InfoTag icon={Home} label={property.type || 'Villa'} />
                    <InfoTag icon={BedDouble} label={`${property.beds} Beds`} />
                    <InfoTag icon={Bath} label={`${property.baths} Baths`} />
                    <InfoTag icon={Square} label={property.size} />
                    <InfoTag icon={Armchair} label={property.furnishing || 'Furnished'} />
                    {property.rating && (
                        <InfoTag icon={Star} label={`${property.rating} (${property.reviewCount} reviews)`} />
                    )}
                    {property.videoUrl && (
                        <div className="bg-primary/10 text-primary flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
                            <Video className="h-3.5 w-3.5" />
                            Video Tour
                        </div>
                    )}
                </div>

                {/* Amenities tags */}
                {property.amenities && (
                    <div className="mb-8">
                        <h4 className="text-muted-foreground mb-3 text-xs font-bold uppercase tracking-wider">
                            Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {property.amenities.map((amenity) => (
                                <Badge key={amenity} variant="secondary" className="rounded-full px-3 py-1 text-xs">
                                    {amenity}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex flex-col gap-12 lg:flex-row">
                    <div className="lg:w-2/3">
                        {/* Description */}
                        {property.description && (
                            <section className="mb-12">
                                <h3 className="mb-4 text-2xl font-bold">About This Property</h3>
                                <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                            </section>
                        )}

                        <PropertyContent property={property} />
                    </div>

                    <div className="lg:w-1/3">
                        <BookingCard property={property} />
                    </div>
                </div>

                <OwnerCard property={property} />
                <MapSection property={property} />

                {/* Rating breakdown + Reviews */}
                <section className="mb-12">
                    <h3 className="mb-6 text-2xl font-bold">Ratings & Reviews</h3>
                    <RatingBreakdown
                        rating={property.rating || 4.8}
                        reviewCount={property.reviewCount || 42}
                    />
                    <div className="mt-10">
                        <Reviews property={property} />
                    </div>
                </section>

                <SimilarProperties currentId={property.id} />
            </main>

            <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10" />
        </div>
    );
}

function InfoTag({ icon: Icon, label }) {
    return (
        <div className="bg-muted/50 text-foreground flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
            <Icon className="text-primary h-3.5 w-3.5" />
            {label}
        </div>
    );
}
