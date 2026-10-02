import { cn } from '@/helpers';

const BADGE_CLASSES = {
  base: 'flex shrink-0 items-start gap-1 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap',
  variants: {
    red: 'bg-tint-red text-red',
    white: 'bg-tint-white text-primary',
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
