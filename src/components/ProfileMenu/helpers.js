export const getDisplayName = (user) => user?.fullName || user?.username || '';

export const getFirstName = (user) => getDisplayName(user).split(' ')[0];

export const getInitials = (user) => {
  const name = getDisplayName(user);
  const [first, second] = name.split(' ').filter(Boolean);

  if (second) {
    return `${first[0]}${second[0]}`.toUpperCase();
  }

  return name.slice(0, 2).toUpperCase();
};
