import TicketFilterTabs from './TicketFilterTabs';
import TicketsList from './TicketsList';
import useMyTickets from './useMyTickets';

const MyTickets = () => {
  const {
    filter,
    selectFilter,
    filterOptions,
    orders,
    isPending,
    isError,
    refundingReference,
    refundError,
    refund,
  } = useMyTickets();

  return (
    <section
      aria-label="My tickets"
      aria-busy={isPending}
      className="flex w-full flex-col gap-5"
    >
      <TicketFilterTabs
        options={filterOptions}
        filter={filter}
        onSelect={selectFilter}
      />

      {refundError && (
        <p className="flex w-full overflow-clip rounded-xl bg-tint-red px-3.25 py-2.25 text-xs leading-body font-semibold text-red">
          {refundError}
        </p>
      )}

      <TicketsList
        orders={orders}
        filter={filter}
        isPending={isPending}
        isError={isError}
        refundingReference={refundingReference}
        onRefund={refund}
      />
    </section>
  );
};

export default MyTickets;
