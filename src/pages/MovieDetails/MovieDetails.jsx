import {
  MovieBanner,
  MovieDetailsPanel,
  MoviePlaceholder,
  MovieSessions,
} from './components';
import { useMovieDetails } from './useMovieDetails';

const MovieDetails = () => {
  const { movie, isPending, isError } = useMovieDetails();

  if (!movie) {
    return <MoviePlaceholder isPending={isPending} isError={isError} />;
  }

  return (
    <>
      <MovieBanner movie={movie} />

      <div className="flex items-start gap-2.5 px-12.75 pt-8.5 pb-65">
        <MovieSessions movie={movie} />
        <MovieDetailsPanel movie={movie} />
      </div>
    </>
  );
};

export default MovieDetails;
