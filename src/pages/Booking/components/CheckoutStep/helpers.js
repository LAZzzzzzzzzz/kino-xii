const MAX_EXPIRY_DIGITS = 4;

export const maskExpiry = (value) => {
  const digits = String(value).replace(/\D/g, '').slice(0, MAX_EXPIRY_DIGITS);

  if (digits.length <= 2) {
    return digits;
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export const getFormValues = (user) => ({
  fullName: user?.fullName ?? '',
  email: user?.email ?? '',
  mobileNumber: user?.mobileNumber ?? '',
  cardNumber: '',
  expiry: '',
  cvv: '',
});
