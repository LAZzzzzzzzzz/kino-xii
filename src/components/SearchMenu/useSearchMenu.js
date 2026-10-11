import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { SEARCH_QUERY_KEY } from '@/config';
import { searchMoviesRequest } from '@/services';
import { getPanelState } from './helpers';

const DEBOUNCE_MS = 250;

export const useSearchMenu = () => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(
      () => setDebouncedQuery(query.trim()),
      DEBOUNCE_MS
    );

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsidePointer = (event) => {
      if (!containerRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', closeOnOutsidePointer);

    return () =>
      document.removeEventListener('pointerdown', closeOnOutsidePointer);
  }, [isOpen]);

  const { data: movies = [], isFetching } = useQuery({
    queryKey: [SEARCH_QUERY_KEY, { query: debouncedQuery }],
    queryFn: () => searchMoviesRequest(debouncedQuery),
    select: (response) => response.data.data,
    enabled: isOpen && Boolean(debouncedQuery),
    placeholderData: keepPreviousData,
  });

  const clear = () => {
    setQuery('');
    setDebouncedQuery('');
    inputRef.current?.focus();
  };

  return {
    containerRef,
    inputRef,
    query,
    searchedQuery: debouncedQuery,
    movies,
    isOpen,
    isSearching: isFetching,
    panelState: getPanelState({
      query: debouncedQuery,
      movies,
      isSearching: isFetching,
    }),
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    clear,
    changeQuery: (event) => {
      setQuery(event.target.value);
      setIsOpen(true);
    },
    closeOnEscape: (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
  };
};
