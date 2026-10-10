const LOW_SEATS = 10;

export const SOLD_OUT_REASON = 'This session is sold out.';

export const getSessionCardProps = ({ isDisabled, disabledReason }) => {
  if (isDisabled) {
    return { 'aria-disabled': true, title: disabledReason };
  }

  return {};
};

export const isLowOnSeats = (session) => session.seatsLeft <= LOW_SEATS;
