import { cn } from '@/helpers';
import { getBannerImage } from './helpers';

const HeroBackdrop = ({ movie, isActive }) => {
  return (
    <img
      src={getBannerImage(movie)}
      alt=""
      className={cn(
        'absolute inset-0 size-full object-cover transition-opacity duration-500 ease-out motion-reduce:animate-none motion-reduce:transition-none',
        isActive ? 'animate-hero-backdrop' : 'opacity-0'
      )}
    />
  );
};

export default HeroBackdrop;
