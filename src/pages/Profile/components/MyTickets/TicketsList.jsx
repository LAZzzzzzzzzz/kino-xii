import TicketCard from './TicketCard';
import { getEmptyMessage } from './helpers';

const TicketsList = ({
  orders,
  filter,
  isPending,
  isError,
  refundingReference,
  onRefund,
}) => {
  if (isError) {
    return (
      <p className="text-sm text-secondary">
        Your tickets could not be loaded. Please try again later.
      </p>
    );
  }

  if (isPending) {
    return null;
  }

  if (!orders.length) {
    return <p className="text-sm text-secondary">{getEmptyMessage(filter)}</p>;
  }

  return (
    <div className="flex flex-col gap-5">
      {orders.map((order) => (
        <TicketCard
          key={order.id}
          order={order}
          isRefunding={order.reference === refundingReference}
          onRefund={onRefund}
        />
      ))}
    </div>
  );
};

export default TicketsList;
