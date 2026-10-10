import { Fragment } from 'react';
import SeatButton from './SeatButton';

const SeatRow = ({ row, selectedIds, isFull, onToggle }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="w-5 text-center text-xs text-secondary">
        {row.label}
      </span>

      {row.seats.map((seat) => (
        <Fragment key={seat.id}>
          <SeatButton
            seat={seat}
            isSelected={selectedIds.includes(seat.id)}
            isFull={isFull}
            onToggle={onToggle}
          />

          {seat.aisleAfter && <span aria-hidden="true" className="w-4" />}
        </Fragment>
      ))}
    </div>
  );
};

export default SeatRow;
