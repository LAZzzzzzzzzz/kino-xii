import { getBannerImage } from './helpers';
import HeroContent from './HeroContent';
import HeroControls from './HeroControls';
import HeroPlaceholder from './HeroPlaceholder';
import { useHero } from './useHero';

const Hero = () => {
  const { movie, segments, isPending, isError, showPrevious, showNext } =
    useHero();

  if (!movie) {
    return <HeroPlaceholder isPending={isPending} isError={isError} />;
  }

  return (
    <section
      aria-label="Featured films"
      className="relative h-190 overflow-clip bg-card"
    >
      <img
        key={movie.id}
        src={getBannerImage(movie)}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-l from-black/8 to-black/80" />

      <HeroContent movie={movie} />
      <HeroControls
        segments={segments}
        onPrevious={showPrevious}
        onNext={showNext}
      />
    </section>
  );
};

export default Hero;
