const pokemonNamesContainer = document.getElementById("pokemon-names-container");
const prevPageButton = document.getElementById("prev-page-button");
const nextPageButton = document.getElementById("next-page-button");
const pageNumberSpan = document.getElementById("page-number");

let currentPage = 1;
let pokemonList = [];

const fetchPokemonList = async () => {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=150");
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(error);
  }
};

const fetchPokemonNames = (page) => {
  const pokemonNames = [];
  const startIndex = (page - 1) * 10;
  const endIndex = startIndex + 10;
  for (let i = startIndex; i < endIndex; i++) {
    pokemonNames.push(pokemonList[i].name);
  }
  return pokemonNames;
};

const renderPokemonNames = (page) => {
  const pokemonNames = fetchPokemonNames(page);

  // Create a string of HTML elements for each Pokemon name
  let pokemonNamesHTML = "";
  pokemonNames.forEach((pokemonName) => {
    const createDiv = document.createElement('div')
    createDiv.classList = 'pokemon-name'
    createDiv.textContent = pokemonName
    pokemonNamesHTML += createDiv.outerHTML
  });

  // Set the innerHTML of the pokemonNamesContainer element to the generated HTML
  pokemonNamesContainer.innerHTML = pokemonNamesHTML;
};

const handlePrevPageButtonClick = () => {
  currentPage--;
  renderPokemonNames(currentPage);
  updatePaginationControls();
};

const handleNextPageButtonClick = () => {
  currentPage++;
  renderPokemonNames(currentPage);
  updatePaginationControls();
};

const updatePaginationControls = () => {
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === 15; // There are 15 pages with 10 Pokemon names each
  pageNumberSpan.textContent = currentPage;
};

prevPageButton.addEventListener("click", handlePrevPageButtonClick);
nextPageButton.addEventListener("click", handleNextPageButtonClick);

const init = async () => {
  pokemonList = await fetchPokemonList();
  renderPokemonNames(currentPage);
  updatePaginationControls();
};

init();
