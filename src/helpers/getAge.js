const getAge = (dateOfBirth) => {
  const birth = new Date(dateOfBirth);
  const today = new Date();

  const age = today.getFullYear() - birth.getFullYear();
  const hasHadBirthday =
    today.getMonth() > birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() >= birth.getDate());

  return hasHadBirthday ? age : age - 1;
};

export default getAge;
