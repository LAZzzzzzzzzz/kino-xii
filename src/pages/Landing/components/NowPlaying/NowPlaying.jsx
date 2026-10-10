import MovieCard from './MovieCard';
import SectionHeader from '../SectionHeader';
import { useNowPlaying } from './useNowPlaying';

const NowPlaying = () => {
  const { movies, isPending, isError } = useNowPlaying();

  return (
    <section
      aria-label="Now playing"
      aria-busy={isPending}
      className="flex flex-col gap-6 px-17.5"
    >
      <SectionHeader title="Now Playing" seeAllTo="/sessions" />

      {isError ? (
        <p className="text-sm text-secondary">
          Now playing films could not be loaded. Please try again later.
        </p>
      ) : (
        <div className="relative overflow-hidden">
          <div className="scrollbar-none flex snap-x snap-mandatory gap-[calc(100%*17/1588)] overflow-x-auto">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="snap-start" />
            ))}
          </div>

          <div className="pointer-events-none absolute -inset-y-14.75 -right-68.75 w-87 bg-page blur-fade" />
        </div>
      )}
    </section>
  );
};

export default NowPlaying;
