const OrderSummary = ({ seats, subtotal }) => {
  return (
    <section
      aria-label="Order summary"
      className="flex min-w-0 flex-1 flex-col gap-3"
    >
      <h2 className="text-sm font-extrabold">Your order</h2>

      <ul className="flex flex-col gap-3">
        {seats.map((seat) => (
          <li
            key={seat.code}
            className="flex items-center gap-3 rounded-2xl bg-card p-3.75 text-xs"
          >
            <span className="text-secondary">Seat</span>
            <span className="font-semibold">{seat.code}</span>

            <span className="text-secondary">{seat.ticketType.name}</span>

            <span className="ml-auto font-semibold">₾{seat.price}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4 px-1.25 pt-2.5">
        <span className="text-xs font-semibold tracking-overline uppercase">
          Total
        </span>

        <span className="text-2xl font-extrabold">₾ {subtotal}</span>
      </div>
    </section>
  );
};

export default OrderSummary;
