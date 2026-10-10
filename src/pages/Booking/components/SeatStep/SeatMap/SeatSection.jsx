import SeatRow from './SeatRow';
import { getSectionLabel } from './helpers';

const SeatSection = ({ section, selectedIds, isFull, onToggle }) => {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <p className="self-start text-xs font-semibold tracking-overline text-secondary uppercase">
        {getSectionLabel(section)}
      </p>

      {section.rows.map((row) => (
        <SeatRow
          key={row.label}
          row={row}
          selectedIds={selectedIds}
          isFull={isFull}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default SeatSection;
