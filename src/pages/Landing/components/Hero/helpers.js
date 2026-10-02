export const getPremiereLabel = (releaseDate) => {
  const date = new Date(releaseDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    timeZone: 'UTC',
  });

  return `PREMIERE · WEEK OF ${date.toUpperCase()}`;
};

export const getBannerImage = (movie) => movie.backdropUrl ?? movie.posterUrl;
