import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { CURRENT_USER_QUERY_KEY } from '@/config';
import { useAuth } from '@/context';
import { isMovieNotified, recordNotifiedMovie } from '@/helpers';
import { notifyMovieRequest } from '@/services';

export const useNotifyMovie = (movie) => {
  const queryClient = useQueryClient();
  const { user, requireAuth } = useAuth();
  const [hasJustNotified, setHasJustNotified] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: () => notifyMovieRequest(movie.slug),
    onSuccess: () => {
      const currentUser = queryClient.getQueryData([CURRENT_USER_QUERY_KEY]);

      recordNotifiedMovie(currentUser?.id, movie.slug);
      setHasJustNotified(true);
    },
  });

  return {
    isNotified: hasJustNotified || isMovieNotified(user?.id, movie.slug),
    isPending,
    notify: () => requireAuth(mutate),
  };
};
