import { Notify } from 'notiflix';
import { getFromStorage } from './storage';
import oneMovieCard from '/src/template/oneMoviecard.hbs';
import { refs } from '../refs/refs';
import { showMovieCard } from '../components/modal_movie';
import { getDataFilms } from '../api/getDataFilms';

const { libraryGallery, btnWatched, btnQueue } = refs.library;

let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}

const dataCombine = movie => {

 
  return {
    ...movie,
    year: movie.release_date.slice(0, 4),
  };
};

export const requestForWatched = () => {
  libraryGallery.innerHTML = '';
  
  const watchedArr = getFromStorage('filmsWatched');

  if (watchedArr?.length === 0) {
    let messageText = ' ';
    if (langStart === "en"){
     messageText = "You don't have any movies in your library. Time to relax! Choose interesting movies to watch and ENJOY!";}
     if (langStart === "uk"){
       messageText = 'У вашiй бiблiотецi вiдсутнi фiльми для перегляду. Час вiдпочивати! Обирайте фiльм та насолоджуйтеся переглядом';
     }
    Notify.info(messageText);
    btnWatched.classList.remove('orange');
  } else {
    watchedArr?.map(id => {
      getDataFilms(id).then(result => {
        const data = result;
        const fullData = dataCombine(data);
        libraryGallery?.insertAdjacentHTML('beforeend', oneMovieCard(fullData));
      });
    });
  }
  btnWatched.classList.add('orange');
  btnQueue.classList.remove('orange');
};

btnWatched?.addEventListener('click', requestForWatched);
libraryGallery?.addEventListener('click', showMovieCard);
