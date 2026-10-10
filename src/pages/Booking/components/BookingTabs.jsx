import { cn } from '@/helpers';
import { CHECKOUT_STEP, SEAT_STEP } from '../helpers';

const TAB_CLASSES =
  'flex-1 rounded-full px-4 py-2.5 text-center text-xs font-semibold text-primary';

const TABS = [
  { step: SEAT_STEP, label: '1. SEATS' },
  { step: CHECKOUT_STEP, label: '2. CHECKOUT' },
];

const BookingTabs = ({ step }) => {
  return (
    <div className="flex w-full items-center gap-2 rounded-full bg-card">
      {TABS.map((tab) => {
        const isActive = tab.step === step;

        return (
          <span
            key={tab.step}
            aria-current={isActive ? 'step' : undefined}
            className={cn(TAB_CLASSES, isActive && 'bg-red')}
          >
            {tab.label}
          </span>
        );
      })}
    </div>
  );
};

export default BookingTabs;
