import { cn } from '@/helpers';
import { Dialog, DialogContent } from '../ui';

const Modal = ({
  onClose,
  closeOnBackdrop = true,
  className,
  children,
  ...rest
}) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent
        onPointerDownOutside={
          closeOnBackdrop ? undefined : (event) => event.preventDefault()
        }
        {...rest}
        className={cn(
          'flex max-h-[calc(100dvh-4rem)] flex-col items-center gap-6 overflow-y-auto rounded-modal border border-raised bg-page p-8 text-primary shadow-modal scrollbar-none',
          className
        )}
      >
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
