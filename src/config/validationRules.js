import { getAge, normalizeMobileNumber } from '@/helpers';

const MIN_AGE = 12;

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

export const FULL_NAME_RULES = {
  required: 'Name is required',
  minLength: {
    value: 3,
    message: 'Name must be at least 3 characters',
  },
  maxLength: {
    value: 50,
    message: 'Name must not exceed 50 characters',
  },
};

export const MOBILE_NUMBER_RULES = {
  required: 'Mobile number is required',
  validate: (value) => {
    const digits = normalizeMobileNumber(value);

    if (!/^\d+$/.test(digits)) {
      return 'Please enter a valid Georgian mobile number (9 digits starting with 5)';
    }

    if (!digits.startsWith('5')) {
      return 'Georgian mobile numbers must start with 5';
    }

    return digits.length === 9 || 'Mobile number must be exactly 9 digits';
  },
};

export const DATE_OF_BIRTH_RULES = {
  required: 'Date of birth is required',
  validate: (value) => {
    const date = new Date(value);

    if (Number.isNaN(date.getTime()) || date > new Date()) {
      return 'Please enter a valid date of birth';
    }

    return (
      getAge(value) >= MIN_AGE ||
      `You must be at least ${MIN_AGE} years old to create an account`
    );
  },
};

export const CARD_NUMBER_RULES = {
  required: 'Card number is required',
  validate: (value) => {
    const digits = String(value).replace(/\s/g, '');

    return /^\d{16}$/.test(digits) || 'Card number must be 16 digits';
  },
};

export const EXPIRY_RULES = {
  required: 'Expiry is required',
  validate: (value) => {
    const match = String(value).match(/^(\d{2})\/(\d{2})$/);

    if (!match) {
      return 'Use MM/YY';
    }

    const [, month, year] = match;

    if (Number(month) < 1 || Number(month) > 12) {
      return 'Use MM/YY';
    }

    const endOfMonth = new Date(2000 + Number(year), Number(month), 1);

    return endOfMonth > new Date() || 'This card has expired';
  },
};

export const CVV_RULES = {
  required: 'CVV is required',
  validate: (value) => /^\d{3}$/.test(String(value)) || 'CVV must be 3 digits',
};
