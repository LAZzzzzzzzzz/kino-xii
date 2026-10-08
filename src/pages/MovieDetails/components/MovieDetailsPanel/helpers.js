const EMPTY_VALUE = '—';

const formatNames = (items = []) => items.map((item) => item.name).join(', ');

const formatReleaseDate = (releaseDate) => {
  return new Date(releaseDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
};

export const getDetailFields = (movie) => {
  const fields = [
    { label: 'DIRECTOR', value: movie.director },
    { label: 'MAIN CAST', value: movie.cast },
    { label: 'GENRE', value: formatNames(movie.genres) },
    { label: 'DURATION', value: `${movie.runtimeMinutes} minutes` },
    { label: 'RELEASE DATE', value: formatReleaseDate(movie.releaseDate) },
    { label: 'FORMATS', value: formatNames(movie.formats) },
    { label: 'FROM', value: `₾${movie.fromPrice}` },
  ];

  return fields.map((field) => ({
    ...field,
    value: field.value || EMPTY_VALUE,
  }));
};
