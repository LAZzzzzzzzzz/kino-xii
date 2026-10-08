import { cn } from '@/helpers';

const BADGE_CLASSES = {
  base: 'flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs leading-3.5 font-semibold whitespace-nowrap',
  variants: {
    red: 'bg-tint-red text-red',
    white: 'bg-tint-white text-primary',
    card: 'bg-card text-secondary',
  },
};

const Badge = ({ variant = 'red', className, ...rest }) => {
  return (
    <span
      {...rest}
      className={cn(
        BADGE_CLASSES.base,
        BADGE_CLASSES.variants[variant],
        className
      )}
    />
  );
};

export default Badge;
