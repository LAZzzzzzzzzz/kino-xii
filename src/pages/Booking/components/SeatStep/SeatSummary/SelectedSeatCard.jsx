import { XIcon } from '@/components';
import TicketTypeOptions from './TicketTypeOptions';

const SelectedSeatCard = ({
  seat,
  price,
  error,
  ticketTypes,
  onSelectTicketType,
  onRemove,
}) => {
  return (
    <li className="flex flex-col gap-3 rounded-2xl bg-card p-3.75">
      <div className="flex items-center gap-3">
        <span className="text-xs text-secondary">Seat</span>
        <span className="text-xs font-semibold">{seat.code}</span>

        {seat.section && (
          <span className="text-xs text-secondary">{seat.section}</span>
        )}

        <span className="ml-auto text-xs font-semibold">₾{price}</span>

        <button
          type="button"
          onClick={() => onRemove(seat.seatId)}
          aria-label={`Remove seat ${seat.code}`}
          className="cursor-pointer text-secondary transition-opacity duration-150 ease-out hover:opacity-80"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      <span aria-hidden="true" className="h-px w-full bg-raised" />

      {error && (
        <p role="alert" className="text-xs leading-body text-red">
          {error}
        </p>
      )}

      <TicketTypeOptions
        ticketTypes={ticketTypes}
        ticketType={seat.ticketType}
        onSelect={(ticketType) => onSelectTicketType(seat.seatId, ticketType)}
      />
    </li>
  );
};

export default SelectedSeatCard;
