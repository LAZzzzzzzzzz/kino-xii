export const SEAT_STEP = 'seats';
export const CHECKOUT_STEP = 'checkout';

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

const getSectionsByCode = (seatMap) => {
  const sections = seatMap?.sections ?? [];

  return Object.fromEntries(
    sections.flatMap((section) =>
      section.rows.flatMap((row) =>
        row.seats.map((seat) => [seat.code, section.name])
      )
    )
  );
};

// A hold seat is { seatId, code, ticketType: { slug, name }, price } — the id
// comes straight from the response, so only the section name needs the seat map.
export const getHoldSelection = (holdSeats, seatMap) => {
  const sectionsByCode = getSectionsByCode(seatMap);

  return (holdSeats ?? []).map(({ seatId, code, ticketType }) => ({
    seatId,
    code,
    section: sectionsByCode[code],
    ticketType: ticketType.slug,
  }));
};

export const toHoldPayload = (selectedSeats) => {
  return selectedSeats.map(({ seatId, ticketType }) => ({
    seatId,
    ticketType,
  }));
};

export const EXPIRY_MESSAGE =
  'Your hold time expired. Please re-select your seats.';

export const getKeptSeats = (selectedSeats, contested) => {
  return selectedSeats.filter(({ code }) => !contested.includes(code));
};

const SEAT_ERROR_KEY = /^seats\.(\d+)\./;

// A 422 keys its errors like `seats.0.ticketType`, so the index maps onto the
// seats that were submitted. Keys that do not match, or point past the end of
// the selection, fall through to the panel-level message rather than vanishing.
const getSeatErrors = (errors, submittedSeats) => {
  const seatErrors = {};
  let hasUnmapped = false;

  Object.entries(errors ?? {}).forEach(([key, messages]) => {
    const match = key.match(SEAT_ERROR_KEY);
    const seat = match ? submittedSeats?.[Number(match[1])] : undefined;

    if (!seat) {
      hasUnmapped = true;

      return;
    }

    seatErrors[seat.seatId] = messages[0];
  });

  return { seatErrors, hasUnmapped };
};

export const getHoldError = (error, submittedSeats) => {
  const { contested, message, errors } = error?.response?.data ?? {};

  if (contested?.length) {
    return {
      contested,
      seatErrors: {},
      message: `${contested.join(', ')} ${contested.length === 1 ? 'was' : 'were'} just taken by someone else.`,
    };
  }

  const { seatErrors, hasUnmapped } = getSeatErrors(errors, submittedSeats);
  const hasSeatErrors = Object.keys(seatErrors).length > 0;

  return {
    contested: [],
    seatErrors,
    message:
      hasSeatErrors && !hasUnmapped
        ? null
        : (message ?? 'Those seats could not be held. Please try again.'),
  };
};

const CHECKOUT_OUTCOMES = {
  FIELDS: 'fields',
  EXPIRED: 'expired',
  CONTESTED: 'contested',
  FORBIDDEN: 'forbidden',
  UNKNOWN: 'unknown',
};

export const { FIELDS, EXPIRED, CONTESTED, FORBIDDEN, UNKNOWN } =
  CHECKOUT_OUTCOMES;

// Classified before anything is applied: applyApiErrors would otherwise put an
// expiry message into a root field error and leave the user on a dead form.
export const getCheckoutError = (error) => {
  const status = error?.response?.status;
  const { errors, message, contested } = error?.response?.data ?? {};

  if (status === 409) {
    return { outcome: CONTESTED, contested: contested ?? [], message };
  }

  if (status === 403) {
    return { outcome: FORBIDDEN, contested: [], message };
  }

  if (status === 422) {
    return {
      outcome: errors ? FIELDS : EXPIRED,
      contested: [],
      message,
    };
  }

  return { outcome: UNKNOWN, contested: [], message };
};

export const FORBIDDEN_MESSAGE =
  'That hold is no longer yours. Please re-select your seats.';
