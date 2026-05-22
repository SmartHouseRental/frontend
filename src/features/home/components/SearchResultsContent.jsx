import { useState, useMemo } from 'react';
import SearchBar from './SearchBar';
import ActiveFilters from './ActiveFilters';
import { FilterSidebar } from '@/features/explore/components/FilterSidebar';
import { SortBar } from '@/features/explore/components/SortBar';
import { PropertyListingsSection } from '@/features/explore/components/PropertyListingsSection';
import { useProperties } from '@/features/property/hooks/useProperties';
import { useExploreFilters } from '@/features/explore/hooks/useExploreFilters';

export default function SearchResultsContent() {
    const {
        filters,
        apiParams,
        activeFilterChips,
        applyFilters,
        clearFilters,
        removeFilterChip,
        setPage,
        setSort,
    } = useExploreFilters();

    const [viewMode, setViewMode] = useState('grid');

    const listApiParams = useMemo(() => {
        if (viewMode === 'map') {
            const { sortBy, order, ...rest } = apiParams;
            return rest;
        }
        return apiParams;
    }, [apiParams, viewMode]);

    const {
        data: propertiesData,
        isLoading,
        isFetching,
        isError,
        error,
        refetch,
    } = useProperties(listApiParams);

    const properties = propertiesData?.data || [];
    const meta = propertiesData?.meta;
    const query = filters.q;
    const isInitialLoading = isLoading && !propertiesData;
    const isListUpdating = isFetching && !isInitialLoading;

    return (
        <main className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 lg:px-12">
            <SearchBar defaultValue={query} className="w-full" />

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
                        {meta?.total ?? properties.length}{' '}
                        {(meta?.total ?? properties.length) === 1 ? 'property' : 'properties'}{' '}
                        found
                    </span>
                </div>

                {activeFilterChips.length > 0 && (
                    <ActiveFilters
                        filters={activeFilterChips}
                        onRemove={removeFilterChip}
                        onClearAll={clearFilters}
                    />
                )}
            </div>

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
                        setViewMode={setViewMode}
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
                        errorTitle="Failed to load results"
                        emptyDescription="Try adjusting your search terms or filters to find more properties. Note: text search is not yet applied by the listings API; use filters to narrow results."
                    />
                </section>
            </div>
        </main>
    );
}
