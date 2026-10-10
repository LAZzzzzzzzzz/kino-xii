import { cn } from '@/helpers';
import { getSeatClasses, getSeatLabel, getSeatState } from './helpers';

const SeatButton = ({ seat, section, isSelected, onToggle }) => {
  if (seat.state === 'unavailable') {
    return (
      <span
        aria-hidden="true"
        className="aspect-square w-(--seat-size) shrink-0"
      />
    );
  }

  const state = getSeatState(seat, isSelected);
  const isSelectable = state === 'available' || state === 'selected';

  return (
    <button
      type="button"
      onClick={() => onToggle(seat, section)}
      disabled={!isSelectable}
      aria-pressed={isSelected}
      aria-label={getSeatLabel(seat, state)}
      className={cn(
        'flex aspect-square w-(--seat-size) shrink-0 items-center justify-center rounded-menu text-sm font-extrabold transition-colors duration-150 ease-out disabled:cursor-not-allowed',
        getSeatClasses(state)
      )}
    >
      {seat.label}
    </button>
  );
};

export default SeatButton;
