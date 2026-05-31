import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { exploreApi } from '../api';

export const semanticSearchKeys = {
  all: ['semantic-search'],
  list: (params) => [...semanticSearchKeys.all, params],
};

export function useSemanticSearch(params, enabled = true) {
  const query = params?.query?.trim();

  return useQuery({
    queryKey: semanticSearchKeys.list(params),
    queryFn: () =>
      exploreApi.semanticSearch({
        query,
        page: params.page,
        limit: params.limit,
        currency: params.currency || 'ETB',
      }),
    enabled: enabled && Boolean(query),
    placeholderData: keepPreviousData,
    select: (response) => ({
      data: response?.data?.properties ?? [],
      meta: response?.data?.meta,
    }),
  });
}
