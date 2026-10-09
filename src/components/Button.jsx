import { cn } from '@/helpers';

const BUTTON_CLASSES = {
  base: 'flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full px-5.5 py-3.25 text-sm font-extrabold whitespace-nowrap transition-colors duration-150 ease-out disabled:cursor-not-allowed disabled:bg-disabled disabled:text-secondary disabled:hover:bg-disabled',
  variants: {
    primary: 'bg-red text-primary hover:bg-red/90',
    secondary: 'bg-tint-white text-primary hover:bg-white/90 hover:text-page',
    light: 'bg-primary text-page hover:bg-primary/90',
    outline: 'border border-secondary text-primary hover:bg-tint-white',
    raised:
      'bg-raised text-primary hover:bg-raised/80 disabled:bg-raised/50 disabled:text-secondary',
  },
};

const Button = ({
  as: Component = 'button',
  variant = 'primary',
  className,
  ...rest
}) => {
  return (
    <Component
      type={Component === 'button' ? 'button' : undefined}
      {...rest}
      className={cn(
        BUTTON_CLASSES.base,
        BUTTON_CLASSES.variants[variant],
        className
      )}
    />
  );
};

export default Button;
