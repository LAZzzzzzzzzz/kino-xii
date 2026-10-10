import { Link } from 'react-router';
import { Badge } from '@/components';

const RecentlyViewedCard = ({ movie }) => {
  const [genre] = movie.genres;

  return (
    <Link
      to={`/movies/${movie.slug}`}
      aria-label={`View ${movie.title}`}
      className="flex h-21.75 w-82 shrink-0 items-center gap-3 rounded-2xl bg-card p-2.5"
    >
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="h-gutter min-w-0 flex-1 rounded-lg object-cover"
      />

      <div className="flex w-52.5 shrink-0 flex-col items-start gap-1">
        <div className="flex flex-col gap-1">
          <h3 className="text-sm leading-normal font-extrabold">
            {movie.title}
          </h3>
          <p className="text-xs leading-body text-secondary">
            {genre?.name} · {movie.runtimeMinutes} min
          </p>
        </div>

        <Badge
          className="px-2 py-1 text-xs leading-normal font-semibold"
          title={movie.ageRating.description}
        >
          {movie.ageRating.code}
        </Badge>
      </div>
    </Link>
  );
};

export default RecentlyViewedCard;
