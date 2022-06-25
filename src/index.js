import './js/firebase/auth-service.js';
import './js/modal-auth.js'
import { requestForPage } from './js/render/renderPopularMovies.js';
import './js/render/renderByKey.js';
import './js/render/renderbyGenre.js'
import './js/scrollTop';
import './js/footer-modal.js';
import './js/genreUtils.js';
import './js/localStorage/change-theme';
import './js/modal_movie.js';
import './js/localStorage/storage';
import './js/render/video-trailer';
import './js/pagination.js';
import { requestForWatched } from './js/localStorage/watched.js';
import './js/localStorage/queue.js';
import './js/Notify.js';
import { onChangeSize } from './js/Notify.js';
import './js/filter.js';
import {AuthState, user} from '../src/js/firebase/auth-service.js';
import {refs} from './js/refs/refs.js';
// import { getGenres } from './api/getGeners.js';

let firstPage = 1;

if (document.title === 'Home') {
  requestForPage(firstPage);
}
if (document.title === 'My Library') {
  requestForWatched();
}

window.addEventListener('resize', onChangeSize);
window.onload = function () {
  AuthState(user);
  if (sessionStorage.getItem('userId')){
    refs.auth.logOut?.classList.remove('is-hidden');
    refs.auth.logIn?.classList.add('is-hidden');
  } else {
  refs.auth.logOut?.classList.add('is-hidden');
  refs.auth.logIn?.classList.remove('is-hidden');}
};

