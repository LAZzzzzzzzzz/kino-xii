const AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const AVATAR_MAX_BYTES = 2 * 1024 * 1024;

export const AVATAR_ACCEPT = AVATAR_TYPES.join(',');

export const getAvatarError = (file) => {
  if (!file) {
    return undefined;
  }

  if (!AVATAR_TYPES.includes(file.type)) {
    return 'Use a JPG, PNG or WEBP image';
  }

  return file.size > AVATAR_MAX_BYTES ? 'Image must be under 2MB' : undefined;
};

export const AVATAR_RULES = {
  validate: (files) => getAvatarError(files?.[0]) ?? true,
};

export const CONFIRM_PASSWORD_RULES = {
  required: 'Confirm your password',
  validate: (value, { password }) =>
    value === password || 'Passwords do not match',
};
