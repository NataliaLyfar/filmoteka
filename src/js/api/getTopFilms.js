import { api } from './api';
import { Notify } from 'notiflix';

let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}
export const topParams = {
  page: 1,
  language: localStorage.lang || 'en',
};

export const getTopFilms = async () => {
  try {
    const { data } = await api.get('/movie/top_rated', {
      params: topParams});
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
