import { XIcon } from '../icons';
import { DialogDescription, DialogHeader, DialogTitle } from '../ui';

const ModalHeader = ({ title, description, onClose }) => {
  return (
    <div className="flex w-full items-start justify-between gap-4">
      <DialogHeader className="gap-2">
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="cursor-pointer transition-opacity duration-150 ease-out hover:opacity-80"
      >
        <XIcon className="size-6" />
      </button>
    </div>
  );
};

export default ModalHeader;
