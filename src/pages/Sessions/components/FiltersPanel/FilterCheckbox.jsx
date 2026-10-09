import { CheckIcon } from '@/components';
import { cn } from '@/helpers';

const FilterCheckbox = ({ label, detail, isChecked, onToggle }) => {
  return (
    <label className="flex cursor-pointer items-center gap-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggle}
        className="peer sr-only"
      />

      <span
        className={cn(
          'flex size-4 shrink-0 items-center justify-center rounded-md border transition-colors duration-150 ease-out peer-focus-visible:ring-2 peer-focus-visible:ring-red',
          isChecked ? 'border-red bg-red' : 'border-disabled'
        )}
      >
        {isChecked && <CheckIcon className="size-2.5" />}
      </span>

      <span className="text-sm font-semibold">{label}</span>

      {detail && <span className="text-xs text-secondary">· {detail}</span>}
    </label>
  );
};

export default FilterCheckbox;
