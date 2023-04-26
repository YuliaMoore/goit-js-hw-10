import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';

const DEBOUNCE_DELAY = 300;

console.log(result);

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  box: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(onInputHandler, DEBOUNCE_DELAY));

function onInputHandler(e) {
  e.preventDefault();
  const inputName = refs.input.value.trim();
  clearMarkup();
  if (inputName) {
    return fetchCountries(inputName).then(data => {
      if (data.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      } else if (data.length >= 2 && data.length <= 10) {
        createCountryList(data);
        Notify.success('success');
      } else if (data.length === 1) {
        createCountry(data);
        Notify.success('success');
      } else {
        Notify.failure('Oops, there is no country with that name');
      }
    });
  }
  console.log(inputName);
}

function createCountryList(countries) {
  const markUp = countries.map(country => {
    return `<li><img scr="${country.flags.svg}" width='60' height='40' alt="${country.name.official}"><p>${country.name.official}</p></li>`;
  });
  refs.countryList.innerHTML = markUp;

  const countryInfo = countries.map(country => {
    return `<p> capital: ${country.capital}</p>
        <p>languages:${Object.values(country.languages)}</p>`;
  });
  refs.box.innerHTML = countryInfo;
}

function clearMarkup() {
  refs.box.innerHTML = '';
  refs.countryList.innerHTML = '';
}
