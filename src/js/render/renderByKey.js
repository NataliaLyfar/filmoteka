import { Notify } from 'notiflix';
import { renderingPaginationMarkup } from '../components/pagination';
import { showLoader, hideLoader } from '../components/loader.js';
import movieCard from '/src/template/movieCard.hbs';
import { dataCombine } from '../components/genreUtils.js';
import { getGenres } from '../api/getGeners';
import { filmsParams, getFilmsByKey } from '../api/getFilmsByKey.js';
import { refs } from '../refs/refs';
import { addToStorage } from '../localStorage/storage.js';

let langStart = localStorage.getItem('lang') || '';
if (langStart === '') {
  localStorage.setItem('lang', 'en');
  langStart = 'en';
}
export const renderMovie = data =>
  refs.home.gallery?.insertAdjacentHTML('beforeend', movieCard(data));

export const requestForMovie = async page => {
  hideLoader();

  filmsParams.page = page;
  const { ...data } = await getFilmsByKey();
  const movies = data.results;
  const totalSearchPages = data.total_pages;
  renderingPaginationMarkup(page, totalSearchPages);
  if (movies.length === 0) {
    showLoader();
    refs.pagination.paginationList.innerHTML = '';
    let messageText = ' ';
    if (langStart === "en"){
     messageText = 'Search result not successful. Enter the correct movie name and try again.';}
     if (langStart === "uk"){
       messageText = 'Невдалий результат пошуку. Введiть коректну назву фiльму. Спробуйте ще!';
     }
    Notify.failure(messageText);
    return;
  }
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-search', currentPage);
  showLoader();
};

const onSearch = e => {
  e.preventDefault();
  refs.home.gallery.innerHTML = '';
  refs.home.select.value = '';
  let query = e.currentTarget.elements[0].value;
  filmsParams.query = query;
  if (filmsParams.query.length <= 1) {
    refs.pagination.paginationList.innerHTML = '';
    let messageText = ' ';
    if (langStart === "en"){
     messageText = 'Search result not successful. Enter the correct movie name and try again.';}
     if (langStart === "uk"){
       messageText = 'Невдалий результат пошуку. Введiть коректну назву фiльму. Спробуйте ще!';
     }
    Notify.failure(messageText);
    return;
  }
  let startPage = filmsParams.page;
  requestForMovie(startPage);

};

refs.home.formEl?.addEventListener('submit', onSearch);
