let title;
let release_date;
let director;
let episode_id;
let characters;
let planets;

const baseUrl = `https://swapi2.azurewebsites.net/api`;

// Runs on page load
addEventListener('DOMContentLoaded', () => {
  title = document.querySelector('h1#title');
  release_date = document.querySelector('span#release_date');
  director = document.querySelector('span#director');
  episode_id = document.querySelector('span#episode_id');
  homeworldSpan = document.querySelector('span#homeworld');
  planets = document.querySelector('#planets>ul');
  characters = document.querySelector('#characters>ul');
  const sp = new URLSearchParams(window.location.search)
  const id = sp.get('id')
  getFilm(id)
});

async function getFilm(id) {
    let film;
    try {
      film = await fetchFilm(id)
      film.characters = await fetchCharacters(film);
      film.planets = await fetchPlanets(film);
      renderFilm(film);
    }
    catch (ex) {
      console.error(`Error reading film ${id} data.`, ex.message);
    }
    renderFilm(film);
  
  }
  
async function fetchFilm(id) {
  let filmUrl = `${baseUrl}/films/${id}`;
  return await fetch(filmUrl)
    .then(res => res.json())
}

async function fetchCharacters(film) {
  let url = `${baseUrl}/films/${film.id}/characters`;
  const characters = await fetch(url)
    .then(res => res.json())
  return characters;
}

async function fetchPlanets(film) {
  let url = `${baseUrl}/films/${film.id}/planets`;
  const planets = await fetch(url)
    .then(res => res.json())
  return planets;
}

const renderFilm = film => {
  document.title = `SWAPI - ${film?.name}`;  // Just to make the browser tab say their name
  title.textContent = film?.title;
  release_date.textContent = film?.release_date;
  director.textContent = film?.director;
  episode_id.textContent = film?.episode_id;

  const charactersLis = film?.characters?.map(character => `<li><a href="/character.html?id=${character.id}">${character.name}</li>`)
  const planetsLis = film?.planets?.map(planet => `<li><a href="/planet.html?id=${planet.id}">${planet.name}</a></li>`)
  characters.innerHTML = charactersLis.join("");
  planets.innerHTML = planetsLis.join("");
}