import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { FEATURED_MOVIES_QUERY_KEY } from '@/config';
import { getFeaturedMoviesRequest } from '@/services';

export const useFeaturedMovies = () => {
  const {
    data: movies = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: [FEATURED_MOVIES_QUERY_KEY],
    queryFn: getFeaturedMoviesRequest,
    select: (response) => response.data.data,
  });

  return { movies, isPending, isError };
};

export const useHero = () => {
  const { movies, isPending, isError } = useFeaturedMovies();
  const [activeIndex, setActiveIndex] = useState(0);

  const step = (direction) => {
    setActiveIndex(
      (index) => (index + direction + movies.length) % movies.length
    );
  };

  const showPrevious = () => step(-1);

  const showNext = () => step(1);

  const movie = movies[activeIndex];

  const segments = movies.map((_, index) => index === activeIndex);

  return { movie, segments, isPending, isError, showPrevious, showNext };
};
