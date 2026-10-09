const LOW_SEATS = 10;

export const getSessionCardProps = (session) => {
  if (session.isSoldOut) {
    return { 'aria-disabled': true, title: 'This session is sold out.' };
  }

  return { to: `/sessions/${session.id}/seats` };
};

export const isLowOnSeats = (session) => session.seatsLeft <= LOW_SEATS;
