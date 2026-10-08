import { Link } from 'react-router';
import { Badge, TicketIcon } from '@/components';
import { cn } from '@/helpers';
import TicketShape from './TicketShape';
import { getSessionTicketProps } from './helpers';

const SessionTicket = ({
  session,
  isDisabled,
  disabledReason,
  className,
  ...rest
}) => {
  const Component = isDisabled ? 'div' : Link;

  return (
    <Component
      {...getSessionTicketProps({ session, isDisabled, disabledReason })}
      {...rest}
      className={cn(
        'relative flex h-20.25 w-51.75 shrink-0 items-center justify-between overflow-clip rounded-xl drop-shadow-ticket transition-transform duration-150 ease-out motion-reduce:transition-none',
        isDisabled
          ? 'cursor-not-allowed opacity-50 grayscale'
          : 'hover:-translate-y-0.5',
        className
      )}
    >
      <TicketShape />

      <div className="relative flex w-31 flex-col items-center justify-center gap-2 overflow-clip py-3.75">
        <p className="text-xl font-extrabold">{session.time}</p>

        <div className="flex items-center gap-1.5">
          <p className="text-xs leading-body text-secondary">
            {session.language.code}
          </p>
          <Badge variant="card" className="py-1">
            {session.format.name}
          </Badge>
        </div>
      </div>

      <div className="relative flex h-full w-20.75 flex-col items-center justify-center gap-2 overflow-clip px-3.75 py-2.5">
        <p className="text-lg leading-normal font-extrabold text-red">
          ₾ {session.price}
        </p>

        <div className="flex items-start gap-1 text-secondary">
          <TicketIcon className="size-3" />
          <p className="text-xs leading-body whitespace-nowrap">
            {session.seatsLeft} left
          </p>
        </div>
      </div>

      <span className="absolute top-2.75 left-31 h-14.75 border-l-[0.09375rem] border-dashed border-primary" />
    </Component>
  );
};

export default SessionTicket;
