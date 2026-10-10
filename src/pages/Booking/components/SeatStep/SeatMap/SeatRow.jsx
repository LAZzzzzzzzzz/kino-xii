import { Fragment } from 'react';
import SeatButton from './SeatButton';

const SeatRow = ({ row, section, selectedIds, onToggle }) => {
  return (
    <div className="flex w-full items-center justify-center-safe gap-2">
      <span className="w-5 text-center text-xs font-semibold">{row.label}</span>

      {row.seats.map((seat) => (
        <Fragment key={seat.id}>
          <SeatButton
            seat={seat}
            section={section}
            isSelected={selectedIds.includes(seat.id)}
            onToggle={onToggle}
          />

          {seat.aisleAfter && <span aria-hidden="true" className="w-4" />}
        </Fragment>
      ))}
    </div>
  );
};

export default SeatRow;
