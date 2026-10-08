import VenueSessions from './VenueSessions';

const SessionsList = ({
  venues,
  isPending,
  isError,
  selectedLabel,
  restrictionNotice,
}) => {
  if (isError) {
    return (
      <p className="text-sm text-secondary">
        Sessions could not be loaded. Please try again later.
      </p>
    );
  }

  if (isPending) {
    return null;
  }

  if (!venues.length) {
    return (
      <p className="text-sm text-secondary">
        There are no sessions for this film on {selectedLabel}.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-6.75">
      {venues.map((group) => (
        <VenueSessions
          key={group.venue.id}
          venue={group.venue}
          sessions={group.sessions}
          restrictionNotice={restrictionNotice}
        />
      ))}
    </div>
  );
};

export default SessionsList;
