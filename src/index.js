import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import getRefs from './get-refs/getRefs';
const DEBOUNCE_DELAY = 300;

console.log(result);

const refs = getRefs();

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
        createCounrysList(data);
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

function createCounrysList(countries) {
  const markUP = countries.map(country => {
    return `<li><img src="${country.flags.svg}" width='40' height='25' alt="${country.name.official}"><p>${country.name.official}</p></li>`;
  });
  refs.countryList.innerHTML = markUP;
}

function createCountry(countries) {
  const markUP = countries.map(country => {
    return `<li><img src="${country.flags.svg}" width='60' height='40' alt="${country.name.official}"><p>${country.name.official}</p></li>`;
  });
  refs.countryList.innerHTML = markUP;

  const countryInfo = countries.map(country => {
    return `<p> capital:${country.capital}</p>
    <p>population:${country.population}</p>
    <p>languages:${Object.values(country.languages)}</p>`;
  });
  refs.box.innerHTML = countryInfo;
}

function clearMarkup() {
  refs.box.innerHTML = '';
  refs.countryList.innerHTML = '';
}
