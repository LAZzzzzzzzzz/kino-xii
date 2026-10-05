import { Link } from 'react-router';
import { Badge, Button, TicketIcon, TimerIcon } from '@/components';
import { cn } from '@/helpers';
import { getPremiereLabel } from './helpers';

const HeroContent = ({ movie, isActive }) => {
  return (
    <div
      inert={!isActive}
      className={cn(
        'absolute inset-x-gutter bottom-44.75 flex max-w-145 flex-col items-start gap-3.75 transition-opacity duration-150 ease-in motion-reduce:animate-none motion-reduce:transition-none',
        isActive ? 'animate-hero-content' : 'opacity-0'
      )}
    >
      <Badge className="px-2.5">{getPremiereLabel(movie.releaseDate)}</Badge>

      <div className="flex w-full flex-col items-start gap-5">
        <div className="flex w-full flex-col items-start gap-3.75">
          <h1 className="text-display font-extrabold wrap-break-word uppercase">
            {movie.title}
          </h1>

          <div className="flex items-start gap-2">
            <Badge title={movie.ageRating.description}>
              {movie.ageRating.code}
            </Badge>
            <Badge variant="white">
              <TimerIcon />
              {movie.runtimeMinutes} Min
            </Badge>
            {movie.formats.map((format) => (
              <Badge key={format.id} variant="white">
                {format.name}
              </Badge>
            ))}
          </div>

          <p className="max-w-140 text-sm leading-body">{movie.synopsis}</p>
        </div>

        <div className="flex items-start gap-2.5">
          <Button as={Link} to={`/movies/${movie.slug}`}>
            <TicketIcon />
            Buy tickets
          </Button>
          <Button as={Link} to="/sessions" variant="secondary">
            All sessions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;
