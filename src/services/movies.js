import axios from './axios';

export const getFeaturedMoviesRequest = async () => {
  return await axios.get('/movies/featured');
};

export const getNowPlayingMoviesRequest = async () => {
  return await axios.get('/movies/now-playing');
};

export const getComingSoonMoviesRequest = async () => {
  return await axios.get('/movies/coming-soon');
};

export const getMovieRequest = async (slug) => {
  return await axios.get(`/movies/${slug}`);
};

export const getMovieSessionsRequest = async (slug, date) => {
  return await axios.get(`/movies/${slug}/sessions`, { params: { date } });
};

export const searchMoviesRequest = async (query) => {
  return await axios.get('/search', { params: { q: query } });
};

export const notifyMovieRequest = async (slug) => {
  return await axios.post(`/movies/${slug}/notify`);
};
