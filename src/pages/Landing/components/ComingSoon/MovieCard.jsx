import { Link } from 'react-router';
import { Badge, BellIcon, Button } from '@/components';
import { cn } from '@/helpers';
import { getReleaseLabel } from './helpers';

const MovieCard = ({ movie, className, ...rest }) => {
  const [genre] = movie.genres;

  return (
    <Link
      to={`/movies/${movie.slug}`}
      {...rest}
      className={cn(
        'flex w-[calc(100%*470/1588)] shrink-0 items-center gap-3.75 rounded-card bg-card p-3 inset-ring inset-ring-transparent shadow-card hover:inset-ring-raised',
        className
      )}
    >
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="h-poster-h w-poster-w rounded-poster object-cover"
      />

      <div className="flex shrink-0 flex-col justify-between gap-5 self-stretch pr-15">
        <div className="flex flex-col items-start gap-1.75">
          <p className="text-xs leading-none font-semibold text-red uppercase">
            {getReleaseLabel(movie.releaseDate)}
          </p>

          <div className="flex flex-col items-start gap-1.25">
            <h3 className="text-lg leading-none font-semibold">{movie.title}</h3>
            <p className="text-sm leading-body text-secondary">
              {genre.name} · {movie.runtimeMinutes} min
            </p>
          </div>

          <Badge className="px-1.75 py-1 leading-none" title={movie.ageRating.description}>
            {movie.ageRating.code}
          </Badge>
        </div>

        <Button
          as="span"
          variant="outline"
          className="h-7 w-24.25 text-xs font-semibold"
        >
          <BellIcon />
          Notify Me
        </Button>
      </div>
    </Link>
  );
};

export default MovieCard;
