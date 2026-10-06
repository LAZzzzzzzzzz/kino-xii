import axios from 'axios';
import { getToken, removeToken } from '@/helpers';

const IGNORE_UNAUTHORIZED = 'ignore';
const CLEAR_UNAUTHORIZED = 'clear';

let unauthorizedHandler = null;

export const setUnauthorizedHandler = (handler) => {
  unauthorizedHandler = handler;
};

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const behavior = error.config?.unauthorizedBehavior;

      if (behavior !== IGNORE_UNAUTHORIZED) {
        removeToken();
      }

      if (behavior !== IGNORE_UNAUTHORIZED && behavior !== CLEAR_UNAUTHORIZED) {
        unauthorizedHandler?.();
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
