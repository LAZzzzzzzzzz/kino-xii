import axios from './axios';

export const updateProfileRequest = async (fields) => {
  const formData = new FormData();

  Object.entries(fields).forEach(([name, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      formData.append(name, value);
    }
  });

  return await axios.put('/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
