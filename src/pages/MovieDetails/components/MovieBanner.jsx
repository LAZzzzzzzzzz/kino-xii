import { Badge, TimerIcon } from '@/components';

const MovieBanner = ({ movie }) => {
  return (
    <section
      aria-label={movie.title}
      className="relative h-141.75 overflow-clip bg-card"
    >
      <img
        src={movie.backdropUrl ?? movie.posterUrl}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />

      <div className="absolute inset-0 bg-page/20 backdrop-blur-scrim" />

      <div className="absolute top-38 left-15 flex items-end gap-8.5">
        <img
          src={movie.posterUrl}
          alt={`${movie.title} poster`}
          className="h-93.5 w-72.25 shrink-0 rounded-poster object-cover shadow-poster"
        />

        <div className="flex w-145 flex-col items-start gap-3.75 py-2.25">
          <Badge className="px-2.5">
            {movie.isComingSoon ? 'COMING SOON' : 'NOW PLAYING'}
          </Badge>

          <div className="flex w-full flex-col items-start gap-5">
            <div className="flex w-full flex-col items-start gap-3.75">
              <h1 className="w-full text-display font-extrabold wrap-break-word uppercase">
                {movie.title}
              </h1>
              <p className="w-140 text-sm leading-body">{movie.synopsis}</p>
            </div>

            <div className="flex items-start gap-1.75">
              <Badge className="px-2.5" title={movie.ageRating.description}>
                {movie.ageRating.code}
              </Badge>
              <Badge variant="white" className="px-2.5">
                <TimerIcon />
                {movie.runtimeMinutes} Min
              </Badge>
              {movie.formats.map((format) => (
                <Badge key={format.id} variant="white" className="px-2.5">
                  {format.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieBanner;
