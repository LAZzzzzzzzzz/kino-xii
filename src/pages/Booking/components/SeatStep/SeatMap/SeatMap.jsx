import ScreenBar from './ScreenBar';
import SeatLegend from './SeatLegend';
import SeatSection from './SeatSection';
import { getSeatGridVars } from './helpers';

const SeatMap = ({ sections, selectedIds, onToggle }) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="overflow-x-auto">
        <div
          style={getSeatGridVars(sections)}
          className="seat-grid flex flex-col gap-8 px-5"
        >
          <ScreenBar />

          {sections.map((section) => (
            <SeatSection
              key={section.name}
              section={section}
              selectedIds={selectedIds}
              onToggle={onToggle}
            />
          ))}
        </div>
      </div>

      <SeatLegend />
    </div>
  );
};

export default SeatMap;
