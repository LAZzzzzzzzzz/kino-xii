import { useQuery } from '@tanstack/react-query';
import { COMING_SOON_MOVIES_QUERY_KEY } from '@/config';
import { getComingSoonMoviesRequest } from '@/services';

export const useComingSoon = () => {
  const {
    data: movies = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: [COMING_SOON_MOVIES_QUERY_KEY],
    queryFn: getComingSoonMoviesRequest,
    select: (response) => response.data.data,
  });

  return { movies, isPending, isError };
};
