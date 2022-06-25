import { api } from './api';

export const filmsByGenreParams = {
  page: 1,
  with_genres: '',
};

export const getFilmsByGenre = async () => {
  try {
    const { data } = await api.get(`/discover/movie`, { params: filmsByGenreParams });
    return data;
  } catch (error) {
    console.log(error);
  }
};
