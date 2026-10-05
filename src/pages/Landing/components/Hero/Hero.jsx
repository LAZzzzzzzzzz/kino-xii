import HeroBackdrop from './HeroBackdrop';
import HeroContent from './HeroContent';
import HeroControls from './HeroControls';
import HeroPlaceholder from './HeroPlaceholder';
import { useHero } from './useHero';

const Hero = () => {
  const {
    movies,
    activeIndex,
    segments,
    isPending,
    isError,
    showPrevious,
    showNext,
    pause,
    resume,
  } = useHero();

  if (!movies.length) {
    return <HeroPlaceholder isPending={isPending} isError={isError} />;
  }

  return (
    <section
      aria-label="Featured films"
      className="relative h-190 overflow-clip bg-card"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
    >
      {movies.map((movie, index) => (
        <HeroBackdrop
          key={movie.id}
          movie={movie}
          isActive={index === activeIndex}
        />
      ))}

      <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-black/8 to-black/80" />

      {movies.map((movie, index) => (
        <HeroContent
          key={movie.id}
          movie={movie}
          isActive={index === activeIndex}
        />
      ))}

      <HeroControls
        segments={segments}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </section>
  );
};

export default Hero;
