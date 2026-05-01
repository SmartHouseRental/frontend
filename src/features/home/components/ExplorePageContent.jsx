import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import SearchBar from './SearchBar';
import ActiveFilters from './ActiveFilters';
import { FilterSidebar } from '@/features/explore/components/FilterSidebar';
import { PropertyCard } from '@/features/explore/components/PropertyCard';
import { SortBar } from '@/features/explore/components/SortBar';
import PropertyMap from '@/components/map/PropertyMap';
import { properties } from '@/lib/dummyData';

export default function ExplorePageContent() {
    const [searchParams, setSearchParams] = useSearchParams();
    const initialView = searchParams.get('view') === 'map' ? 'map' : 'grid';
    const [viewMode, setViewMode] = useState(initialView);

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

                    {viewMode === 'grid' ? (
                        <>
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {properties.map((p) => (
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

                            {/* Pagination */}
                            <div className="flex flex-col items-center justify-between gap-6 border-t pt-6 sm:flex-row">
                                <p className="text-muted-foreground text-sm">
                                    Showing <span className="text-foreground font-bold">1 - {properties.length}</span>{' '}
                                    of <span className="text-foreground font-bold">{properties.length}</span>
                                </p>

                                <div className="flex items-center gap-2">
                                    <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                                        ‹
                                    </button>
                                    <button className="bg-primary h-10 w-10 rounded-xl font-bold text-white">
                                        1
                                    </button>
                                    <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                                        2
                                    </button>
                                    <span className="text-muted-foreground px-2">…</span>
                                    <button className="hover:bg-muted flex h-10 w-10 items-center justify-center rounded-xl border transition-colors">
                                        ›
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="border-border h-[calc(100vh-280px)] min-h-[500px] flex-1 overflow-hidden rounded-3xl border shadow-2xl">
                            <PropertyMap properties={properties} mode="full" />
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
