import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  getDatabase,
  set,
  ref,
  update,
} from 'firebase/database';
import {refs} from '../refs/refs';

const firebaseConfig = {
  apiKey: "AIzaSyBSEyaPe326EMRwJE-55WH9fYKOm1pd2ic",
  authDomain: "filmoteka-7e584.firebaseapp.com",
  databaseURL: "https://filmoteka-7e584-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "filmoteka-7e584",
  storageBucket: "filmoteka-7e584.appspot.com",
  messagingSenderId: "14016742908",
  appId: "1:14016742908:web:0e03090a7164e86a1ade79"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth();

export let userId = sessionStorage.getItem('userId');

export function regUser(username, email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      const user = userCredential.user;
      set(ref(db, 'users/' + user.uid), {
        username: username,
        email: email
      })
   sessionStorage.setItem('userId', `${user.uid}`);
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
     sessionStorage.setItem('userId', `${user.uid}`);
    })
    .catch(error => {
      const errorMessage = error.message;
      setTimeout(()=>signInErrorTextRender(errorMessage), 500);
    });
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
  } 
  refs.auth.modalSinUpError.innerHTML = `<p class="modal__error-text">${errorText}</p>`;
}

