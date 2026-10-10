const HOLD_STORAGE_PREFIX = 'kino-xii-hold-';

const getStorageKey = (sessionId) => `${HOLD_STORAGE_PREFIX}${sessionId}`;

export const setHoldId = (sessionId, holdId) => {
  localStorage.setItem(getStorageKey(sessionId), holdId);
};

export const getHoldId = (sessionId) => {
  return localStorage.getItem(getStorageKey(sessionId));
};

export const removeHoldId = (sessionId) => {
  localStorage.removeItem(getStorageKey(sessionId));
};
