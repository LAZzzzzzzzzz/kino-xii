import { Link } from 'react-router';
import { Badge, TicketIcon } from '@/components';
import { cn } from '@/helpers';
import { getSessionCardProps, isLowOnSeats } from './helpers';

const SessionCard = ({ session }) => {
  const Component = session.isSoldOut ? 'div' : Link;

  return (
    <Component
      {...getSessionCardProps(session)}
      className={cn(
        'flex w-63 shrink-0 flex-col gap-1.5 rounded-2xl bg-card p-3.75 transition-transform duration-150 ease-out motion-reduce:transition-none',
        session.isSoldOut
          ? 'cursor-not-allowed opacity-45'
          : 'hover:-translate-y-0.5'
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-lg leading-normal font-extrabold">{session.time}</p>
        <Badge variant="raised" className="py-1">
          {session.format.name}
        </Badge>
      </div>

      <div className="flex items-center justify-between gap-2 text-xs leading-body">
        <p className="text-secondary">{session.language.name}</p>

        {session.isSoldOut ? (
          <p className="text-secondary">Sold out</p>
        ) : (
          <p
            className={cn(
              'flex items-center gap-1',
              isLowOnSeats(session) ? 'text-red' : 'text-green'
            )}
          >
            <TicketIcon className="size-3" />
            {session.seatsLeft} left
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs leading-body font-semibold">
          {session.venue.name} · Hall {session.hall.name}
        </p>
        <p className="text-sm font-extrabold">₾{session.price}</p>
      </div>
    </Component>
  );
};

export default SessionCard;
