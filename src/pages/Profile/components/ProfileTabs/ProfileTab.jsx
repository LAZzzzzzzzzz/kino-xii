import { cn } from '@/helpers';

const ProfileTab = ({ label, isSelected, hasAlert, count, ...rest }) => {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isSelected}
      {...rest}
      className="flex cursor-pointer flex-col gap-3"
    >
      <span className="flex items-center gap-2 px-0.5">
        <span
          className={cn(
            'text-sm font-semibold transition-colors duration-150 ease-out',
            !isSelected && 'text-secondary'
          )}
        >
          {label}
        </span>

        {hasAlert && (
          <span
            aria-label="Profile incomplete"
            role="img"
            className="size-2 rounded-full bg-orange"
          />
        )}

        {Boolean(count) && (
          <span className="flex size-5 items-center justify-center rounded-full bg-red text-xs font-bold">
            {count}
          </span>
        )}
      </span>

      <span
        className={cn(
          'h-0.5 w-full rounded-t-xs',
          isSelected ? 'bg-red' : 'bg-transparent'
        )}
      />
    </button>
  );
};

export default ProfileTab;
