import { Link } from 'react-router';
import { Badge } from '@/components';
import SessionCard from './SessionCard';

const NOTICE_CLASSES =
  'flex w-full overflow-clip rounded-xl bg-tint-orange px-3.25 py-2.25 text-xs leading-body font-semibold text-orange';

const MovieGroup = ({ movie, sessions, restrictionNotice }) => {
  return (
    <article className="flex flex-col gap-3.5 not-last:border-b not-last:border-raised not-last:pb-8">
      <div className="flex items-center gap-4">
        <Link to={`/movies/${movie.slug}`} className="shrink-0">
          <img
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            className="h-20 w-15 rounded-lg object-cover"
          />
        </Link>

        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-3">
            <h2 className="text-lg leading-normal font-extrabold wrap-break-word">
              <Link to={`/movies/${movie.slug}`}>{movie.title}</Link>
            </h2>

            <Badge className="px-2 py-0.5" title={movie.ageRating.description}>
              {movie.ageRating.code}
            </Badge>
          </div>

          <p className="text-sm text-secondary">{movie.runtimeMinutes} min</p>
        </div>
      </div>

      {restrictionNotice && (
        <p className={NOTICE_CLASSES}>{restrictionNotice}</p>
      )}

      <div className="flex gap-3 overflow-x-auto scrollbar-none">
        {sessions.map((session) => (
          <SessionCard
            key={session.id}
            session={session}
            restrictionNotice={restrictionNotice}
          />
        ))}
      </div>
    </article>
  );
};

export default MovieGroup;
