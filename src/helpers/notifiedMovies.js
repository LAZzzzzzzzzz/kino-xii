const STORAGE_KEY = 'kino-xii:notified-movies';

const getStore = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}');

    if (!stored || typeof stored !== 'object' || Array.isArray(stored)) {
      return {};
    }

    return stored;
  } catch {
    return {};
  }
};

const getUserSlugs = (store, userId) => {
  const slugs = store[String(userId)];

  return Array.isArray(slugs) ? slugs : [];
};

export const isMovieNotified = (userId, slug) => {
  if (!userId || !slug) {
    return false;
  }

  return getUserSlugs(getStore(), userId).includes(slug);
};

export const recordNotifiedMovie = (userId, slug) => {
  if (!userId || !slug) {
    return;
  }

  const store = getStore();
  const slugs = getUserSlugs(store, userId);

  if (slugs.includes(slug)) {
    return;
  }

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...store, [String(userId)]: [...slugs, slug] })
    );
  } catch {
    return;
  }
};
