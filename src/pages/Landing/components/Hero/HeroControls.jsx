import { cn } from '@/helpers';
import HeroArrow from './HeroArrow';

const HeroControls = ({ segments, onPrevious, onNext }) => {
  return (
    <div className="absolute inset-x-gutter bottom-10.5 flex items-center gap-5">
      <div
        aria-hidden="true"
        className="flex min-w-px flex-1 items-center gap-1.75"
      >
        {segments.map((isActive, index) => (
          <span
            key={index}
            className={cn(
              'h-0.75 min-w-px flex-1 rounded-full bg-primary',
              isActive && 'bg-red'
            )}
          />
        ))}
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <HeroArrow aria-label="Previous banner" onClick={onPrevious} />
        <HeroArrow
          aria-label="Next banner"
          className="rotate-180"
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default HeroControls;
