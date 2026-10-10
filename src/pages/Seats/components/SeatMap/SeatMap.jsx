import ScreenBar from './ScreenBar';
import SeatLegend from './SeatLegend';
import SeatSection from './SeatSection';

const SeatMap = ({ sections, selectedIds, isFull, onToggle }) => {
  return (
    <div className="flex flex-col gap-9">
      <div className="overflow-x-auto scrollbar-none">
        <div className="flex w-fit min-w-full flex-col gap-2.5 px-5">
          <ScreenBar />

          {sections.map((section) => (
            <SeatSection
              key={section.name}
              section={section}
              selectedIds={selectedIds}
              isFull={isFull}
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
