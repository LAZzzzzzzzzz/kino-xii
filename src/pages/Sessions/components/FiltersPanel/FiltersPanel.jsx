import { Button } from '@/components';
import { getActiveFiltersLabel } from '../../helpers';
import FilterCheckboxes from './FilterCheckboxes';
import FilterDates from './FilterDates';
import FilterSection from './FilterSection';
import {
  getBandOptions,
  getFormatOptions,
  getLanguageOptions,
  getVenueOptions,
} from './helpers';

const FiltersPanel = ({
  filters,
  venues,
  availableFormats,
  languages,
  timeBands,
  dateOptions,
  activeCount,
  onToggle,
  onSelectDate,
  onClear,
}) => {
  return (
    <aside
      aria-label="Session filters"
      className="sticky top-8 flex w-80 shrink-0 flex-col gap-6 rounded-2xl bg-card p-6"
    >
      <h2 className="text-base font-extrabold">Filters</h2>

      <FilterSection label="Venue">
        <FilterCheckboxes
          options={getVenueOptions(venues)}
          selected={filters.venues}
          onToggle={(value) => onToggle('venues', value)}
        />
      </FilterSection>

      <FilterSection label="Date">
        <FilterDates
          options={dateOptions}
          selectedDate={filters.date}
          onSelect={onSelectDate}
        />
      </FilterSection>

      <FilterSection label="Format">
        <FilterCheckboxes
          options={getFormatOptions(availableFormats)}
          selected={filters.formats}
          onToggle={(value) => onToggle('formats', value)}
        />
      </FilterSection>

      <FilterSection label="Language">
        <FilterCheckboxes
          options={getLanguageOptions(languages)}
          selected={filters.languages}
          onToggle={(value) => onToggle('languages', value)}
        />
      </FilterSection>

      <FilterSection label="Time of day">
        <FilterCheckboxes
          options={getBandOptions(timeBands)}
          selected={filters.bands}
          onToggle={(value) => onToggle('bands', value)}
        />
      </FilterSection>

      <div className="flex flex-col gap-3.5">
        {activeCount > 0 && (
          <Button variant="raised" onClick={onClear} className="w-full py-2.5">
            Clear filters
          </Button>
        )}

        <p className="text-center text-xs text-secondary">
          {getActiveFiltersLabel(activeCount)}
        </p>
      </div>
    </aside>
  );
};

export default FiltersPanel;
