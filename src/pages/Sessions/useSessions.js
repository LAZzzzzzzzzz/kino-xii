import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router';
import { SESSIONS_QUERY_KEY } from '@/config';
import { useAuth } from '@/context';
import { getRestrictionNotice } from '@/helpers';
import { useFilterOptions } from '@/hooks';
import { getSessionsRequest } from '@/services';
import {
  countActiveFilters,
  getAvailableFormats,
  getClearedFilters,
  getDateOptions,
  getToggleChanges,
  parseFilters,
  toRequestParams,
  toSearchParams,
} from './helpers';

export const useSessions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated } = useAuth();
  const { data: options } = useFilterOptions();
  const filters = parseFilters(searchParams);

  const { data, isPending, isError } = useQuery({
    queryKey: [SESSIONS_QUERY_KEY, filters],
    queryFn: () => getSessionsRequest(toRequestParams(filters)),
    select: (response) => response.data,
    placeholderData: keepPreviousData,
  });

  const applyChanges = (changes) => {
    setSearchParams(toSearchParams({ ...filters, page: 1, ...changes }));
  };

  const venues = options?.venues ?? [];
  const formats = options?.formats ?? [];
  const groups = (data?.data ?? []).map((group) => ({
    ...group,
    restrictionNotice: getRestrictionNotice(
      group.movie,
      isAuthenticated ? user : null
    ),
  }));

  return {
    filters,
    venues,
    languages: options?.languages ?? [],
    timeBands: options?.timeBands ?? [],
    sorts: options?.sorts ?? [],
    availableFormats: getAvailableFormats(formats, venues, filters.venues),
    dateOptions: getDateOptions(),
    activeCount: countActiveFilters(filters),
    groups,
    meta: data?.meta,
    isPending,
    isError,
    toggleFilter: (key, value) =>
      applyChanges(getToggleChanges({ filters, key, value, venues, formats })),
    selectDate: (date) => applyChanges({ date }),
    selectSort: (sort) => applyChanges({ sort }),
    selectPage: (page) => applyChanges({ page }),
    clearFilters: () => applyChanges(getClearedFilters()),
  };
};
