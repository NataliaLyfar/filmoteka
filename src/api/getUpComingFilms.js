import { api } from './api';
export const upParams = {
    page: 1,
    with_genres: '',
  };
  
  export const getUpcomingFilms = async () => {
    try {
      const { data } = await api.get(`/movie/upcoming`, { params: upParams });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
