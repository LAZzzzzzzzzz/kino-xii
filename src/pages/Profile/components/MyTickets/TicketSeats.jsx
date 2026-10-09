const TicketSeats = ({ tickets }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold tracking-overline text-secondary uppercase">
        Seats
      </span>

      <ul className="flex flex-wrap items-center gap-2.5">
        {tickets.map((ticket) => (
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
  );
};

export default TicketSeats;
