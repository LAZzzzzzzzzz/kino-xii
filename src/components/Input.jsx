import { cn } from '@/helpers';
import { CheckIcon, WarningCircleIcon } from './icons';

const Input = ({ label, hint, icon, error, isValid, className, ...rest }) => {
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
            'relative flex h-10 items-center gap-1.5 rounded-xl bg-card px-4 transition-colors duration-150 ease-out',
            error && 'border border-red text-red'
          )}
        >
          <input
            {...rest}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-secondary disabled:text-secondary [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
          />

          {error && <WarningCircleIcon />}
          {!error && isValid && <CheckIcon className="text-green" />}
          {!error && !isValid && icon}
        </div>
      </div>

      {hint && !error && <span className="text-secondary">{hint}</span>}
      {error && <span className="text-red">{error}</span>}
    </label>
  );
};

export default Input;
