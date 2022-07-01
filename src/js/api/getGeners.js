import { api } from './api';
import { Notify } from 'notiflix';

let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}
const getGenresIdsParams = {
  language: localStorage.lang || 'en',
};

export const getGenres = async () => {
  try {
    const { data } = await api.get('/genre/movie/list', { params: getGenresIdsParams });
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
