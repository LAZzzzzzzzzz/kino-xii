const SEAT_STATE_CLASSES = {
  available:
    'cursor-pointer border border-disabled bg-card hover:border-secondary',
  selected: 'cursor-pointer bg-red',
  sold: 'cursor-not-allowed bg-card text-disabled',
  held: 'seat-hatch cursor-not-allowed text-disabled',
};

export const getSectionLabel = ({ name, rows }) => {
  const first = rows.at(0)?.label;
  const last = rows.at(-1)?.label;

  return `${name} · Rows ${first}-${last}`;
};

export const getSeatState = (seat, isSelected) => {
  if (isSelected) {
    return 'selected';
  }

  return seat.state === 'available' ? 'available' : seat.state;
};

export const getSeatClasses = (state) => SEAT_STATE_CLASSES[state];

export const getSeatLabel = (seat, state) => {
  if (state === 'sold') {
    return `Seat ${seat.code}, sold`;
  }

  if (state === 'held') {
    return `Seat ${seat.code}, held by another user`;
  }

  return `Seat ${seat.code}`;
};

export const getSeatGridVars = (sections) => {
  const rows = sections.flatMap(({ rows }) => rows);
  const cols = Math.max(1, ...rows.map(({ seats }) => seats.length));
  const aisles = Math.max(
    0,
    ...rows.map(
      ({ seats }) => seats.filter(({ aisleAfter }) => aisleAfter).length
    )
  );

  return { '--seat-cols': cols, '--seat-aisles': aisles };
};
