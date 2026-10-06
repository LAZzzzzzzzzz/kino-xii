const TOKEN_STORAGE_KEY = 'kino-xii-token';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
};
