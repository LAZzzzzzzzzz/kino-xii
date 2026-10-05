import { useQuery } from '@tanstack/react-query';
import { NOW_PLAYING_MOVIES_QUERY_KEY } from '@/config';
import { getNowPlayingMoviesRequest } from '@/services';

export const useNowPlaying = () => {
  const {
    data: movies = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: [NOW_PLAYING_MOVIES_QUERY_KEY],
    queryFn: getNowPlayingMoviesRequest,
    select: (response) => response.data.data,
  });

  return { movies, isPending, isError };
};
