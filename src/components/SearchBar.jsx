import { cn } from '@/helpers';
import { MagnifyingGlassIcon } from './icons';

const SearchBar = ({ className, ...rest }) => {
  return (
    <label
      className={cn(
        'flex h-10.25 w-95 max-w-full cursor-text items-center gap-1 rounded-full bg-tint-white px-3 py-1.5 text-primary',
        className
      )}
    >
      <MagnifyingGlassIcon />
      <input
        type="search"
        {...rest}
        className="min-w-0 flex-1 bg-transparent text-sm leading-body outline-none placeholder:text-primary"
      />
    </label>
  );
};

export default SearchBar;
