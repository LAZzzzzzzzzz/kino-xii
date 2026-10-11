import { Link } from 'react-router';
import { cn } from '@/helpers';
import { getMovieMeta, getTitleParts, getTrailing } from './helpers';

const SearchResultRow = ({ movie, query, onSelect }) => {
  const trailing = getTrailing(movie);

  return (
    <Link
      to={`/movies/${movie.slug}`}
      onClick={onSelect}
      className="flex h-18 items-center gap-3.5 rounded-[0.625rem] py-2 pr-5 pl-2.5 transition-colors duration-150 ease-out hover:bg-card"
    >
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="h-14 w-10 shrink-0 rounded-md object-cover"
      />

      <div className="flex min-w-0 flex-col gap-0.75">
        <p className="truncate text-sm font-semibold">
          {getTitleParts(movie.title, query).map((part, index) => (
            <span
              key={`${part.text}-${index}`}
              className={cn(part.isMatch ? 'text-primary' : 'text-secondary')}
            >
              {part.text}
            </span>
          ))}
        </p>

        <p className="truncate text-xs leading-body text-secondary">
          {getMovieMeta(movie)}
        </p>
      </div>

      <span
        className={cn(
          'ml-auto shrink-0 text-sm font-semibold',
          trailing.className
        )}
      >
        {trailing.label}
      </span>
    </Link>
  );
};

export default SearchResultRow;
