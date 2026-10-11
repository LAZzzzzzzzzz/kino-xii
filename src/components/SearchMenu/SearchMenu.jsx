import { cn } from '@/helpers';
import SearchBar from '../SearchBar';
import { XIcon } from '../icons';
import SearchPanel from './SearchPanel';
import SearchPanelBody from './SearchPanelBody';
import { useSearchMenu } from './useSearchMenu';

const SearchMenu = ({ className, ...rest }) => {
  const {
    containerRef,
    inputRef,
    query,
    searchedQuery,
    movies,
    isOpen,
    isSearching,
    panelState,
    open,
    close,
    clear,
    changeQuery,
    closeOnEscape,
  } = useSearchMenu();

  return (
    <div
      ref={containerRef}
      {...rest}
      className={cn('relative flex w-full flex-col items-end', className)}
    >
      <SearchBar
        ref={inputRef}
        name="search"
        value={query}
        placeholder="Search films and live events"
        aria-label="Search films and live events"
        aria-expanded={isOpen}
        autoComplete="off"
        onChange={changeQuery}
        onFocus={open}
        onKeyDown={closeOnEscape}
        className={cn(
          'transition-[width,background-color] duration-200 ease-out',
          isOpen && 'w-120 pr-2'
        )}
        trailing={
          query && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={clear}
              className="flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-tint-white text-primary transition-colors duration-150 ease-out hover:bg-white/20"
            >
              <XIcon className="size-5" />
            </button>
          )
        }
      />

      {isOpen && (
        <SearchPanel aria-label="Search suggestions" aria-busy={isSearching}>
          <SearchPanelBody
            state={panelState}
            query={searchedQuery}
            movies={movies}
            onSelect={close}
          />
        </SearchPanel>
      )}
    </div>
  );
};

export default SearchMenu;
