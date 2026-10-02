import axios from './axios';

export const getFeaturedMoviesRequest = async () => {
  return await axios.get('/movies/featured');
};
