import {userId} from './js/firebase/auth-service.js';
import './js/components/modal-auth'
import { requestForPage } from './js/render/renderPopularMovies.js';
import './js/render/renderByKey.js';
import './js/render/renderbyGenre.js'
import './js/components/scrollTop';
import './js/components/footer-modal';
import './js/components/genreUtils';
import './js/localStorage/change-theme';
import './js/components/modal_movie';
import './js/localStorage/storage';
import './js/render/video-trailer';
import './js/components/pagination.js';
import { requestForWatched } from './js/localStorage/watched.js';
import './js/localStorage/queue.js';
import './js/components/Notify.js';
import { onChangeSize } from './js/components/Notify.js';
import './js/components/filter.js';
import {refs} from './js/refs/refs';
import changeLang from './js/components/selectLang'

let startPage = 1;
if (document.title === 'Home') {
  requestForPage(startPage);
}


if (document.title === 'My Library') {
  requestForWatched();
}

window.addEventListener('resize', onChangeSize);
if (document.title === 'Home'){
if (sessionStorage.getItem('userId')){
  refs.auth.logOut.classList.remove('is-hidden');
  refs.auth.logIn.classList.add('is-hidden');
} else {
  refs.auth.logOut.classList.add('is-hidden');
  refs.auth.logIn.classList.remove('is-hidden');
}}
