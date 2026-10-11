import { getResultsLabel } from './helpers';
import SearchResultRow from './SearchResultRow';

const SearchResults = ({ movies, query, onSelect }) => {
  return (
    <div className="flex flex-col">
      <header className="flex items-start justify-between px-2.5 pt-2 pb-1.5">
        <h2 className="text-xs font-semibold tracking-overline text-secondary uppercase">
          Films &amp; events
        </h2>
        <p className="text-xs leading-body text-secondary">
          {getResultsLabel(movies.length)}
        </p>
      </header>

      <ul className="flex flex-col gap-0.5">
        {movies.map((movie) => (
          <li key={movie.id}>
            <SearchResultRow movie={movie} query={query} onSelect={onSelect} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResults;
