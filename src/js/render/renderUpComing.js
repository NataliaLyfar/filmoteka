import { renderingPaginationMarkup } from '../components/pagination';
import { renderMovie } from './renderByKey';
import { showLoader, hideLoader } from '../components/loader';
import { dataCombine } from '../components/genreUtils.js';
import { getGenres } from '../api/getGeners';
import { upParams, getUpcomingFilms } from '../api/getUpComingFilms';
import { addToStorage } from '../localStorage/storage';

export const renderUpComing = async page => {
  hideLoader();
  upParams.page = page;
  const { ...data } = await getUpcomingFilms(page);
  renderingPaginationMarkup(page, data.total_pages);
  const { genres } = await getGenres();
  const fullInfo = dataCombine(data.results, genres);
  renderMovie(fullInfo);
  const currentPage = data.page;
  addToStorage('active-up', currentPage);
  showLoader();
};
