import { Button } from '@/components';
import { getRefundNote } from './helpers';

const TicketOrder = ({ order, isRefunding, onRefund }) => {
  return (
    <div className="flex w-70.5 shrink-0 flex-col justify-between self-stretch border-l border-dashed border-tint-white pl-6">
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold tracking-overline text-secondary uppercase">
          Order
        </span>
        <p className="text-base leading-normal font-bold">#{order.reference}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm font-semibold text-secondary">Total paid</p>
        <p className="text-[1.75rem] leading-none font-extrabold">
          ₾{order.totalPrice}
        </p>
      </div>

      <div className="flex flex-col gap-3.5">
        <Button
          variant="raised"
          disabled={!order.isRefundable || isRefunding}
          onClick={() => onRefund(order.reference)}
          className="w-full py-2"
        >
          {isRefunding ? 'Refunding' : 'Refund'}
        </Button>

        <p className="text-center text-xs text-secondary">
          {getRefundNote(order)}
        </p>
      </div>
    </div>
  );
};

export default TicketOrder;
