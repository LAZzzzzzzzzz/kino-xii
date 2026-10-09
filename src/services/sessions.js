import axios from './axios';

export const getFilterOptionsRequest = async () => {
  return await axios.get('/filter-options');
};
