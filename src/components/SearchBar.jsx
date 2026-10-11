import { cn } from '@/helpers';
import { MagnifyingGlassIcon } from './icons';

const SearchBar = ({ className, trailing, ...rest }) => {
  return (
    <label
      className={cn(
        'flex h-10.25 w-95 max-w-full cursor-text items-center gap-2 rounded-full border border-tint-white bg-tint-white px-3 py-1.5 backdrop-blur-[0.4375rem] text-primary transition-colors duration-150 ease-out hover:bg-white/20',
        className
      )}
    >
      <MagnifyingGlassIcon />
      <input
        type="search"
        {...rest}
        className="min-w-0 flex-1 bg-transparent text-sm leading-body outline-none placeholder:text-primary [&::-webkit-search-cancel-button]:hidden"
      />
      {trailing}
    </label>
  );
};

export default SearchBar;
