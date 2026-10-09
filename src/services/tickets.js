import axios from './axios';

export const getTicketsRequest = async () => {
  return await axios.get('/tickets');
};

export const refundOrderRequest = async (reference) => {
  return await axios.post(`/orders/${reference}/refund`);
};
