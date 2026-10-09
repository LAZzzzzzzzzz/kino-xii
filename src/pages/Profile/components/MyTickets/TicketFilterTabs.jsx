import { cn } from '@/helpers';

const TicketFilterTabs = ({ options, filter, onSelect }) => {
  return (
    <div
      role="tablist"
      aria-label="Ticket history"
      className="flex w-fit items-center gap-1 rounded-2xl bg-card p-1"
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="tab"
          aria-selected={option.value === filter}
          onClick={() => onSelect(option.value)}
          className={cn(
            'flex cursor-pointer items-center gap-2 rounded-xl px-2.5 py-2 text-sm font-semibold transition-colors duration-150 ease-out',
            option.value === filter
              ? 'bg-raised text-primary'
              : 'text-secondary hover:text-primary'
          )}
        >
          {option.label}
          <span
            className={cn(
              'text-xs font-semibold',
              option.value === filter ? 'text-secondary' : 'text-disabled'
            )}
          >
            {option.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TicketFilterTabs;
