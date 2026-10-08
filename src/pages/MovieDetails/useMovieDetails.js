import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { MOVIE_QUERY_KEY } from '@/config';
import { getMovieRequest } from '@/services';

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

  return { movie, isPending, isError };
};
