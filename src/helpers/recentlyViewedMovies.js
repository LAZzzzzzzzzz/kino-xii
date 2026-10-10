const STORAGE_KEY = 'kino-xii:recently-viewed-movies';
const MAX_AGE_MS = 2 * 60 * 60 * 1000;
const MAX_MOVIES = 10;

const getMovieKey = (movie) => String(movie.id ?? movie.slug);

const getStoredEntries = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');

    if (!Array.isArray(stored)) {
      return [];
    }

    const cutoff = Date.now() - MAX_AGE_MS;

    const entries = stored
      .filter(
        (entry) =>
          entry?.movie?.slug &&
          Number.isFinite(entry.viewedAt) &&
          entry.viewedAt > cutoff
      )
      .sort((first, second) => second.viewedAt - first.viewedAt)
      .slice(0, MAX_MOVIES);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));

    return entries;
  } catch {
    return [];
  }
};

export const getRecentlyViewedMovies = () => {
  return getStoredEntries().map(({ movie }) => movie);
};

export const recordRecentlyViewedMovie = (movie) => {
  if (!movie?.slug) {
    return;
  }

  const storedMovie = {
    id: movie.id,
    slug: movie.slug,
    title: movie.title,
    posterUrl: movie.posterUrl,
    runtimeMinutes: movie.runtimeMinutes,
    genres: movie.genres?.slice(0, 1).map(({ name }) => ({ name })) ?? [],
    ageRating: {
      code: movie.ageRating.code,
      description: movie.ageRating.description,
    },
  };
  const movieKey = getMovieKey(storedMovie);
  const entries = getStoredEntries().filter(
    (entry) => getMovieKey(entry.movie) !== movieKey
  );

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(
        [{ movie: storedMovie, viewedAt: Date.now() }, ...entries].slice(
          0,
          MAX_MOVIES
        )
      )
    );
  } catch {
    return;
  }
};
