import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useProperty } from '@/features/property/hooks/useProperty';
import { adaptProperty } from '@/features/property/utils/propertyAdapter';
import { parseLocation } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import PropertyHero from '@/features/property/components/PropertyHero';
import PropertyContent from '@/features/property/components/PropertyContent';
import BookingCard from '@/features/property/components/BookingCard';
import OwnerCard from '@/features/property/components/OwnerCard';
import MapSection from '@/features/property/components/MapSection';
import Reviews from '@/features/property/components/Reviews';
import RatingBreakdown from './RatingBreakdown';
import SimilarProperties from './SimilarProperties';
import { useTrackInteraction } from '@/features/recommendation/hooks/useRecommendations';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    BedDouble,
    Bath,
    Square,
    Armchair,
    Home,
    Star,
    Loader2,
    AlertCircle,
} from 'lucide-react';

export default function PropertyDetailContent() {
    const { id } = useParams();
    const { locale, t } = useLanguage();
    const { data: rawProperty, isLoading, isError, error } = useProperty(id);
    const { mutate: trackInteraction } = useTrackInteraction();

    const property = rawProperty ? adaptProperty(rawProperty, locale) : null;

    useEffect(() => {
        if (id) {
            trackInteraction({ propertyId: id, type: 'VIEW' });
        }
    }, [id, trackInteraction]);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
                <div className="bg-destructive/10 rounded-full p-4">
                    <AlertCircle className="h-10 w-10 text-destructive" />
                </div>
                <div className="max-w-md space-y-2">
                    <h3 className="text-xl font-bold">{t('propertyDetail.failedLoadDetails')}</h3>
                    <p className="text-muted-foreground">
                        {error?.response?.data?.message || error?.message || t('propertyDetail.genericLoadError')}
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="rounded-xl px-8"
                >
                    {t('propertyDetail.retryLoading')}
                </Button>
            </div>
        );
    }

    if (!property) return null;

    // Parse location for the map
    const coords = parseLocation(property.location);

    const title = property.title || t('propertyHero.propertyDetailsFallback');
    const address = property.address || "Addis Ababa, Ethiopia";
    const description = property.description || '';
    const category = property.category || t('property');
    const type = property.type || category;
    const priceValue = property.price || 0;
    const priceCurrency = property.currency || 'ETB';
    const areaValue = property.area || 0;

    const enrichedProperty = {
        ...property,
        title,
        description,
        address,
        category,
        type,
        price: priceValue,
        currency: priceCurrency,
        area: areaValue,
        lat: coords?.lat || 9.0128,
        lng: coords?.lng || 38.7508,
        titleStr: title,
        addressStr: address,
        descriptionStr: description,
        typeStr: type,
        priceStr: `${priceValue} ${priceCurrency}`,
        beds: property.bedrooms || 0,
        baths: property.bathrooms || 0,
        size: `${areaValue} ${t('sqm')}`,
        furnishing: property.furnishingStatus || t('propertyContent.familyFriendly'),
        amenities: property.amenities || [],
    };

    return (
        <div className="min-h-screen">
            <main className="mx-auto max-w-7xl px-6 py-8">
                <PropertyHero property={enrichedProperty} />

                {/* Quick info tags */}
                <div className="mb-8 flex flex-wrap gap-3">
                    <InfoTag icon={Home} label={enrichedProperty.type || t('villa')} />
                    <InfoTag icon={BedDouble} label={`${enrichedProperty.beds} ${t('beds')}`} />
                    <InfoTag icon={Bath} label={`${enrichedProperty.baths} ${t('baths')}`} />
                    <InfoTag icon={Square} label={enrichedProperty.size} />
                    <InfoTag icon={Armchair} label={enrichedProperty.furnishing || t('propertyContent.familyFriendly')} />
                    {enrichedProperty.rating && (
                        <InfoTag icon={Star} label={`${enrichedProperty.rating} (${enrichedProperty.reviewCount} ${t('reviews')})`} />
                    )}
                </div>

                {/* Amenities tags */}
                {enrichedProperty.amenities && (
                    <div className="mb-8">
                        <h4 className="text-muted-foreground mb-3 text-xs font-bold uppercase tracking-wider">
                            {t('propertyDetail.amenitiesTitle')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {enrichedProperty.amenities.map((amenity) => (
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
                        {enrichedProperty.description && (
                            <section className="mb-12">
                                <h3 className="mb-4 text-2xl font-bold">{t('propertyDetail.aboutTitle')}</h3>
                                <div className="text-muted-foreground leading-relaxed">
                                    {enrichedProperty.descriptionStr}
                                </div>
                            </section>
                        )}

                        <PropertyContent property={enrichedProperty} />
                    </div>

                    <div className="lg:w-1/3">
                        <BookingCard property={enrichedProperty} />
                    </div>
                </div>

                <OwnerCard property={enrichedProperty} />
                <MapSection property={enrichedProperty} />

                {/* Rating breakdown + Reviews */}
                <section className="mb-12">
                    <h3 className="mb-6 text-2xl font-bold">{t('propertyDetail.ratingsReviewsTitle')}</h3>
                    <RatingBreakdown
                        rating={enrichedProperty.rating || 4.8}
                        reviewCount={enrichedProperty.reviewCount || 42}
                    />
                    <div className="mt-10">
                        <Reviews property={enrichedProperty} />
                    </div>
                </section>

                <SimilarProperties currentId={enrichedProperty.id} />
            </main>

            <div className="ethiopian-pattern pointer-events-none fixed inset-0 -z-10" />
        </div>
    );
}

function InfoTag({ icon, label }) {
    const IconComponent = icon;

    return (
        <div className="bg-muted/50 text-foreground flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold">
            <IconComponent className="text-primary h-3.5 w-3.5" />
            {label}
        </div>
    );
}
