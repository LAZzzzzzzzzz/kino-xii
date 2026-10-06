export const USERNAME_RULES = {
  required: 'Username is required',
  minLength: {
    value: 3,
    message: 'At least 3 characters',
  },
};

export const EMAIL_RULES = {
  required: 'Email is required',
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Enter a valid email address',
  },
};

export const PASSWORD_RULES = {
  required: 'Password is required',
  minLength: {
    value: 3,
    message: 'At least 3 characters',
  },
};
