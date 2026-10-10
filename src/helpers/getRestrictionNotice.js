const getRestrictionNotice = (movie, user) => {
  const { code, minAge } = movie.ageRating;

  if (!user) {
    return null;
  }

  if (!user.profileComplete) {
    return 'Complete your profile with your date of birth before you can buy tickets.';
  }

  if (minAge === 0 || user.age >= minAge) {
    return null;
  }

  return `This film is rated ${code}. You cannot buy tickets for it with this account.`;
};

export default getRestrictionNotice;
