import { Button } from '@/components';
import SelectedSeatCard from './SelectedSeatCard';

const SeatSummary = ({
  maxSeats,
  selectedSeats,
  ticketTypes,
  prices,
  subtotal,
  holdError,
  isHolding,
  onSelectTicketType,
  onRemove,
  onSubmit,
}) => {
  return (
    <section
      aria-label="Your seats"
      className="flex min-w-0 flex-1 flex-col gap-5"
    >
      <h2 className="text-sm font-extrabold">Your seats · Max {maxSeats}</h2>

      {!selectedSeats.length && (
        <p className="text-xs leading-body text-secondary">
          Pick up to {maxSeats} seats from the map. Each seat can carry its own
          ticket type.
        </p>
      )}

      <ul className="flex flex-col gap-5">
        {selectedSeats.map((seat) => (
          <SelectedSeatCard
            key={seat.seatId}
            seat={seat}
            price={prices[seat.ticketType]}
            ticketTypes={ticketTypes}
            onSelectTicketType={onSelectTicketType}
            onRemove={onRemove}
          />
        ))}
      </ul>

      {holdError && (
        <p role="alert" className="text-xs leading-body text-red">
          {holdError}
        </p>
      )}

      <div className="mt-auto flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs font-semibold tracking-overline uppercase">
            Subtotal
          </span>

          <span className="text-2xl font-extrabold">₾ {subtotal}</span>
        </div>

        <Button
          onClick={onSubmit}
          disabled={!selectedSeats.length || isHolding}
          className="w-full"
        >
          Next: Checkout
        </Button>
      </div>
    </section>
  );
};

export default SeatSummary;
