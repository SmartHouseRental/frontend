import { useState } from 'react';
import { useSearchParams } from 'react-router';
import SearchBar from './SearchBar';
import ActiveFilters from './ActiveFilters';
import { FilterSidebar } from '@/features/explore/components/FilterSidebar';
import { PropertyCard } from '@/features/explore/components/PropertyCard';
import { SortBar } from '@/features/explore/components/SortBar';
import PropertyMap from '@/components/map/PropertyMap';
import { SearchX, Loader2 } from 'lucide-react';
import { useProperties } from '@/features/property/hooks/useProperties';
import { parseLocation } from '@/lib/utils';

export default function SearchResultsContent() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [viewMode, setViewMode] = useState('grid');

    // Get real properties from API
    const { data: propertiesData, isLoading, isError, error } = useProperties({
        search: query,
        status: 'available',
        page: 1,
        limit: 12
    });

    const properties = propertiesData?.data || [];

    // Dummy active filters from query (keeping for UI structure)
    const [filters, setFilters] = useState(() => {
        const defaultFilters = [];
        if (query) {
            defaultFilters.push({ id: 'query', label: 'Search', value: query });
        }
        return defaultFilters;
    });

    const handleRemoveFilter = (id) => {
        setFilters((prev) => prev.filter((f) => f.id !== id));
    };

    const handleClearAll = () => {
        setFilters([]);
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
        return {
            ...p,
            lat: coords?.lat || 9.0128,
            lng: coords?.lng || 38.7508,
            titleStr: typeof p.title === 'object' ? p.title.en : p.title,
            image: p.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image',
            priceStr: `${p.price} ETB`,
            beds: p.bedrooms,
            baths: p.bathrooms,
            size: `${p.area} sqm`,
            statusStr: p.status === 'available' ? 'Available' : p.status,
        };
    });

    return (
        <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:px-12">
            {/* Search bar */}
            <SearchBar defaultValue={query} className="w-full" />

            {/* Results header */}
            <div className="flex flex-col gap-3">
                <div className="flex items-baseline justify-between">
                    <h1 className="text-2xl font-bold">
                        {query ? (
                            <>
                                Results for "<span className="text-primary">{query}</span>"
                            </>
                        ) : (
                            'All Properties'
                        )}
                    </h1>
                    <span className="text-muted-foreground text-sm">
                        {enrichedProperties.length} {enrichedProperties.length === 1 ? 'property' : 'properties'} found
                    </span>
                </div>

                <ActiveFilters
                    filters={filters}
                    onRemove={handleRemoveFilter}
                    onClearAll={handleClearAll}
                />
            </div>

            {/* Main layout */}
            <div className="flex flex-col gap-8 md:flex-row">
                <div className={`${viewMode === 'map' ? 'hidden md:block' : ''}`}>
                    <FilterSidebar />
                </div>

                <section className="flex min-w-0 flex-1 flex-col gap-6">
                    <SortBar viewMode={viewMode} setViewMode={setViewMode} />

                    {isError ? (
                        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                            <p className="text-destructive font-medium">Failed to load properties</p>
                            <p className="text-muted-foreground text-sm">{error?.message || 'Please try again later'}</p>
                            <Button variant="outline" onClick={() => window.location.reload()}>Retry</Button>
                        </div>
                    ) : viewMode === 'grid' ? (
                        <>
                            {enrichedProperties.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {enrichedProperties.map((p) => (
                                        <PropertyCard
                                            key={p.id}
                                            id={p.id}
                                            title={p.titleStr}
                                            location={p.address || p.location}
                                            price={p.priceStr}
                                            beds={p.beds}
                                            baths={p.baths}
                                            size={p.size}
                                            image={p.image}
                                            rating={p.rating || 0}
                                            status={p.statusStr}
                                            badge={p.type}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                                    <div className="bg-muted flex h-16 w-16 items-center justify-center rounded-full">
                                        <SearchX className="text-muted-foreground h-8 w-8" />
                                    </div>
                                    <h3 className="text-lg font-bold">No properties found</h3>
                                    <p className="text-muted-foreground max-w-md text-sm">
                                        Try adjusting your search terms or filters to find more properties.
                                    </p>
                                </div>
                            )}

                            {/* Pagination */}
                            {enrichedProperties.length > 0 && propertiesData?.meta?.totalPages > 1 && (
                                <div className="flex flex-col items-center justify-between gap-6 border-t pt-6 sm:flex-row">
                                    <p className="text-muted-foreground text-sm">
                                        Showing{' '}
                                        <span className="text-foreground font-bold">
                                            1 - {enrichedProperties.length}
                                        </span>{' '}
                                        of{' '}
                                        <span className="text-foreground font-bold">{propertiesData.meta.total}</span>
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
