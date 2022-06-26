import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import {
  getDatabase,
  set,
  ref,
  update,
} from 'firebase/database';
import {firebaseConfig} from './auth-config.js';
import {refs} from '../refs/refs';
import {closeAuthModal} from '../modal-auth'
import {hideLoader, showLoader} from '../loader.js'


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const auth = getAuth();
export const user = auth.currentUser;
export let userId = sessionStorage.getItem('userId');

export function regUser(username, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(db, 'users/' + user.uid), {
        username: username,
        email: email
      })
      updateProfile(user, { displayName });
      closeAuthModal();
    })
    .catch(error => {
      const errorMessage = error.message;
      setTimeout(()=>signUpErrorRender(errorMessage), 500);
    });
};
export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // if (localStorage.getItem('idFilm') !== null) {
      //   updateButton(localStorage.getItem('idFilm'));
      // }
      const dt = new Date();
      const user =  userCredential.user;
      update(ref(db, 'users/' + user.uid), {
        last_login: dt,
      })
      closeAuthModal();
    })
    .catch(error => {
      const errorMessage = error.message;
      setTimeout(()=>signInErrorTextRender(errorMessage), 500);
    });
}
export function logInByGoogle() {
  const provider = new GoogleAuthProvider(app);
  signInWithRedirect(auth, provider);
  AuthState(user);
  closeAuthModal();
}
export async function AuthState(user) {
  return await onAuthStateChanged(auth, user => {
    if (user) {
      const dt = new Date();
        update(ref(db, 'users/' + user.uid), {
          last_login: dt,
        })
        refs.auth.logOut?.classList.remove('is-hidden');
        refs.auth.logIn?.classList.add('is-hidden');
      return sessionStorage.setItem('userId', `${user.uid}`);
    } else {
      return;
    }
    
  });
}
if(document.title === 'Home'){
window.onload = function () {
  setTimeout(hideLoader, 1500)
  setTimeout(showLoader, 2000)
  AuthState(user);
};}
export async function updateInUser(name) {
  return await updateProfile(auth.currentUser, {
    displayName: `${name}`,
  })
}
export async function signOutUser() {
  return await signOut(auth)
    .then(() => {
      userId = null;
      localStorage.removeItem('userId');
      sessionStorage.removeItem('userId');
    })

}

function signInErrorTextRender(errorMessage) {
  let errorText = ' ';

  if (errorMessage === 'Firebase: Error (auth/user-not-found).') {
  errorText = 'User not found. Please, try again!';
  } else if (errorMessage === 'Firebase: Error (auth/wrong-password).') {
    errorText = 'Wrong password. Please, try again!';
  } else if (
    errorMessage ===
    'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
  ) {
    errorText = 'Too many attempts. Try again later!';
  } 
  refs.auth.modalSinInError.innerHTML = `<p class="modal__error-text">${errorText}</p>`;
}

function signUpErrorRender(errorMessage) {
  let errorText = '';

  if (errorMessage === 'Firebase: Error (auth/email-already-in-use).') {
    errorText = 'User is already registered';
  } else {
    errorText = 'Unknow Error';
  }
  refs.auth.modalSinUpError.innerHTML = `<p class="modal__error-text">${errorText}</p>`;
}

