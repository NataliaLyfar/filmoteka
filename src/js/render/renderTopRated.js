import { renderingPaginationMarkup } from '../components/pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../components/loader.js';
import { dataCombine } from '../components/genreUtils.js';
import { getGenres } from '../api/getGeners';
import { topParams, getTopFilms } from '../api/getTopFilms';
import { addToStorage } from '../localStorage/storage';

export const renderTopRated = async page => {
  hideLoader();
  topParams.page = page;
  const { ...data } = await getTopFilms();
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;
  renderingPaginationMarkup(page, totalPages);
  const movies = data.results;
  const { genres } = await getGenres();
  const fullInfo = dataCombine(movies, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-top', currentPage);
  showLoader();
};
