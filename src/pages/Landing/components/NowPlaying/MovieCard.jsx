import { Link } from 'react-router';
import { Badge, Button } from '@/components';
import { cn } from '@/helpers';

const MovieCard = ({ movie, className, ...rest }) => {
  const [genre] = movie.genres;

  return (
    <article
      {...rest}
      className={cn(
        'group flex h-113 w-[calc(100%*260/1588)] shrink-0 flex-col gap-2.5 rounded-card bg-card p-3 inset-ring inset-ring-transparent shadow-card transition-[width,box-shadow] duration-300 ease-linear hover:w-[calc(100%*447/1588)] hover:inset-ring-raised motion-reduce:transition-none',
        className
      )}
    >
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="min-h-0 w-full flex-1 rounded-poster object-cover"
      />

      <div className="flex flex-col items-start gap-1.75">
        <h3 className="w-full text-lg leading-normal font-extrabold wrap-break-word">
          {movie.title}
        </h3>
        <p className="text-xs leading-body text-secondary">
          {genre.name} · {movie.runtimeMinutes} min
        </p>
        <Badge className="px-1.75 py-1" title={movie.ageRating.description}>
          {movie.ageRating.code}
        </Badge>
      </div>

      <div className="-mt-2.5 grid grid-rows-[0fr] pr-5 transition-[grid-template-rows,margin-top] duration-300 ease-linear group-hover:mt-0 group-hover:grid-rows-[1fr] motion-reduce:transition-none">
        <p className="overflow-hidden text-xs leading-body text-secondary">
          {movie.synopsis}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold">From ₾ {movie.fromPrice}</p>
        <Button as={Link} to={`/movies/${movie.slug}`} className="py-2.5">
          Buy Ticket
        </Button>
      </div>
    </article>
  );
};

export default MovieCard;
