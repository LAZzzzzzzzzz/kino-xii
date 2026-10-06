import axios from './axios';

export const loginRequest = async (credentials) => {
  return await axios.post('/login', credentials, {
    unauthorizedBehavior: 'ignore',
  });
};

export const registerRequest = async (fields) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(name, value);
    }
  });

  return await axios.post('/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    unauthorizedBehavior: 'ignore',
  });
};

export const getCurrentUserRequest = async () => {
  return await axios.get('/me', { unauthorizedBehavior: 'clear' });
};

export const logoutRequest = async () => {
  return await axios.post('/logout');
};
