const CHECKED_FIELDS = ['fullName', 'mobileNumber'];

export const getFormValues = (user) => ({
  fullName: user.fullName ?? '',
  mobileNumber: user.mobileNumber ?? '',
  dateOfBirth: user.dateOfBirth ?? '',
  preferredVenueId: user.preferredVenue?.id ?? '',
});

export const getEligibilityNote = (age) => {
  if (age === null || age === undefined) {
    return 'Add your date of birth to see which films you can book.';
  }

  if (age < 16) {
    return `You are ${age}, you cannot buy tickets for 16+ or 18+ titles.`;
  }

  if (age < 18) {
    return `You are ${age}, you cannot buy tickets for 18+ titles.`;
  }

  return `You are ${age}, you can buy tickets for all age ratings.`;
};

export const getValidFields = (values, { errors, touchedFields }) =>
  Object.fromEntries(
    CHECKED_FIELDS.map((field) => [
      field,
      Boolean(values[field]) && Boolean(touchedFields[field]) && !errors[field],
    ])
  );
