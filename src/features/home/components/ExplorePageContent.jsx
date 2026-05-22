import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ActiveFilters from './ActiveFilters';
import { FilterSidebar } from '@/features/explore/components/FilterSidebar';
import { SortBar } from '@/features/explore/components/SortBar';
import { PropertyListingsSection } from '@/features/explore/components/PropertyListingsSection';
import { useProperties } from '@/features/property/hooks/useProperties';
import { useExploreFilters } from '@/features/explore/hooks/useExploreFilters';

export default function ExplorePageContent() {
    const {
        filters,
        apiParams,
        activeFilterChips,
        applyFilters,
        clearFilters,
        removeFilterChip,
        setPage,
        setSort,
        searchParams,
        setSearchParams,
    } = useExploreFilters();

    const initialView = searchParams.get('view') === 'map' ? 'map' : 'grid';
    const [viewMode, setViewMode] = useState(initialView);

    const {
        data: propertiesData,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useProperties(apiParams);

    const properties = propertiesData?.data || [];
    const meta = propertiesData?.meta;
    const isInitialLoading = isLoading && !propertiesData;
    const isListUpdating = isFetching && !isInitialLoading;

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
            <SearchBar defaultValue={filters.q} className="w-full" />

            {activeFilterChips.length > 0 && (
                <ActiveFilters
                    filters={activeFilterChips}
                    onRemove={removeFilterChip}
                    onClearAll={clearFilters}
                />
            )}

            <div className="flex flex-col gap-8 md:flex-row">
                <div className={`${viewMode === 'map' ? 'hidden md:block' : ''}`}>
                    <FilterSidebar
                        filters={filters}
                        onApply={applyFilters}
                        onClear={clearFilters}
                    />
                </div>

                <section className="flex min-w-0 flex-1 flex-col gap-6">
                    <SortBar
                        viewMode={viewMode}
                        setViewMode={handleSetViewMode}
                        sort={filters.sort}
                        onSortChange={setSort}
                    />

                    <PropertyListingsSection
                        properties={properties}
                        meta={meta}
                        filters={filters}
                        viewMode={viewMode}
                        isInitialLoading={isInitialLoading}
                        isListUpdating={isListUpdating}
                        isError={isError}
                        error={error}
                        onRetry={() => refetch()}
                        onPageChange={setPage}
                    />
                </section>
            </div>
        </main>
    );
}
