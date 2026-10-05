import SectionHeader from '../SectionHeader';
import MovieCard from './MovieCard';
import { useComingSoon } from './useComingSoon';

const ComingSoon = () => {
  const { movies, isPending, isError } = useComingSoon();

  return (
    <section
      aria-label="Coming soon"
      aria-busy={isPending}
      className="flex flex-col pt-10 pb-9"
    >
      <hr className="mb-10 border-t border-tint-white" />

      <div className="flex flex-col px-17.5">
        <SectionHeader
          title="Coming soon..."
          seeAllTo="/sessions"
          className="mb-6"
        />

        {isError ? (
          <p className="text-sm text-secondary">
            Upcoming films could not be loaded. Please try again later.
          </p>
        ) : (
          <div className="relative overflow-hidden">
            <div className="scrollbar-none flex snap-x snap-mandatory gap-[calc(100%*20/1588)] overflow-x-auto">
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  className="snap-start"
                />
              ))}
            </div>

            <div className="pointer-events-none absolute -inset-y-14.75 -right-72.25 w-87 bg-page blur-fade" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ComingSoon;
