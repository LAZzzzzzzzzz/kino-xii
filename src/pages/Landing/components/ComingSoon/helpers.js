export const getReleaseLabel = (releaseDate) => {
  const date = new Date(releaseDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  });

  return `In cinemas ${date}`;
};

export const getNotifyState = ({ isNotified, isPending }) => {
  if (isNotified) {
    return { label: 'Notified', isDisabled: true };
  }

  if (isPending) {
    return { label: 'Notifying', isDisabled: true };
  }

  return { label: 'Notify Me', isDisabled: false };
};
