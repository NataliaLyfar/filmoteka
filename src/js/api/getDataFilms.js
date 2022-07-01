import { api } from './api';
import { Notify } from 'notiflix';
import {showLoader, hideLoader} from '../components/loader';

const getDataParams = {
  language: localStorage.lang || 'en',
};
let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}
export const getDataFilms = async id => {
  try {
    hideLoader();
    const { data } = await api.get(`/movie/${id}`, { params: getDataParams });
    showLoader();
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
