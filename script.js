const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const sprite = document.getElementById(`sprite-element`);
const height = document.getElementById('height');
const weight = document.getElementById('weight');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const searchBtn = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');


const getPokemon = async () => {
  try {
    const pokemonNameOrId = searchInput.value.toLowerCase();
    const response = await fetch(
      `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${pokemonNameOrId}`);
    const data = await response.json();

    logger(pokemonNameOrId, data);
    displayData(data);
  } catch (err) {
    resetDisplay();
    alert('Pokémon not found');
    console.log(`Pokémon not found: ${err}`);
  }
};


const logger = (pokemonNameOrId, data) => {
console.log(`Entry was: ${pokemonNameOrId}`); 
console.log(`Name: ${data.name}`);
console.log(`Id: ${data.id}`);
console.log(`Height: ${data.height}`);
console.log(`Weight: ${data.weight}`);
console.log(`Types: ${data.types}`);
console.log(`HP: ${data.stats[0].base_stat}`);
console.log(`Attack: ${data.stats[1].base_stat}`);
console.log(`Defense: ${data.stats[2].base_stat}`);
console.log(`Special Attack: ${data.stats[3].base_stat}`);
console.log(`Special Defense: ${data.stats[4].base_stat}`);
console.log(`Speed: ${data.stats[5].base_stat}`);
};


const displayData = (data) => {
  pokemonName.textContent = `${data.name.toUpperCase()}`;
  pokemonId.textContent = `#${data.id}`;

  sprite.innerHTML = `
      <img id="sprite" src="${data.sprites.front_default}">
    `;

  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;
  
  types.innerHTML = data.types
    .map(obj => `<span class="type ${obj.type.name}">${obj.type.name}</span>`)
    .join('');

  hp.textContent = `${data.stats[0].base_stat}`;
  attack.textContent = `${data.stats[1].base_stat}`;
  defense.textContent = `${data.stats[2].base_stat}`;
  specialAttack.textContent = `${data.stats[3].base_stat}`;
  specialDefense.textContent = `${data.stats[4].base_stat}`;
  speed.textContent = `${data.stats[5].base_stat}`;
};


const resetDisplay = () => {
  pokemonName.textContent = '(Name here)';
  pokemonId.textContent = '';
  sprite.innerHTML = `
    <img id="sprite" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png" alt="placeholder sprite">
  `;
  types.innerHTML = '(types here)';
  height.textContent = 'Height:';
  weight.textContent = 'Weight:';
  hp.textContent = '';
  attack.textContent = '';
  defense.textContent = '';
  specialAttack.textContent = '';
  specialDefense.textContent = '';
  speed.textContent = '';
};


searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    getPokemon();
  }
});

searchBtn.addEventListener('click', e => {
  e.preventDefault();
  getPokemon();
});