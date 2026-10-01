import { cn } from '@/helpers';

const BUTTON_CLASSES = {
  base: 'flex shrink-0 cursor-pointer items-center justify-center gap-1 rounded-full px-5.5 py-3.25 text-sm font-extrabold whitespace-nowrap',
  variants: {
    primary: 'bg-red text-primary',
    light: 'bg-primary text-page',
  },
};

const Button = ({
  variant = 'primary',
  type = 'button',
  className,
  ...rest
}) => {
  return (
    <button
      type={type}
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
