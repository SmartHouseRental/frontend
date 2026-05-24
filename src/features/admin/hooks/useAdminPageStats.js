import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api';
import { adminKeys } from './useAdmin';
import { mapAdminList } from '../adminSanitize';
import { normalizeAdminObject } from '../adminResponse';

/** Property summary from GET /admin/analytics */
export function useAdminPropertyStats() {
  return useQuery({
    queryKey: [...adminKeys.all, 'property-stats'],
    queryFn: () => adminApi.getAnalytics({ range: '30d' }),
    select: (response) => {
      const data = normalizeAdminObject(response);
      const properties = data?.properties || {};
      return {
        available: properties.available ?? 0,
        pending: properties.pending ?? 0,
        rented: properties.rented ?? 0,
        total: properties.total ?? 0,
      };
    },
    staleTime: 60 * 1000,
  });
}

const AGREEMENT_LIMIT = 100;

function countAgreementsByStatus(items = []) {
  const counts = {
    active: 0,
    pending: 0,
    draft: 0,
    terminated: 0,
    other: 0,
    total: items.length,
  };

  for (const agreement of items) {
    const status = agreement?.status;
    if (status === 'completed') counts.active += 1;
    else if (status === 'draft') counts.draft += 1;
    else if (status === 'sent' || status === 'payment_pending') counts.pending += 1;
    else if (status === 'terminated' || status === 'cancelled' || status === 'expired')
      counts.terminated += 1;
    else counts.other += 1;
  }

  return counts;
}

async function fetchAllAgreements() {
  const first = mapAdminList(await adminApi.getAgreements({ page: 1, limit: AGREEMENT_LIMIT }));
  const totalPages = first.meta?.totalPages ?? 1;
  let items = [...(first.items || [])];

  for (let page = 2; page <= totalPages; page += 1) {
    const next = mapAdminList(await adminApi.getAgreements({ page, limit: AGREEMENT_LIMIT }));
    items = items.concat(next.items || []);
  }

  return items;
}

/** Agreement status counts from GET /admin/agreements (all pages) */
export function useAdminAgreementStats() {
  return useQuery({
    queryKey: [...adminKeys.all, 'agreement-stats'],
    queryFn: async () => {
      const items = await fetchAllAgreements();
      return countAgreementsByStatus(items);
    },
    staleTime: 60 * 1000,
  });
}
