export function fetchCountries(name) {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,flags,languages,capital,population`
  )
    .then(r => {
      if (!r.ok) {
        if (r.status === 404) {
          return [];
        }
        throw new Error(r.status);
      }
      return r.json();
    })
    .catch(err => console.log(err));
}
