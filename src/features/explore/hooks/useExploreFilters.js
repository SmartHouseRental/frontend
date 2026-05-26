import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  applyFilterPatch,
  buildApiParams,
  clearFilterParams,
  getActiveFilterChips,
  parseExploreFilters,
} from '../utils/propertyFilters';

export function useExploreFilters() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(() => parseExploreFilters(searchParams), [searchParams]);
  const apiParams = useMemo(() => buildApiParams(filters), [filters]);
  const activeFilterChips = useMemo(() => getActiveFilterChips(filters, t), [filters, t]);

  const applyFilters = useCallback(
    (patch) => {
      setSearchParams((prev) => applyFilterPatch(prev, patch), { replace: true });
    },
    [setSearchParams],
  );

  const clearFilters = useCallback(() => {
    setSearchParams((prev) => clearFilterParams(prev), { replace: true });
  }, [setSearchParams]);

  const removeFilterChip = useCallback(
    (id) => {
      if (id === 'q') {
        setSearchParams(
          (prev) => {
            const next = new URLSearchParams(prev);
            next.delete('q');
            return next;
          },
          { replace: true },
        );
        return;
      }
      if (id === 'price') {
        applyFilters({ minPrice: '', maxPrice: '' });
        return;
      }
      applyFilters({ [id]: '' });
    },
    [applyFilters, setSearchParams],
  );

  const setPage = useCallback(
    (page) => {
      setSearchParams((prev) => applyFilterPatch(prev, { page }, { resetPage: false }), {
        replace: true,
      });
    },
    [setSearchParams],
  );

  const setSort = useCallback(
    (sort) => {
      setSearchParams((prev) => applyFilterPatch(prev, { sort }, { resetPage: false }), {
        replace: true,
      });
    },
    [setSearchParams],
  );

  return {
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
  };
}
