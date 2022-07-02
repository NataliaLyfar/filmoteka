
import { langArr, genrelist } from '../localStorage/localLang.js';
import {refs} from '../refs/refs';

const AllLng = ['en', 'uk'];

const langStart = localStorage.getItem('lang') || '';

if (langStart !== '') {
  refs.home.langSelector.value = langStart;
  location.href = window.location.pathname + '#' + langStart;
}

changeLang();


refs.home.langSelector.addEventListener('change', changeUrlLng);

function changeUrlLng() {
  let lang = refs.home.langSelector.value;
  location.href = window.location.pathname + '#' + lang;
  changeLang();
}

if (refs.pagination.input) {
  if (langStart === "en"){
    refs.pagination.input.placeholder = "Search films"
    };
    
    if (langStart === "uk"){
        refs.pagination.input.placeholder = "Знайти фільм"
    };
}
if (refs.auth.inputEmail) {
    if (langStart === "en"){
      refs.auth.inputEmail.placeholder = 'Email'
      };
      if (langStart === "uk"){
          refs.auth.inputEmail.placeholder ='Пошта'
      };
  }
  if (refs.auth.inputEmailReg) {
    if (langStart === "en"){
      refs.auth.inputEmailReg.placeholder = 'Email'
      };
      if (langStart === "uk"){
          refs.auth.inputEmailReg.placeholder ='Пошта'
      };
  }
  if (refs.auth.inputPassword) {
    if (langStart === "en"){
      refs.auth.inputPassword.placeholder = 'Password'
      };
      if (langStart === "uk"){
          refs.auth.inputPassword.placeholder ='Пароль'
      };
  }
  if (refs.auth.inputPasswordReg) {
    if (langStart === "en"){
      refs.auth.inputPasswordReg.placeholder = 'Password'
      };
      if (langStart === "uk"){
          refs.auth.inputPasswordReg.placeholder ='Пароль'
      };
  }
  if (refs.auth.inputName) {
    if (langStart === "en"){
      refs.auth.inputName.placeholder = 'Username'
      };
      if (langStart === "uk"){
          refs.auth.inputName.placeholder ="Iм'я"
      };
  }

function changeLang() {
  let hash = window.location.hash;
  hash = hash.slice(1);
  if (!AllLng.includes(hash)) {
    location.href = window.location.pathname + '#en';
    localStorage.setItem('lang', 'en');
    refs.html.setAttribute('lang', 'en');
  }
  refs.html.setAttribute('lang', hash);
  localStorage.setItem('lang', hash);
  refs.home.langSelector.value = hash;
  for (let key in langArr) {
    let elem = document.querySelector(`[data-lng="${key}"]`);
    if (elem && key) {
      elem.innerHTML = langArr[key][hash];
    } 
}
const list = document.querySelectorAll(".choices__item");
const newList = [...list];
for (let key in genrelist) {
    for (const element of newList) {
        if (element.outerText === key) {
            element.innerHTML = genrelist[key][hash];
        }
        if (element.innerHTML === key) {
            element.innerHTML = genrelist[key][hash];
        }
    }    
}
}
refs.home.langSelector.addEventListener('change', e => window.location.reload());


export {changeLang};