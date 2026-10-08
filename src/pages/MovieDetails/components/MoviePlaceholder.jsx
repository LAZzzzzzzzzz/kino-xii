import { cn } from '@/helpers';

const MoviePlaceholder = ({ isPending, isError }) => {
  return (
    <section
      aria-label="Film details"
      aria-busy={isPending}
      className={cn(
        'flex h-141.75 items-center justify-center bg-card',
        isPending && 'animate-pulse'
      )}
    >
      {isError && (
        <p className="text-sm text-secondary">
          This film could not be loaded. Please try again later.
        </p>
      )}
    </section>
  );
};

export default MoviePlaceholder;
