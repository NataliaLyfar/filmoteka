import { api } from './api';
import { Notify } from 'notiflix';

let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}
export const filmsByGenreParams = {
  page: 1,
  with_genres: '',
  language: localStorage.lang || 'en',
};

export const getFilmsByGenre = async () => {
  try {
    const { data } = await api.get(`/discover/movie`, { params: filmsByGenreParams });
    return data;
  } catch {
    let messageText = ' ';
    if (langStart === "en"){
     messageText = 'Search result not successful';}
     if (langStart === "uk"){
       messageText = 'Невдалий результат пошуку';
     }
    Notify.failure(messageText);
  }
};
