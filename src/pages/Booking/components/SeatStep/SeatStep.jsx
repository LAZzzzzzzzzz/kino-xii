import SeatMap from './SeatMap';
import SeatSummary from './SeatSummary';
import { useSeatStep } from './useSeatStep';

const SeatStep = ({ seededSeats, notice, seatErrors, isHolding, onHold }) => {
  const {
    sections,
    maxSeats,
    ticketTypes,
    prices,
    selectedSeats,
    selectedIds,
    subtotal,
    capNotice,
    isPending,
    isError,
    toggleSeat,
    selectTicketType,
    removeSeat,
  } = useSeatStep({ seededSeats });

  if (!sections.length) {
    return (
      <div
        aria-busy={isPending}
        className="flex h-110 w-full items-center justify-center"
      >
        {isError && (
          <p className="text-sm text-secondary">
            This seat map could not be loaded. Please try again later.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex w-full gap-5">
      <div className="flex w-180 flex-col gap-9">
        <SeatMap
          sections={sections}
          selectedIds={selectedIds}
          onToggle={toggleSeat}
        />
      </div>

      <span
        aria-hidden="true"
        className="w-px shrink-0 self-stretch rounded-full bg-card"
      />

      <SeatSummary
        maxSeats={maxSeats}
        selectedSeats={selectedSeats}
        ticketTypes={ticketTypes}
        prices={prices}
        subtotal={subtotal}
        holdError={capNotice ?? notice}
        seatErrors={seatErrors}
        isHolding={isHolding}
        onSelectTicketType={selectTicketType}
        onRemove={removeSeat}
        onSubmit={() => onHold(selectedSeats)}
      />
    </div>
  );
};

export default SeatStep;
