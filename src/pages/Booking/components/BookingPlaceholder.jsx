import { Modal } from '@/components';
import { cn } from '@/helpers';

const BookingPlaceholder = ({ isPending, isError, onClose }) => {
  return (
    <Modal
      aria-label="Booking"
      aria-busy={isPending}
      onClose={onClose}
      className={cn(
        'h-149.75 w-286.5 justify-center',
        isPending && 'animate-pulse'
      )}
    >
      {isError && (
        <p className="text-sm text-secondary">
          This seat map could not be loaded. Please try again later.
        </p>
      )}
    </Modal>
  );
};

export default BookingPlaceholder;
