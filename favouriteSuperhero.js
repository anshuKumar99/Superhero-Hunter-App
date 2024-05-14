// Marvel api public key
const publicKey = "28b56c2659cb863d894dbac9a8bea350";

// Getting favourite superheroes ids from local storage for fetching details of favourite superhero
const favSuperheroIdList = JSON.parse(localStorage.getItem("favId")) || [];

// Function to add superhero in favourite superheroes list
function addToFavorites() {
  // Getting favourite superheroes from local storage
  const favoriteSuperheroes =
    JSON.parse(localStorage.getItem("favorites")) || [];

  // Check if the superhero is already in favorites superheroes list
  favSuperheroIdList.forEach((favSuperheroId) => {
    const isAlreadyFavorite = favoriteSuperheroes.some(
      (favourite) => favourite.id === favSuperheroId
    );
    // If the superhero is not already in favorites, add it
    if (!isAlreadyFavorite) {
      // Fetch data from Marvel API and add it to favorites
      fetch(
        `https://gateway.marvel.com/v1/public/characters/${favSuperheroId}?apikey=${publicKey}`
      )
        .then((response) => response.json())
        .then((data) => {
          const superhero = data.data.results[0];
          favoriteSuperheroes.push(superhero);
          localStorage.setItem(
            "favorites",
            JSON.stringify(favoriteSuperheroes)
          );
        })

        // if any error occured while fetching data from api then display it on console
        .catch((error) =>
          console.error("Error adding superhero to favorites:", error)
        );
    }
  });
  loadFavorites();
}

// Function to load favourite superheroes
function loadFavorites() {
  const favoriteSuperheroes =
    JSON.parse(localStorage.getItem("favorites")) || [];
  const favoritesList = document.getElementById("favoriteheroesList");
  favoritesList.innerHTML = "";

  if (favoriteSuperheroes.length === 0) {
    const noFavoritesMessage = document.createElement("p");
    noFavoritesMessage.textContent = "You have no favorite superheroes.";
    favoritesList.appendChild(noFavoritesMessage);
  } else {
    favoriteSuperheroes.forEach((superhero) => {
      const favoriteSuperheroCard = document.createElement("div");
      favoriteSuperheroCard.classList.add("favorite-superhero-card");
      favoriteSuperheroCard.innerHTML = `
              <img src="${superhero.thumbnail.path}/portrait_xlarge.${superhero.thumbnail.extension}" alt="${superhero.name}">
              <h2 class="favouriteHeroName">${superhero.name}</h2>
              <button onclick="setSuperheroID(${superhero.id})">Show Details</button>
              <button onclick="removeFromFavorites(${superhero.id})">Remove from Favorites</button>
          `;
      favoritesList.appendChild(favoriteSuperheroCard);
    });
  }
}

// Function to remove superhero from favourite superheroes
function removeFromFavorites(superheroId) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((superhero) => superhero.id !== superheroId);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  let removeFavoriteHeroesId = JSON.parse(localStorage.getItem("favId")) || [];
  removeFavoriteHeroesId = removeFavoriteHeroesId.filter(
    (id) => id !== superheroId
  );
  localStorage.setItem("favId", JSON.stringify(removeFavoriteHeroesId));
  loadFavorites();
}

// Function to set superhero id to local storage for fetching superhero details
function setSuperheroID(heroID) {
  localStorage.setItem("ID", heroID);
  window.open("./superheroDetails.html", "_self");
}

// Function to call addToFavorites() and loadFavorites() when the page loads
window.onload = function () {
  addToFavorites();
  loadFavorites();
};

// Reload page after 1500ms to get latest data
setTimeout(function () {
  loadFavorites();
}, 1500);
