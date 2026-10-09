import {
  FiltersPanel,
  Pagination,
  SessionsList,
  SortSelect,
} from './components';
import { getResultsSummary } from './helpers';
import { useSessions } from './useSessions';

const Sessions = () => {
  const {
    filters,
    venues,
    languages,
    timeBands,
    sorts,
    availableFormats,
    dateOptions,
    activeCount,
    groups,
    meta,
    isPending,
    isError,
    toggleFilter,
    selectDate,
    selectSort,
    selectPage,
    clearFilters,
  } = useSessions();

  return (
    <div className="flex flex-col gap-10 px-12.75 pt-29.5 pb-65">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-2xl font-extrabold">Sessions</h1>
        <p className="text-sm text-secondary">
          Browse showtimes across all venues
        </p>
      </div>

      <div className="flex items-start gap-12.75">
        <FiltersPanel
          filters={filters}
          venues={venues}
          availableFormats={availableFormats}
          languages={languages}
          timeBands={timeBands}
          dateOptions={dateOptions}
          activeCount={activeCount}
          onToggle={toggleFilter}
          onSelectDate={selectDate}
          onClear={clearFilters}
        />

        <section
          aria-label="Sessions"
          aria-busy={isPending}
          className="flex min-w-0 flex-1 flex-col gap-10"
        >
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm">{getResultsSummary(meta)}</p>
            <SortSelect
              options={sorts}
              sort={filters.sort}
              onSelect={selectSort}
            />
          </div>

          <SessionsList
            groups={groups}
            isPending={isPending}
            isError={isError}
          />

          <Pagination
            page={filters.page}
            lastPage={meta?.lastPage}
            onSelect={selectPage}
          />
        </section>
      </div>
    </div>
  );
};

export default Sessions;
