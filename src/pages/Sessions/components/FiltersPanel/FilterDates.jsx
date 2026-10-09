import { cn } from '@/helpers';

const FilterDates = ({ options, selectedDate, onSelect }) => {
  return (
    <div className="flex items-stretch gap-2">
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          title={option.label}
          aria-pressed={option.value === selectedDate}
          onClick={() => onSelect(option.value)}
          className={cn(
            'flex min-w-0 flex-1 cursor-pointer flex-col items-center gap-0.5 rounded-lg px-1 py-2 transition-colors duration-150 ease-out',
            option.value === selectedDate
              ? 'bg-red'
              : 'bg-raised hover:bg-disabled'
          )}
        >
          <span
            className={cn(
              'text-xs',
              option.value === selectedDate ? 'text-primary' : 'text-secondary'
            )}
          >
            {option.weekday}
          </span>
          <span className="text-sm font-bold">{option.day}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterDates;
