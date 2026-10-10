import { cn } from '@/helpers';
import { getTicketTypeLabel } from './helpers';

const TicketTypeOptions = ({ ticketTypes, ticketType, onSelect }) => {
  return (
    <div className="flex items-center gap-2">
      {ticketTypes.map((option) => (
        <button
          key={option.slug}
          type="button"
          onClick={() => onSelect(option.slug)}
          aria-pressed={option.slug === ticketType}
          className={cn(
            'flex-1 cursor-pointer rounded-2xl py-2 text-xs whitespace-nowrap text-primary transition-colors duration-150 ease-out',
            option.slug === ticketType ? 'bg-red' : 'bg-raised'
          )}
        >
          {getTicketTypeLabel(option)}
        </button>
      ))}
    </div>
  );
};

export default TicketTypeOptions;
