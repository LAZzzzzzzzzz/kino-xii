import { cn } from '@/helpers';

const SessionDate = ({ option, isSelected, ...rest }) => {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      disabled={!option.isAvailable}
      title={option.isAvailable ? undefined : `No sessions on ${option.label}`}
      {...rest}
      className={cn(
        'flex h-20 w-20 shrink-0 cursor-pointer flex-col items-center justify-center gap-1.5 overflow-clip rounded-2xl px-3 py-2.5 transition-[width,background-color] duration-150 ease-out disabled:cursor-not-allowed disabled:text-secondary motion-reduce:transition-none',
        isSelected ? 'w-27.25 bg-red' : 'bg-card not-disabled:hover:bg-raised'
      )}
    >
      <span className="text-xs font-semibold">{option.weekday}</span>
      <span className="text-lg leading-normal font-extrabold">
        {option.day}
      </span>
    </button>
  );
};

export default SessionDate;
