import { cn } from '@/helpers';

const TAB_CLASSES =
  'flex-1 rounded-full px-4 py-2.5 text-center text-xs font-semibold text-primary';

const BookingTabs = () => {
  return (
    <div className="flex w-full items-center rounded-full bg-raised">
      <span aria-current="step" className={cn(TAB_CLASSES, 'bg-red')}>
        SEATS
      </span>

      <span className={TAB_CLASSES}>CHECKOUT</span>
    </div>
  );
};

export default BookingTabs;
