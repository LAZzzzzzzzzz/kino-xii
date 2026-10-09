import axios from './axios';

export const getFilterOptionsRequest = async () => {
  return await axios.get('/filter-options');
};

export const getSessionsRequest = async (params) => {
  return await axios.get('/sessions', { params });
};
