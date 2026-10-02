import { cn } from '@/helpers';

const HeroPlaceholder = ({ isPending, isError }) => {
  return (
    <section
      aria-label="Featured films"
      aria-busy={isPending}
      className={cn(
        'flex h-190 items-center justify-center bg-card',
        isPending && 'animate-pulse'
      )}
    >
      {isError && (
        <p className="text-sm text-secondary">
          Featured films could not be loaded. Please try again later.
        </p>
      )}
    </section>
  );
};

export default HeroPlaceholder;
