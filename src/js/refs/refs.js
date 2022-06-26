export const refs = {
  home: {
    formEl: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    select: document.querySelector('.genre'),
    option: document.querySelector('option'),
  },
  library: {
    btnQueue: document.querySelector('.btn--queue'),
    libraryGallery: document.querySelector('.gallery--library'),
    btnWatched: document.querySelector('.btn--watched'),
  },
  pagination: {
    paginationList: document.querySelector('.pagination-list'),
    input: document.querySelector('.search-field'),
    libraryGallery: document.querySelector('.gallery--library'),
  },
  theme: {
    body: document.querySelector('body'),
    toggle: document.querySelector('.theme-switch__toggle'),
    footerDarktheme: document.querySelector('.footer'),
    wrapper: document.querySelector('.main-wrapper'),
  },
  trailer: {
    videoplayerBackdrop: document.querySelector('.videoplayer-backdrop'),
    videoplayerContainer: document.querySelector('.videoplayer-container'),
  },
  modalRefs: {
    lightbox: document.querySelector('.modal-movie-lightbox'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
    overlayModal: document.querySelector('.modal-movie-overlay'),
    galleryMovie: document.querySelector('.gallery'),
    galleryMovieLibrary: document.querySelector('.gallery--library'),
    mainContainer: document.querySelector('.main__container'),
    body: document.querySelector('body'),
  },
  scroll: {
    rootElement: document.documentElement,
    scrolltop: document.createElement('a'),
  },
  footer: {
    openBtn: document.querySelector('.js-open-modal'),
    backdrop: document.querySelector('.backdrop'),
  },
  filter: {
    popularBtn: document.querySelector('.popular-btn'),
    topRatedBtn: document.querySelector('.top-rated-btn'),
    upcomingBtn: document.querySelector('.upcoming-btn'),
    searchBtnContainer: document.querySelector('.search-btn'),
  },
  auth: {
    backdropAuthModal: document.querySelector('.auth__modal-backdrop'),
    authContainer: document.querySelector('.auth-container'),
    formWrapperLogin: document.querySelector('#wrapper-login'),
    formWrapperSignup: document.querySelector('#wrapper-signup'),
    formReg: document.querySelector('.form-signup'),
    formLog: document.querySelector('.form-signin'),
    loginBtn: document.querySelector('.btn-login'),
    signUpLink: document.querySelector('.link-to-signup'),
    signInLink: document.querySelector('.link-to-signin'),
    modalSinInError: document.querySelector('.signin-modal__error'),
    modalSinUpError: document.querySelector('.signup-modal__error'),
    logIn: document.querySelector('.js-login'),
    logOut: document.querySelector('.js-logout'),
   googleBtn: document.getElementById('googleBtn')
  }
};
