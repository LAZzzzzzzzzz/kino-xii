import { ArrowLeftIcon } from '@/components';
import { cn } from '@/helpers';

const HeroArrow = ({ className, ...rest }) => {
  return (
    <button
      type="button"
      {...rest}
      className={cn(
        'flex size-13.5 cursor-pointer items-center justify-center rounded-full bg-page/20 transition-colors duration-150 ease-out hover:bg-page/40',
        className
      )}
    >
      <ArrowLeftIcon />
    </button>
  );
};

export default HeroArrow;
