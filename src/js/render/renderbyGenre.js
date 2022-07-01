import  Choices from 'choices.js';
import genresData from './genres.json';
import { renderingPaginationMarkup } from '../pagination.js';
import { showLoader, hideLoader } from '../loader.js';
import movieCard from '/src/template/movieCard.hbs';
import { dataCombine } from '../genreUtils.js';
import { getGenres } from '/src/api/getGeners';
import {getFilmsByGenre, filmsByGenreParams} from '../../api/getFilmsByGenre.js'
import { refs } from '../refs/refs';
import { addToStorage } from '../localStorage/storage.js';
import {filter} from '../filter'


const {select} = refs.home;
if(document.title === 'Home'){
const choicesgenre = new Choices(select, {
   itemSelectText: "",
   allowHTML: true,
   removeItemButton: true,
   removeItems: true,
});

const onSelectChange = () => {
  refs.home.gallery.innerHTML = '';
  refs.pagination.input.value = '';
  refs.filter.popularBtn.classList.remove('btn-tab-active');
  refs.filter.topRatedBtn.classList.remove('btn-tab-active');
refs.filter.upcomingBtn.classList.remove('btn-tab-active');
  let genre = genresData.filter(({ name }) => name === select.value).map(({ id }) => id).join('');
filmsByGenreParams.with_genres = genre;
let startPage = 1;
filmsByGenreParams.page = startPage;
  renderByGenre(startPage);
}
select?.addEventListener('change', onSelectChange);
}
const renderMovie = data =>
  refs.home.gallery?.insertAdjacentHTML('beforeend', movieCard(data));
export async function renderByGenre(page) {
  hideLoader();
filmsByGenreParams.page = page;
    const { ...data } = await getFilmsByGenre();
    const movies = data.results;
    const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
    renderingPaginationMarkup(page, totalPages);
    const { genres } = await getGenres();
    const fullInfo = dataCombine(movies, genres);
    renderMovie(fullInfo);
    const currentPage = data.page;
    addToStorage('select', currentPage);
    showLoader();
}
if (document.title === 'Home') {
  renderByGenre();
}



