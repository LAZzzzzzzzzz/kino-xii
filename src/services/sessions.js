import axios from './axios';

export const getFilterOptionsRequest = async () => {
  return await axios.get('/filter-options');
};

export const getSessionsRequest = async (params) => {
  return await axios.get('/sessions', { params });
};

export const getSessionRequest = async (sessionId) => {
  return await axios.get(`/sessions/${sessionId}`);
};

export const getSeatMapRequest = async (sessionId) => {
  return await axios.get(`/sessions/${sessionId}/seats`);
};

export const holdSeatsRequest = async (sessionId, seats) => {
  return await axios.post(`/sessions/${sessionId}/holds`, { seats });
};
