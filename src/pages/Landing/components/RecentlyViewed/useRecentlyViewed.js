import { useState } from 'react';
import { getRecentlyViewedMovies } from '@/helpers';

export const useRecentlyViewed = () => {
  const [movies] = useState(getRecentlyViewedMovies);

  return movies;
};
