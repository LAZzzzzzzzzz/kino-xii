import { cn } from '@/helpers';
import { CheckIcon, WarningCircleIcon } from './icons';

const Input = ({ label, error, isValid, className, ...rest }) => {
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
            'flex h-10 items-center gap-1.5 rounded-xl bg-card px-4 transition-colors duration-150 ease-out',
            error && 'border border-red text-red'
          )}
        >
          <input
            {...rest}
            className="min-w-0 flex-1 bg-transparent outline-none placeholder:text-secondary"
          />

          {error && <WarningCircleIcon />}
          {!error && isValid && <CheckIcon className="text-green" />}
        </div>
      </div>

      {error && <span className="text-red">{error}</span>}
    </label>
  );
};

export default Input;
