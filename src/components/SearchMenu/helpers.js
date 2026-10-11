export const PROMPT_STATE = 'prompt';
export const RESULTS_STATE = 'results';
export const NO_RESULTS_STATE = 'no-results';

const KIND_LABELS = {
  film: 'Film',
  event: 'Live event',
};

export const getPanelState = ({ query, movies, isSearching }) => {
  if (!query) {
    return PROMPT_STATE;
  }

  if (movies.length) {
    return RESULTS_STATE;
  }

  return isSearching ? PROMPT_STATE : NO_RESULTS_STATE;
};

export const getTitleParts = (title, query) => {
  const index = title.toLowerCase().indexOf(query.toLowerCase());

  if (!query || index === -1) {
    return [{ text: title, isMatch: false }];
  }

  return [
    { text: title.slice(0, index), isMatch: false },
    { text: title.slice(index, index + query.length), isMatch: true },
    { text: title.slice(index + query.length), isMatch: false },
  ].filter((part) => part.text);
};

export const getMovieMeta = (movie) => {
  const kind = KIND_LABELS[movie.kind] ?? KIND_LABELS.film;

  return `${kind} · ${movie.ageRating.code} · ${movie.runtimeMinutes} min`;
};

export const getTrailing = (movie) => {
  if (movie.isComingSoon) {
    return { label: 'Coming Soon', className: 'text-orange' };
  }

  return { label: `from ₾${movie.fromPrice}`, className: 'text-primary' };
};

export const getResultsLabel = (count) => {
  return `${count} ${count === 1 ? 'result' : 'results'}`;
};
