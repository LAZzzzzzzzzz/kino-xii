import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { MOVIE_QUERY_KEY } from '@/config';
import { getMovieRequest } from '@/services';
import { recordRecentlyViewedMovie } from '@/helpers';

export const useMovieDetails = () => {
  const { slug } = useParams();

  const {
    data: movie,
    isPending,
    isError,
  } = useQuery({
    queryKey: [MOVIE_QUERY_KEY, { slug }],
    queryFn: () => getMovieRequest(slug),
    select: (response) => response.data.data,
  });

  useEffect(() => {
    if (movie) {
      recordRecentlyViewedMovie(movie);
    }
  }, [movie]);

  return { movie, isPending, isError };
};
