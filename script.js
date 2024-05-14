// Marvel api public and private keys
const publicKey = "28b56c2659cb863d894dbac9a8bea350";
const privateKey = "1eb60a113f257b37a2f8ae0f616324c000301c04";

// Current timestamp
const ts = new Date().getTime();

// generate MD5 hash using timestamp, private key, and public key
const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();

// Function to fetch superheroes from the Marvel API
function getSuperheroes(search = "a") {
  const url = `http://gateway.marvel.com/v1/public/characters?nameStartsWith=${search}&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

  fetch(url)
    .then((response) => response.json())
    .then((res) => {
      displaySuperheroes(res.data.results);
    })
    .catch((error) => console.error("Error fetching superheroes:", error));
}

// Function to display superheroes on the home page
function displaySuperheroes(superheroes) {
  const superheroesList = document.getElementById("superheroesList");
  superheroesList.innerHTML = "";

  superheroes.forEach((superhero) => {
    const superheroCard = document.createElement("div");
    superheroCard.classList.add("superhero-card");
    superheroCard.innerHTML = `
            <img src="${superhero.thumbnail.path}/portrait_uncanny.${superhero.thumbnail.extension}" alt="${superhero.name}">
            <h2 class="superheroName">${superhero.name}</h2>
            <button onclick="setFavHeroID(${superhero.id}
            )">Add to Favorites</button>
            <button onclick="setHeroID(${superhero.id})">Show Details</button>
        `;
    superheroesList.appendChild(superheroCard);
  });
}

// Function to set favourite superheroes id to local storage
function setFavHeroID(favHeroID) {
  const favoriteSuperheroIdList =
    JSON.parse(localStorage.getItem("favId")) || [];
  const isAlreadyFavoriteHero = favoriteSuperheroIdList.some(
    (favourite) => favourite === favHeroID
  );

  if (!isAlreadyFavoriteHero) {
    favoriteSuperheroIdList.push(favHeroID);
  }
  localStorage.setItem("favId", JSON.stringify(favoriteSuperheroIdList));
}

// Function to set superhero id to local storage for fetching superhero details
function setHeroID(heroID) {
  localStorage.setItem("ID", heroID);
  window.open("./superheroDetails.html", "_self");
}

// Function to handle search input data
document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const searchData = event.target.value.trim();
    getSuperheroes(searchData);
  });

// Initial fetch of superheroes when the page loads
window.onload = function () {
  getSuperheroes();
};
