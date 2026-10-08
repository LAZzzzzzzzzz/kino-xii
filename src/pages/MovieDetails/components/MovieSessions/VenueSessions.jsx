import HallSessions from './HallSessions';
import { groupSessionsByHall } from './helpers';

const VenueSessions = ({ venue, sessions, restrictionNotice }) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <p className="text-sm font-extrabold">{venue.name}</p>

      <div className="flex flex-wrap items-start gap-2.5">
        {groupSessionsByHall(sessions).map((group) => (
          <HallSessions
            key={group.hall.id}
            hall={group.hall}
            sessions={group.sessions}
            restrictionNotice={restrictionNotice}
          />
        ))}
      </div>
    </div>
  );
};

export default VenueSessions;
