import { Badge } from '@/components';
import TicketField from './TicketField';
import TicketOrder from './TicketOrder';
import TicketSeats from './TicketSeats';
import { getSessionDateLabel } from './helpers';

const TicketCard = ({ order, isRefunding, onRefund }) => {
  const { session } = order;
  const { movie } = session;

  return (
    <article className="flex w-full gap-4.5 rounded-[1.625rem] bg-card p-6">
      <img
        src={movie.posterUrl}
        alt={`${movie.title} poster`}
        className="h-33.75 w-26 shrink-0 rounded-poster object-cover"
      />

      <div className="flex min-w-0 flex-1 flex-col justify-center gap-3.5">
        <div className="flex items-center gap-3">
          <h3 className="text-xl leading-normal font-extrabold wrap-break-word">
            {movie.title}
          </h3>

          <Badge className="px-2 py-0.5" title={movie.ageRating.description}>
            {movie.ageRating.code}
          </Badge>

          <p className="text-sm text-secondary whitespace-nowrap">
            {movie.runtimeMinutes} min
          </p>
        </div>

        <div className="flex flex-wrap items-start gap-10">
          <TicketField label="Date">{getSessionDateLabel(session)}</TicketField>

          <TicketField label="Venue">
            {session.venue.name} · Hall {session.hall.name}
          </TicketField>

          <TicketField label="Format">
            {session.format.name} · {session.language.name}
          </TicketField>
        </div>

        <TicketSeats tickets={order.tickets} />
      </div>

      <TicketOrder
        order={order}
        isRefunding={isRefunding}
        onRefund={onRefund}
      />
    </article>
  );
};

export default TicketCard;
