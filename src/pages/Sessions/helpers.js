const DAYS_IN_PICKER = 7;
const PAGE_WINDOW = 1;

export const DEFAULT_SORT = 'time_asc';
export const FILTER_KEYS = ['venues', 'formats', 'languages', 'bands'];
const PAGE_GAP = 'gap';

const toIsoDate = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${date.getFullYear()}-${month}-${day}`;
};

const getToday = () => toIsoDate(new Date());

const parseList = (value) => (value ? value.split(',').filter(Boolean) : []);

export const parseFilters = (searchParams) => {
  const filters = {
    date: searchParams.get('date') || getToday(),
    sort: searchParams.get('sort') || DEFAULT_SORT,
    page: Number(searchParams.get('page')) || 1,
  };

  FILTER_KEYS.forEach((key) => {
    filters[key] = parseList(searchParams.get(key));
  });

  return filters;
};

export const toSearchParams = (filters) => {
  const params = {};

  FILTER_KEYS.forEach((key) => {
    if (filters[key].length) {
      params[key] = filters[key].join(',');
    }
  });

  if (filters.date !== getToday()) {
    params.date = filters.date;
  }

  if (filters.sort !== DEFAULT_SORT) {
    params.sort = filters.sort;
  }

  if (filters.page > 1) {
    params.page = String(filters.page);
  }

  return params;
};

export const toRequestParams = (filters) => ({
  date: filters.date,
  venues: filters.venues,
  formats: filters.formats,
  languages: filters.languages,
  bands: filters.bands,
  sort: filters.sort,
  page: filters.page,
});

export const getDateOptions = () => {
  const today = new Date();

  return Array.from({ length: DAYS_IN_PICKER }, (_, offset) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + offset
    );

    return {
      value: toIsoDate(date),
      weekday: date.toLocaleDateString('en-GB', { weekday: 'short' }),
      day: date.getDate(),
      label: date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
      }),
    };
  });
};

export const getAvailableFormats = (formats, venues, selectedVenues) => {
  if (!selectedVenues.length) {
    return formats;
  }

  const allowed = new Set(
    venues
      .filter((venue) => selectedVenues.includes(venue.slug))
      .flatMap((venue) => venue.formats.map((format) => format.slug))
  );

  return formats.filter((format) => allowed.has(format.slug));
};

export const getToggleChanges = ({ filters, key, value, venues, formats }) => {
  const current = filters[key];
  const next = current.includes(value)
    ? current.filter((item) => item !== value)
    : [...current, value];

  if (key !== 'venues') {
    return { [key]: next };
  }

  const available = getAvailableFormats(formats, venues, next).map(
    (format) => format.slug
  );

  return {
    venues: next,
    formats: filters.formats.filter((slug) => available.includes(slug)),
  };
};

export const getClearedFilters = () =>
  Object.fromEntries(FILTER_KEYS.map((key) => [key, []]));

export const countActiveFilters = (filters) =>
  FILTER_KEYS.reduce((total, key) => total + filters[key].length, 0);

export const getActiveFiltersLabel = (count) => {
  const unit = count === 1 ? 'filter' : 'filters';

  return `${count} ${unit} active`;
};

export const getResultsSummary = (meta) => {
  if (!meta || !meta.totalSessions) {
    return 'No sessions found';
  }

  const unit = meta.totalSessions === 1 ? 'session' : 'sessions';

  return `Showing ${meta.totalSessions} ${unit}`;
};

export const splitBandLabel = (label) => {
  const match = label.match(/^(.*?)\s*\((.*)\)$/);

  if (!match) {
    return { name: label, detail: null };
  }

  return { name: match[1], detail: match[2] };
};

export const getPageItems = (page, lastPage) => {
  const pages = new Set([1, lastPage]);

  for (let offset = -PAGE_WINDOW; offset <= PAGE_WINDOW; offset += 1) {
    const candidate = page + offset;

    if (candidate >= 1 && candidate <= lastPage) {
      pages.add(candidate);
    }
  }

  const sorted = [...pages].sort((first, second) => first - second);

  return sorted.flatMap((value, index) => {
    const previous = sorted[index - 1];

    if (previous && value - previous > 1) {
      return [
        { key: `${PAGE_GAP}-${value}`, value: null },
        { key: value, value },
      ];
    }

    return [{ key: value, value }];
  });
};
