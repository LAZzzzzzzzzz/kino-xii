import RestrictionNotice from './RestrictionNotice';
import SessionDatePicker from './SessionDatePicker';
import SessionsIntro from './SessionsIntro';
import SessionsList from './SessionsList';
import { getSessionsSummary } from './helpers';
import { useMovieSessions } from './useMovieSessions';

const SECTION_CLASSES = 'flex min-w-0 flex-1 flex-col gap-6.75 overflow-clip';

const MovieSessions = ({ movie }) => {
  const {
    isComingSoon,
    dateOptions,
    selectedDate,
    selectedLabel,
    selectDate,
    venues,
    sessionCount,
    restrictionNotice,
    isPending,
    isError,
  } = useMovieSessions(movie);

  const summary = getSessionsSummary({
    isComingSoon,
    isPending,
    sessionCount,
    selectedLabel,
  });

  if (isComingSoon) {
    return (
      <section aria-label="Sessions" className={SECTION_CLASSES}>
        <SessionsIntro summary={summary} />
      </section>
    );
  }

  return (
    <section
      aria-label="Sessions"
      aria-busy={isPending}
      className={SECTION_CLASSES}
    >
      <div className="flex flex-col gap-3.5">
        <SessionsIntro summary={summary} />

        <SessionDatePicker
          options={dateOptions}
          selectedDate={selectedDate}
          onSelect={selectDate}
        />
      </div>

      {restrictionNotice && (
        <RestrictionNotice>{restrictionNotice}</RestrictionNotice>
      )}

      <SessionsList
        venues={venues}
        isPending={isPending}
        isError={isError}
        selectedLabel={selectedLabel}
        restrictionNotice={restrictionNotice}
      />
    </section>
  );
};

export default MovieSessions;
