const DEFAULT_TICKET_TYPE = 'adult';

const getAllSeats = (seatMap) => {
  const sections = seatMap?.sections ?? [];

  return sections.flatMap((section) =>
    section.rows.flatMap((row) => row.seats)
  );
};

export const getSessionSummary = (session) => {
  const date = new Date(session.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return [
    session.venue.name,
    `Hall ${session.hall.name}`,
    date,
    session.time,
    session.format.name,
    session.language.name,
  ].join(' · ');
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
    .map(({ id, code }) => ({
      seatId: id,
      code,
      ticketType: DEFAULT_TICKET_TYPE,
    }));
};

export const getToggledSeats = ({ selectedSeats, seat, maxSeats }) => {
  const isSelected = selectedSeats.some(({ seatId }) => seatId === seat.id);

  if (isSelected) {
    return selectedSeats.filter(({ seatId }) => seatId !== seat.id);
  }

  if (selectedSeats.length >= maxSeats) {
    return selectedSeats;
  }

  return [
    ...selectedSeats,
    { seatId: seat.id, code: seat.code, ticketType: DEFAULT_TICKET_TYPE },
  ];
};

export const getRetypedSeats = (selectedSeats, seatId, ticketType) => {
  return selectedSeats.map((seat) =>
    seat.seatId === seatId ? { ...seat, ticketType } : seat
  );
};

export const getKeptSeats = (selectedSeats, contested) => {
  return selectedSeats.filter(({ code }) => !contested.includes(code));
};

export const toHoldPayload = (selectedSeats) => {
  return selectedSeats.map(({ seatId, ticketType }) => ({
    seatId,
    ticketType,
  }));
};

export const getHoldError = (error) => {
  const { contested, message } = error?.response?.data ?? {};

  if (contested?.length) {
    return {
      contested,
      message: `${contested.join(', ')} ${contested.length === 1 ? 'was' : 'were'} just taken by someone else.`,
    };
  }

  return {
    contested: [],
    message: message ?? 'Those seats could not be held. Please try again.',
  };
};
