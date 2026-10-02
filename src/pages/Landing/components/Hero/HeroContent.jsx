import { Link } from 'react-router';
import { Badge, Button, TicketIcon, TimerIcon } from '@/components';
import { getPremiereLabel } from './helpers';

const HeroContent = ({ movie }) => {
  return (
    <div className="absolute inset-x-gutter bottom-44.75 flex max-w-145 flex-col items-start gap-3.75">
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
