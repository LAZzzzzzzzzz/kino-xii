import { useNavigate } from 'react-router';
import { Badge, TicketIcon } from '@/components';
import { useAuth } from '@/context';
import { cn } from '@/helpers';
import { SOLD_OUT_REASON, getSessionCardProps, isLowOnSeats } from './helpers';

const SessionCard = ({ session, restrictionNotice }) => {
  const navigate = useNavigate();
  const { requireAuth } = useAuth();
  const isDisabled = session.isSoldOut || Boolean(restrictionNotice);
  const disabledReason = restrictionNotice ?? SOLD_OUT_REASON;

  const openSeats = () => {
    requireAuth(() => navigate(`/sessions/${session.id}/seats`));
  };

  return (
    <button
      type="button"
      onClick={isDisabled ? undefined : openSeats}
      disabled={isDisabled}
      {...getSessionCardProps({ isDisabled, disabledReason })}
      className={cn(
        'flex w-63 shrink-0 cursor-pointer flex-col gap-1.5 rounded-2xl bg-card p-3.75 text-left transition-transform duration-150 ease-out motion-reduce:transition-none',
        isDisabled ? 'cursor-not-allowed opacity-45' : 'hover:-translate-y-0.5'
      )}
    >
      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-lg leading-normal font-extrabold">{session.time}</p>
        <Badge variant="raised" className="py-1">
          {session.format.name}
        </Badge>
      </div>

      <div className="flex w-full items-center justify-between gap-2 text-xs leading-body">
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

      <div className="flex w-full items-center justify-between gap-2">
        <p className="text-xs leading-body font-semibold">
          {session.venue.name} · Hall {session.hall.name}
        </p>
        <p className="text-sm font-extrabold">₾{session.price}</p>
      </div>
    </button>
  );
};

export default SessionCard;
