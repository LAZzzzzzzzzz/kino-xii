const getDisplayName = (user) => user?.fullName || user?.username || '';

export default getDisplayName;
