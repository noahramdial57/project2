let nameH1;
let p_id;
let climate;
let terrain;
let gravity;
let diameter;
let population;
let rotation;
let surface;
let characters;
let films;
const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  nameH1 = document.querySelector('h1#name');//planetname
  climate = document.querySelector('span#climate');
  terrain = document.querySelector('span#terrain');
  gravity = document.querySelector('span#gravity');
  diameter = document.querySelector('span#diameter');
  population = document.querySelector('span#population');
  rotation = document.querySelector('span#rotation');
  water = document.querySelector('span#water');
  films = document.querySelector('#films>ul');
  characters = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getPlanet(id)
});

async function getPlanet(id) {
    let planet;
    try {
      planet = await fetchPlanet(id)
      planet.characters = await fetchCharacters(planet);
      planet.films = await fetchFilms(planet);
      renderFilm(planet);
    }
    catch (ex) {
      console.error(`Error reading Planet ${id} data.`, ex.message);
    }
    renderPlanet(planet);
  
}

async function fetchPlanet(id) {
    let planetUrl = `${baseUrl}/Planets/${id}`;
    console.log(planetUrl)
    return await fetch(planetUrl)
      .then(res => res.json())
}

async function fetchCharacters(planet) {
  let url = `${baseUrl}/planets/${planet.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchFilms(planet) {
  let url = `${baseUrl}/planets/${planet.id}/films`;
  const films = await fetch(url)
    .then(res => res.json())
  return films;
}

//for all hometown = p_id:
//add character names to list and print

const renderPlanet = planet => {
  p_id = planet?.id;
  climate.textContent = planet?.climate;
  terrain.textContent = planet?.terrain;
  gravity.textContent = planet?.gravity;
  diameter.textContent = planet?.diameter;
  population.textContent = planet?.population;
  rotation.textContent = planet?.rotation_period;
  water.textContent = planet?.surface_water;

  const charactersLis = planet?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  const filmsLis = planet?.films?.map(film => `<li><a href="/planet.html?id=${film.id}">${film.title}</a></li>`)
  characters.innerHTML = charactersLis.join("");
  films.innerHTML = filmsLis.join("");
}