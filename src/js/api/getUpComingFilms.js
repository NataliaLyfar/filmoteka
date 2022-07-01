import { api } from './api';
import { Notify } from 'notiflix';

let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}
export const upParams = {
    page: 1,
    with_genres: '',
    language: localStorage.lang || 'en',
  };
  
  export const getUpcomingFilms = async () => {
    try {
      const { data } = await api.get(`/movie/upcoming`, { params: upParams });
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
