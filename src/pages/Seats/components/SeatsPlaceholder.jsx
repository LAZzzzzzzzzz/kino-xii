import { cn } from '@/helpers';

const SeatsPlaceholder = ({ isPending, isError }) => {
  return (
    <div className="flex justify-center px-12.75 pt-29.5 pb-65">
      <section
        aria-label="Seat selection"
        aria-busy={isPending}
        className={cn(
          'flex h-149.75 w-286.5 items-center justify-center rounded-modal border border-raised bg-page',
          isPending && 'animate-pulse'
        )}
      >
        {isError && (
          <p className="text-sm text-secondary">
            This seat map could not be loaded. Please try again later.
          </p>
        )}
      </section>
    </div>
  );
};

export default SeatsPlaceholder;
