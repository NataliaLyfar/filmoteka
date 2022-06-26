import { api } from './api';

export const popularParams = {
  page: 1,
  with_genres: '',
};

export const getPopularMovie = async () => {
  try {
    const { data } = await api.get('/trending/movie/day', {
      params: popularParams,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
