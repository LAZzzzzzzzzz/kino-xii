import { ArrowLeftIcon } from '@/components';
import { cn } from '@/helpers';
import { getPageItems } from '../helpers';

const ARROW_CLASSES =
  'flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-card transition-colors duration-150 ease-out hover:bg-raised disabled:cursor-not-allowed disabled:text-disabled disabled:hover:bg-card';

const Pagination = ({ page, lastPage, onSelect }) => {
  if (!lastPage || lastPage < 2) {
    return null;
  }

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-center gap-2"
    >
      <button
        type="button"
        aria-label="Previous page"
        disabled={page <= 1}
        onClick={() => onSelect(page - 1)}
        className={ARROW_CLASSES}
      >
        <ArrowLeftIcon className="size-4" />
      </button>

      {getPageItems(page, lastPage).map((item) =>
        item.value === null ? (
          <span key={item.key} className="px-1 text-sm text-secondary">
            …
          </span>
        ) : (
          <button
            key={item.key}
            type="button"
            aria-current={item.value === page ? 'page' : undefined}
            onClick={() => onSelect(item.value)}
            className={cn(
              'flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-sm font-semibold transition-colors duration-150 ease-out',
              item.value === page
                ? 'bg-red text-primary'
                : 'text-secondary hover:text-primary'
            )}
          >
            {item.value}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page >= lastPage}
        onClick={() => onSelect(page + 1)}
        className={ARROW_CLASSES}
      >
        <ArrowLeftIcon className="size-4 rotate-180" />
      </button>
    </nav>
  );
};

export default Pagination;
