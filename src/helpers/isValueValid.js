const isValueValid = (value, { pattern, minLength } = {}) => {
  if (!value) {
    return false;
  }

  if (pattern && !pattern.value.test(value)) {
    return false;
  }

  return !minLength || value.length >= minLength.value;
};

export default isValueValid;
