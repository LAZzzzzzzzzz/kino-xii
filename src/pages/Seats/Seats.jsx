import {
  BookingHeader,
  BookingTabs,
  SeatMap,
  SeatSummary,
  SeatsPlaceholder,
} from './components';
import { useSeats } from './useSeats';

const Seats = () => {
  const {
    session,
    sections,
    summary,
    maxSeats,
    ticketTypes,
    prices,
    selectedSeats,
    selectedIds,
    subtotal,
    holdError,
    isHolding,
    isPending,
    isError,
    toggleSeat,
    selectTicketType,
    removeSeat,
    holdSelection,
  } = useSeats();

  if (!session || !sections.length) {
    return <SeatsPlaceholder isPending={isPending} isError={isError} />;
  }

  return (
    <div className="flex justify-center px-12.75 pt-29.5 pb-65">
      <section
        aria-label="Seat selection"
        className="flex w-286.5 flex-col gap-8 rounded-modal border border-raised bg-page p-8 shadow-modal"
      >
        <BookingHeader title={session.movie.title} summary={summary} />

        <div className="flex gap-5">
          <div className="flex w-180 flex-col gap-9">
            <BookingTabs />

            <SeatMap
              sections={sections}
              selectedIds={selectedIds}
              isFull={selectedSeats.length >= maxSeats}
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
            holdError={holdError}
            isHolding={isHolding}
            onSelectTicketType={selectTicketType}
            onRemove={removeSeat}
            onSubmit={holdSelection}
          />
        </div>
      </section>
    </div>
  );
};

export default Seats;
