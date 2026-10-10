import { TimerIcon } from '@/components';

const SECONDS_IN_MINUTE = 60;

const formatRemaining = (secondsRemaining) => {
  const minutes = Math.floor(secondsRemaining / SECONDS_IN_MINUTE);
  const seconds = secondsRemaining % SECONDS_IN_MINUTE;

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
};

const HoldTimer = ({ secondsRemaining }) => {
  return (
    <p
      aria-label="Time left to complete your booking"
      className="flex shrink-0 items-center gap-1.5 rounded-full bg-tint-red px-3.25 py-2.25 text-xs font-semibold text-red"
    >
      <TimerIcon className="size-4" />
      {formatRemaining(secondsRemaining)}
    </p>
  );
};

export default HoldTimer;
