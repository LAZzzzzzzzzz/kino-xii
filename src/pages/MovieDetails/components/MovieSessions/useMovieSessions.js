import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MOVIE_SESSIONS_QUERY_KEY } from '@/config';
import { useAuth } from '@/context';
import { getMovieSessionsRequest } from '@/services';
import {
  countSessions,
  getDateOptions,
  getInitialDate,
  getRestrictionNotice,
} from './helpers';

export const useMovieSessions = (movie) => {
  const { user, isAuthenticated } = useAuth();
  const dateOptions = getDateOptions(movie.availableDates);
  const [selectedDate, setSelectedDate] = useState(() =>
    getInitialDate(dateOptions)
  );

  const {
    data: venues = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: [MOVIE_SESSIONS_QUERY_KEY, { slug: movie.slug, selectedDate }],
    queryFn: () => getMovieSessionsRequest(movie.slug, selectedDate),
    select: (response) => response.data.data,
    enabled: !movie.isComingSoon,
  });

  const selectedOption = dateOptions.find(
    (option) => option.value === selectedDate
  );

  return {
    isComingSoon: movie.isComingSoon,
    dateOptions,
    selectedDate,
    selectedLabel: selectedOption?.label,
    selectDate: setSelectedDate,
    venues,
    sessionCount: countSessions(venues),
    restrictionNotice: getRestrictionNotice(
      movie,
      isAuthenticated ? user : null
    ),
    isPending,
    isError,
  };
};
