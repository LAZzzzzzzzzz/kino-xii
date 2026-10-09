import { cn } from '@/helpers';
import { CheckIcon, WarningCircleIcon } from './icons';

const openDatePicker = (event) => {
  event.currentTarget.showPicker();
};

const Input = ({
  label,
  hint,
  icon,
  error,
  isValid,
  type,
  className,
  ...rest
}) => {
  const hasIcon = Boolean(error || isValid || icon);

  return (
    <label
      className={cn(
        'flex w-full min-w-0 flex-col gap-2 text-xs font-semibold',
        className
      )}
    >
      <div className="flex flex-col gap-2.5">
        <span className={cn(error && 'text-red')}>{label}</span>

        <div
          className={cn(
            'relative flex h-10 items-center rounded-xl bg-card transition-colors duration-150 ease-out',
            error && 'border border-red text-red'
          )}
        >
          <input
            type={type}
            onClick={type === 'date' ? openDatePicker : undefined}
            {...rest}
            className={cn(
              'size-full min-w-0 bg-transparent px-4 outline-none placeholder:text-secondary disabled:text-secondary [&::-webkit-calendar-picker-indicator]:hidden',
              type === 'date' && 'cursor-pointer',
              hasIcon && 'pr-10'
            )}
          />

          <span className="pointer-events-none absolute right-4 flex items-center">
            {error && <WarningCircleIcon />}
            {!error && isValid && <CheckIcon className="text-green" />}
            {!error && !isValid && icon}
          </span>
        </div>
      </div>

      {hint && !error && <span className="text-secondary">{hint}</span>}
      {error && <span className="text-red">{error}</span>}
    </label>
  );
};

export default Input;
