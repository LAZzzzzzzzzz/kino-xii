const DEFAULT_TICKET_TYPE = 'adult';

// A seat carries no type of its own, so its "seat type" is the section it sits
// in — carried along here so the summary needs nothing further from the map.
const getAllSeats = (seatMap) => {
  const sections = seatMap?.sections ?? [];

  return sections.flatMap((section) =>
    section.rows.flatMap((row) =>
      row.seats.map((seat) => ({ ...seat, section: section.name }))
    )
  );
};

export const getTicketTypes = (ticketTypes, minAge) => {
  const allowed = ticketTypes.filter(
    ({ blockedFromRatingAge }) =>
      !blockedFromRatingAge || minAge < blockedFromRatingAge
  );

  return [...allowed].sort((a, b) => a.priceRatio - b.priceRatio);
};

export const getTicketPrices = (price, ticketTypes) => {
  const entries = ticketTypes.map(({ slug, priceRatio }) => [
    slug,
    Math.round(price * priceRatio),
  ]);

  return Object.fromEntries(entries);
};

export const getSubtotal = (selectedSeats, prices) => {
  return selectedSeats.reduce(
    (total, { ticketType }) => total + (prices[ticketType] ?? 0),
    0
  );
};

export const getHeldSeats = (seatMap) => {
  return getAllSeats(seatMap)
    .filter(({ isMine }) => isMine)
    .map(({ id, code, section }) => ({
      seatId: id,
      code,
      section,
      ticketType: DEFAULT_TICKET_TYPE,
    }));
};

export const MAX_SEATS_REASON = 'max-seats';

// The cap has to be reportable rather than silently enforced: the task page
// wants a message on the attempt, so the attempt must be possible.
export const getToggledSeats = ({ selectedSeats, seat, section, maxSeats }) => {
  const isSelected = selectedSeats.some(({ seatId }) => seatId === seat.id);

  if (isSelected) {
    return {
      seats: selectedSeats.filter(({ seatId }) => seatId !== seat.id),
      reason: null,
    };
  }

  if (selectedSeats.length >= maxSeats) {
    return { seats: selectedSeats, reason: MAX_SEATS_REASON };
  }

  return {
    seats: [
      ...selectedSeats,
      {
        seatId: seat.id,
        code: seat.code,
        section,
        ticketType: DEFAULT_TICKET_TYPE,
      },
    ],
    reason: null,
  };
};

export const getRetypedSeats = (selectedSeats, seatId, ticketType) => {
  return selectedSeats.map((seat) =>
    seat.seatId === seatId ? { ...seat, ticketType } : seat
  );
};
