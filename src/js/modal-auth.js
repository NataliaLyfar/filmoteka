import {
    regUser,
    signInUser,
    signOutUser,
  } from './firebase/auth-service.js';
  import {refs} from './refs/refs.js';
  import {hideLoader, showLoader} from './loader.js';

  
function openAuthModal (e) {
  e.preventDefault();
    refs.auth.backdropAuthModal.classList.remove('is-hidden');
}

  refs.auth.logIn?.addEventListener('click', openAuthModal);

export function closeAuthModal () {
  refs.auth.backdropAuthModal.classList.add('is-hidden');
}
function closeAuthModalbyEsc (e) {
  if(e.code === 'Escape'){
    closeAuthModal();
  }
}
function closeAuthModalByClickOnBack (e) {
  if(e.target.closest('.auth-container')) {
    return;
  } 
  closeAuthModal();
}
  
  window.addEventListener('keydown', closeAuthModalbyEsc);
  refs.auth.backdropAuthModal?.addEventListener('click', closeAuthModalByClickOnBack)
 
  refs.auth.signUpLink?.addEventListener('click', ()=>{
    refs.auth.formWrapperSignup.classList.remove('visually-hidden');
    refs.auth.formWrapperLogin.classList.add('visually-hidden');
  }); 
  refs.auth.signInLink?.addEventListener('click', ()=>{
    refs.auth.formWrapperSignup.classList.add('visually-hidden');
    refs.auth.formWrapperLogin.classList.remove('visually-hidden');
  }); 

  function clearInput(ref, number) {
    for (let i = 0; i < number; i++) {
      ref.children[i].value = '';
    }
  }

  refs.auth.formReg?.addEventListener('submit', e => {
    e.preventDefault();
    hideLoader();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const username = formData.get('username');
    regUser(username, email, password);
    clearInput(refs.auth.formReg, 3);
    refs.auth.formWrapperLogin.classList.add('vusually-hidden');
    showLoader();
    closeAuthModal();
    refs.auth.logOut.classList.remove('is-hidden');
    refs.auth.logIn.classList.add('is-hidden');
  });

  refs.auth.formLog?.addEventListener('submit', e => {
    e.preventDefault();
    hideLoader();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    signInUser(email, password);
    showLoader();
    closeAuthModal();
    clearInput(refs.auth.formLog, 2);
    refs.auth.logOut.classList.remove('is-hidden');
    refs.auth.logIn.classList.add('is-hidden');
  });
  
  refs.auth.logOut?.addEventListener('click', () => {
    signOutUser();
    refs.auth.logOut.classList.add('is-hidden');
    refs.auth.logIn.classList.remove('is-hidden');
  });
