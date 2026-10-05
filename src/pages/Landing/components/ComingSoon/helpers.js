export const getReleaseLabel = (releaseDate) => {
  const date = new Date(releaseDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });

  return `In cinemas ${date}`;
};
