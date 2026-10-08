import SessionTicket from './SessionTicket';
import { getSessionItems } from './helpers';

const HallSessions = ({ hall, sessions, restrictionNotice }) => {
  return (
    <div className="flex flex-col gap-2.25 overflow-clip rounded-panel bg-card p-3.75">
      <p className="text-xs font-semibold">Hall {hall.name}</p>

      <div className="flex max-w-106 flex-wrap gap-2.25">
        {getSessionItems(sessions, restrictionNotice).map(
          ({ session, isDisabled, disabledReason }) => (
            <SessionTicket
              key={session.id}
              session={session}
              isDisabled={isDisabled}
              disabledReason={disabledReason}
            />
          )
        )}
      </div>
    </div>
  );
};

export default HallSessions;
