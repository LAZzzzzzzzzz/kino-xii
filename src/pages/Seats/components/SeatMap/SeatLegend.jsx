import { cn } from '@/helpers';

const LEGEND_ITEMS = [
  { label: 'Available', className: 'border border-disabled bg-card' },
  { label: 'Selected', className: 'bg-red' },
  { label: 'Sold', className: 'bg-card' },
  { label: 'Held by another user', className: 'seat-hatch' },
];

const SeatLegend = () => {
  return (
    <ul className="flex items-center justify-center gap-5">
      {LEGEND_ITEMS.map(({ label, className }) => (
        <li
          key={label}
          className="flex items-center gap-1.5 text-xs leading-body text-secondary"
        >
          <span
            aria-hidden="true"
            className={cn('size-3.5 rounded', className)}
          />
          {label}
        </li>
      ))}
    </ul>
  );
};

export default SeatLegend;
