import { Notify } from 'notiflix';
import axios from 'axios';
import { BASE_URL, API_KEY } from '../api/api.js';
import { pageRefs } from '../pagination.js';
import movieCard from '../../template/movieCard.hbs';
import { dataCombine, getGenres } from './fetchDateAndGenres.js';

const formEl = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');

const filmsParams = {
  query: '',
  page: 1,
};

const customAxios = axios.create({
  baseURL: `${BASE_URL}/search/movie?api_key=${API_KEY}`,
});

const fetchfilmsByKey = async params => {
  try {
    const { data } = await customAxios.get('', { params });
    console.log(data);
    return data;
  } catch {
    Notify.failure(
      'Search result not successful. Enter the correct movie name and  try again'
    );
  }
};

const renderMovie = movie =>
  gallery.insertAdjacentHTML('beforeend', movieCard(movie));

const creatGallary = async () => {
  await fetchfilmsByKey(filmsParams).then(data => {
    const movies = data.results;
    renderMovie(movies);
    console.log(movies);
    const allGenres = getGenres();
    console.log(allGenres);
    const fullSearchData = dataCombine(movies, allGenres);
  });
};

const onSearch = e => {
  e.preventDefault();
  filmsParams.query = e.currentTarget.elements[0].value;

  if (filmsParams.query.length <= 1) {
    return Notify.info(
      'No matches found for your query. Enter the correct movie name.'
    );
  }

  gallery.innerHTML = '';
  creatGallary();

  // pageRefs.page1Btn.hidden = false;
  // pageRefs.showedPageArr.forEach(page => (page.hidden = true));
  // pageRefs.afterDotsPage.hidden = true;
  // pageRefs.lastPageBtn.hidden = true;
  // pageRefs.arrowRightBtn.hidden = true;
  // pageRefs.page1Btn.classList.add('pagination__button--current');
};

formEl.addEventListener('submit', onSearch);
