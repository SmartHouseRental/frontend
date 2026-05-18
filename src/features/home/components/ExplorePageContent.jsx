import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import SearchBar from './SearchBar';
import { FilterSidebar } from '@/features/explore/components/FilterSidebar';
import { PropertyCard } from '@/features/explore/components/PropertyCard';
import { SortBar } from '@/features/explore/components/SortBar';
import PropertyMap from '@/components/map/PropertyMap';
import { useProperties } from '@/features/property/hooks/useProperties';
import { parseLocation } from '@/lib/utils';
import { Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ExplorePageContent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialView = searchParams.get('view') === 'map' ? 'map' : 'grid';
    const [viewMode, setViewMode] = useState(initialView);

    const { data: propertiesData, isLoading, isError, error } = useProperties({
        search: searchParams.get('q') || '',
        status: 'available',
        page: 1,
        limit: 12
    });

    const properties = propertiesData?.data || [];

    useEffect(() => {
        const view = searchParams.get('view');
        if (view === 'map' || view === 'grid') {
            setViewMode(view);
        }
    }, [searchParams]);

    const handleSetViewMode = (mode) => {
        setViewMode(mode);
        setSearchParams((prev) => {
            prev.set('view', mode);
            return prev;
        });
    };

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    const enrichedProperties = properties.map(p => {
        const coords = parseLocation(p.location);
        
        // Handle new nested object structure from API
        const title = (p.title && typeof p.title === 'object') ? (p.title.en || p.title.am) : p.title;
        const address = (p.address && typeof p.address === 'object') ? (p.address.en || p.address.am) : p.address;
        const price = (p.price && typeof p.price === 'object') ? p.price.value : p.price;
        const currency = (p.price && typeof p.price === 'object') ? (p.price.currency || 'ETB') : 'ETB';
        const area = (p.area && typeof p.area === 'object') ? p.area.value : p.area;
        const type = (p.type && typeof p.type === 'object') ? (p.type.en || p.type.am) : p.type;

        return {
            ...p,
            lat: coords?.lat || 9.0128,
            lng: coords?.lng || 38.7508,
            titleStr: title || "Property Details",
            addressStr: address || p.location || "Addis Ababa, Ethiopia",
            image: p.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
            priceStr: `${price} ${currency}`,
            beds: p.bedrooms,
            baths: p.bathrooms,
            size: `${area} sqm`,
            statusStr: p.status === 'AVAILABLE' || p.status === 'available' ? 'Available' : p.status,
            typeStr: type,
        };
    });

    return (
        <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:px-12">
            {/* Search bar */}
            <SearchBar defaultValue={searchParams.get('q') || ''} className="w-full" />

            {/* Main layout */}
            <div className="flex flex-col gap-8 md:flex-row">
                <div className={`${viewMode === 'map' ? 'hidden md:block' : ''}`}>
                    <FilterSidebar />
                </div>

                <section className="flex min-w-0 flex-1 flex-col gap-6">
                    <SortBar viewMode={viewMode} setViewMode={handleSetViewMode} />

                    {isError ? (
                        <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
                            <div className="bg-destructive/10 rounded-full p-4">
                                <AlertCircle className="h-10 w-10 text-destructive" />
                            </div>
                            <div className="max-w-md space-y-2">
                                <h3 className="text-xl font-bold">Failed to load properties</h3>
                                <p className="text-muted-foreground">
                                    {error?.response?.data?.message || error?.message || 'We encountered an error while fetching the property listings. Please try again.'}
                                </p>
                            </div>
                            <Button 
                                variant="outline" 
                                onClick={() => window.location.reload()}
                                className="rounded-xl px-8"
                            >
                                Retry
                            </Button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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

                            {/* Pagination */}
                            {propertiesData?.meta?.totalPages > 1 && (
                                <div className="flex flex-col items-center justify-between gap-6 border-t pt-6 sm:flex-row">
                                    <p className="text-muted-foreground text-sm">
                                        Showing <span className="text-foreground font-bold">1 - {enrichedProperties.length}</span>{' '}
                                        of <span className="text-foreground font-bold">{propertiesData.meta.total}</span>
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors disabled:opacity-50" disabled>
                                            ‹
                                        </button>
                                        <button className="bg-primary h-10 w-10 rounded-xl font-bold text-white">
                                            1
                                        </button>
                                        <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors disabled:opacity-50" disabled>
                                            ›
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="border-border h-[calc(100vh-280px)] min-h-[500px] flex-1 overflow-hidden rounded-3xl border shadow-2xl">
                            <PropertyMap properties={enrichedProperties} mode="full" />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
