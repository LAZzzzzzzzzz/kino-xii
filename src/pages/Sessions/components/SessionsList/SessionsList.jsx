import MovieGroup from './MovieGroup';

const SessionsList = ({ groups, isPending, isError }) => {
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

  if (!groups.length) {
    return (
      <p className="text-sm text-secondary">
        No sessions match these filters. Try clearing a few.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <MovieGroup
          key={group.movie.id}
          movie={group.movie}
          sessions={group.sessions}
        />
      ))}
    </div>
  );
};

export default SessionsList;
