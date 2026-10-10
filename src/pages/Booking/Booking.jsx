import { Navigate } from 'react-router';
import { Modal, XIcon } from '@/components';
import {
  BookingHeader,
  BookingPlaceholder,
  BookingTabs,
  CheckoutStep,
  ExpiryNotice,
  HoldTimer,
  SeatStep,
} from './components';
import { SEAT_STEP } from './helpers';
import { useBooking } from './useBooking';

const PANEL_CLASSES = 'w-286.5 items-stretch gap-8';

const Booking = ({ step }) => {
  const {
    session,
    summary,
    isPending,
    isError,
    gateNotice,
    hold,
    holdId,
    secondsRemaining,
    isHolding,
    expiryNotice,
    stepNotice,
    seatErrors,
    seedId,
    seededSeats,
    onExpire,
    onContested,
    onForbidden,
    onPaid,
    isCheckoutUnreachable,
    seatStepPath,
    holdSeats,
    closeBooking,
  } = useBooking(step);

  if (isCheckoutUnreachable) {
    return <Navigate to={seatStepPath} replace />;
  }

  if (!session) {
    return (
      <BookingPlaceholder
        isPending={isPending}
        isError={isError}
        onClose={closeBooking}
      />
    );
  }

  return (
    <Modal
      aria-label="Booking"
      onClose={closeBooking}
      className={PANEL_CLASSES}
    >
      <div className="flex w-full items-start justify-between gap-4">
        <BookingHeader title={session.movie.title} summary={summary} />

        <button
          type="button"
          onClick={closeBooking}
          aria-label="Close"
          className="cursor-pointer transition-opacity duration-150 ease-out hover:opacity-80"
        >
          <XIcon className="size-6" />
        </button>
      </div>

      {gateNotice ? (
        <p
          role="alert"
          className="flex w-full overflow-clip rounded-xl bg-tint-orange px-3.25 py-2.25 text-xs leading-body font-semibold text-orange"
        >
          {gateNotice}
        </p>
      ) : (
        <>
          <div className="flex w-full items-center gap-4">
            <BookingTabs step={step} />

            {hold && <HoldTimer secondsRemaining={secondsRemaining} />}
          </div>

          {expiryNotice && <ExpiryNotice>{expiryNotice}</ExpiryNotice>}

          {step === SEAT_STEP ? (
            <SeatStep
              key={seedId}
              seededSeats={seededSeats}
              notice={stepNotice}
              seatErrors={seatErrors}
              isHolding={isHolding}
              onHold={holdSeats}
            />
          ) : (
            <CheckoutStep
              hold={hold}
              holdId={holdId}
              onExpire={onExpire}
              onContested={onContested}
              onForbidden={onForbidden}
              onPaid={onPaid}
            />
          )}
        </>
      )}
    </Modal>
  );
};

export default Booking;
