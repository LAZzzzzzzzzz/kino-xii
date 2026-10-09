import { CaretDownIcon } from '@/components';

const SortSelect = ({ options, sort, onSelect }) => {
  return (
    <label className="flex shrink-0 items-center gap-2 text-sm">
      <span className="text-secondary">Sort:</span>

      <div className="relative flex items-center">
        <select
          value={sort}
          onChange={(event) => onSelect(event.target.value)}
          className="w-full cursor-pointer appearance-none bg-transparent pr-6 font-semibold outline-none"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id} className="bg-card">
              {option.label}
            </option>
          ))}
        </select>

        <CaretDownIcon className="pointer-events-none absolute right-0 size-4" />
      </div>
    </label>
  );
};

export default SortSelect;
