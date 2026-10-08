import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { FEATURED_MOVIES_QUERY_KEY } from '@/config';
import { getFeaturedMoviesRequest } from '@/services';
import { getSteppedIndex } from './helpers';

const AUTOPLAY_DELAY = 3500;

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
    setActiveIndex((index) => getSteppedIndex(index, direction, movies.length));
  };

  const showPrevious = () => step(-1);

  const showNext = () => step(1);

  useEffect(() => {
    if (movies.length < 2) {
      return;
    }

    const timeout = setTimeout(() => {
      setActiveIndex((index) => getSteppedIndex(index, 1, movies.length));
    }, AUTOPLAY_DELAY);

    return () => clearTimeout(timeout);
  }, [activeIndex, movies.length]);

  const segments = movies.map((_, index) => index === activeIndex);

  return {
    movies,
    activeIndex,
    segments,
    isPending,
    isError,
    showPrevious,
    showNext,
  };
};
