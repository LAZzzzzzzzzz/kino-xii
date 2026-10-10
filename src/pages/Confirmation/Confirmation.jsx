import { Button, CheckIcon, Modal } from '@/components';
import { getOrderFields } from './helpers';
import { useConfirmation } from './useConfirmation';

const PANEL_CLASSES = 'w-180 items-stretch gap-6';

const Confirmation = () => {
  const { order, isPending, isError, goToTickets, close } = useConfirmation();

  if (!order) {
    return (
      <Modal
        aria-label="Order confirmation"
        aria-busy={isPending}
        onClose={close}
        className="h-60 w-180 justify-center"
      >
        {isError && (
          <p className="text-sm text-secondary">
            That order could not be found. Check My Tickets for your bookings.
          </p>
        )}
      </Modal>
    );
  }

  const { movie } = order.session;

  return (
    <Modal
      aria-label="Order confirmation"
      onClose={close}
      className={PANEL_CLASSES}
    >
      <header className="flex w-full flex-col items-center gap-3 text-center">
        <span className="flex size-12 items-center justify-center rounded-full bg-tint-green text-green">
          <CheckIcon className="size-6" />
        </span>

        <h1 className="text-xl font-extrabold uppercase">Order confirmed</h1>

        <p className="text-xs leading-body text-secondary">
          Reference{' '}
          <span className="font-semibold text-primary">{order.reference}</span>
        </p>
      </header>

      <section
        aria-label="Ticket details"
        className="flex w-full flex-col gap-4.5 rounded-2xl bg-card p-6"
      >
        <h2 className="text-lg leading-normal font-extrabold">{movie.title}</h2>

        <div className="flex flex-wrap items-start gap-10">
          {getOrderFields(order).map((field) => (
            <div key={field.label} className="flex flex-col gap-1">
              <span className="text-xs font-semibold tracking-overline text-secondary uppercase">
                {field.label}
              </span>
              <p className="text-base leading-normal font-bold whitespace-nowrap">
                {field.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold tracking-overline text-secondary uppercase">
            Seats
          </span>

          <ul className="flex flex-wrap items-center gap-2.5">
            {order.tickets.map((ticket) => (
              <li
                key={ticket.id}
                className="rounded-lg bg-raised px-2.5 py-1 text-xs font-semibold"
              >
                <span className="font-bold">{ticket.seatCode}</span> ·{' '}
                {ticket.ticketType.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="flex w-full items-center gap-3">
        <Button onClick={goToTickets} className="flex-1">
          My Tickets
        </Button>

        <Button variant="outline" onClick={close} className="flex-1">
          Close
        </Button>
      </div>
    </Modal>
  );
};

export default Confirmation;
