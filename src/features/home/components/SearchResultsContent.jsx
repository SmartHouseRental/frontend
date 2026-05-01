import { useState } from 'react';
import { useSearchParams } from 'react-router';
import SearchBar from './SearchBar';
import ActiveFilters from './ActiveFilters';
import { FilterSidebar } from '@/features/explore/components/FilterSidebar';
import { PropertyCard } from '@/features/explore/components/PropertyCard';
import { SortBar } from '@/features/explore/components/SortBar';
import PropertyMap from '@/components/map/PropertyMap';
import { properties } from '@/lib/dummyData';
import { SearchX } from 'lucide-react';

export default function SearchResultsContent() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [viewMode, setViewMode] = useState('grid');

    // Dummy active filters from query
    const [filters, setFilters] = useState(() => {
        const defaultFilters = [];
        if (query) {
            defaultFilters.push({ id: 'query', label: 'Search', value: query });
        }
        // Simulate some filters from URL
        const location = searchParams.get('location');
        if (location) {
            defaultFilters.push({ id: 'location', label: 'Location', value: location });
        }
        const type = searchParams.get('type');
        if (type) {
            defaultFilters.push({ id: 'type', label: 'Type', value: type });
        }
        return defaultFilters;
    });

    const handleRemoveFilter = (id) => {
        setFilters((prev) => prev.filter((f) => f.id !== id));
    };

    const handleClearAll = () => {
        setFilters([]);
    };

    // Simple dummy filtering based on query
    const filteredProperties = query
        ? properties.filter(
            (p) =>
                p.title.toLowerCase().includes(query.toLowerCase()) ||
                p.location.toLowerCase().includes(query.toLowerCase()) ||
                p.type?.toLowerCase().includes(query.toLowerCase()) ||
                p.description?.toLowerCase().includes(query.toLowerCase())
        )
        : properties;

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
                        {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
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

                    {viewMode === 'grid' ? (
                        <>
                            {filteredProperties.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {filteredProperties.map((p) => (
                                        <PropertyCard
                                            key={p.id}
                                            id={p.id}
                                            title={p.title}
                                            location={p.location}
                                            price={p.price.replace(' /mo', '')}
                                            beds={p.beds}
                                            baths={p.baths}
                                            size={p.size}
                                            image={p.image}
                                            rating={p.rating}
                                            status={p.furnishing}
                                            badge={p.tag}
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
                            {filteredProperties.length > 0 && (
                                <div className="flex flex-col items-center justify-between gap-6 border-t pt-6 sm:flex-row">
                                    <p className="text-muted-foreground text-sm">
                                        Showing{' '}
                                        <span className="text-foreground font-bold">
                                            1 - {filteredProperties.length}
                                        </span>{' '}
                                        of{' '}
                                        <span className="text-foreground font-bold">{filteredProperties.length}</span>
                                    </p>

                                    <div className="flex items-center gap-2">
                                        <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                                            ‹
                                        </button>
                                        <button className="bg-primary h-10 w-10 rounded-xl font-bold text-white">
                                            1
                                        </button>
                                        <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                                            ›
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="border-border h-[calc(100vh-280px)] min-h-[500px] flex-1 overflow-hidden rounded-3xl border shadow-2xl">
                            <PropertyMap properties={filteredProperties} mode="full" />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
