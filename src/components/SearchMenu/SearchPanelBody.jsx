import { MagnifyingGlassIcon, PopcornIcon } from '../icons';
import { NO_RESULTS_STATE, RESULTS_STATE } from './helpers';
import SearchEmptyState from './SearchEmptyState';
import SearchResults from './SearchResults';

const SearchPanelBody = ({ state, query, movies, onSelect }) => {
  if (state === RESULTS_STATE) {
    return <SearchResults movies={movies} query={query} onSelect={onSelect} />;
  }

  if (state === NO_RESULTS_STATE) {
    return (
      <SearchEmptyState
        icon={<MagnifyingGlassIcon className="size-6" />}
        title={`No results for “${query}”`}
        description="Check the spelling or try another film or live event."
        onSelect={onSelect}
      />
    );
  }

  return (
    <SearchEmptyState
      icon={<PopcornIcon className="size-6" />}
      title="What do you want to watch?"
      description="Search by title, director or cast"
      onSelect={onSelect}
    />
  );
};

export default SearchPanelBody;
