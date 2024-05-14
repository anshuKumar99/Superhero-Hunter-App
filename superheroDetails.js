// Marvel api public key
const publicKey = "28b56c2659cb863d894dbac9a8bea350";

// Getting superhero id from local storage for fetching details of superhero
const superheroDetailsId = localStorage.getItem("ID");

// Function to fetch superhero details from the Marvel API
function fetchSuperheroDetails() {
  const url = `https://gateway.marvel.com/v1/public/characters/${superheroDetailsId}?apikey=${publicKey}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => displaySuperheroDetails(data.data.results[0]))

    // if any error occured while fetching data from api then display it on console
    .catch((error) =>
      console.error("Error fetching superhero details:", error)
    );
}

// Function to display superhero details on the superhero details page
function displaySuperheroDetails(superhero) {
  const superheroName = document.getElementById("superheroName");
  superheroName.textContent = superhero.name;

  const superheroDetails = document.getElementById("superheroDetails");
  superheroDetails.innerHTML = `
        <img src="${superhero.thumbnail.path}/portrait_uncanny.${
    superhero.thumbnail.extension
  }" alt="${superhero.name}">
        <h2>Description</h2>
        <p>${superhero.description || "No description available"}</p>
        <!-- Add more details here as needed -->
    `;
}

let uri = "https://gateway.marvel.com:443/v1/public/";

// comicsWrapper to display superhero comics details on the superhero details page
let comicsWrapper = document.getElementById("comics");
comicsWrapper.innerHTML = "";
uri = `https://gateway.marvel.com:443/v1/public/characters/${superheroDetailsId}/comics?apikey=${publicKey}`;

fetch(uri)
  .then((response) => response.json())
  .then((res) => {
    let comics = res.data.results;
    // iterate over all the comics and render it on superhero details page
    for (let comic of comics) {
      const { title, thumbnail, description } = comic;
      let div = document.createElement("div");
      div.classList.add("superheroInformation");

      div.innerHTML = `
        <div class="superheroImage">
          <img src="${thumbnail.path}.jpg" alt="">
        </div>
        <div class="superheroDesc">
          <h3>${title}</h3>
          <p>${description || "description not found"}</p>
        </div>
      `;
      comicsWrapper.appendChild(div);
    }
  })
  // if any error occured while fetching data from api then display it on console
  .catch((error) => {
    console.error(error);
  });

// eventsWrapper to display superhero comics details on the superhero details page
let eventsWrapper = document.getElementById("events");
eventsWrapper.innerHTML = "";
uri = `https://gateway.marvel.com:443/v1/public/characters/${superheroDetailsId}/events?apikey=${publicKey}`;

fetch(uri)
  .then((response) => response.json())
  .then((res) => {
    let events = res.data.results;
    // iterate over all the events and render it on superhero details page
    for (let event of events) {
      const { title, thumbnail, description } = event;
      let div = document.createElement("div");
      div.classList.add("superheroInformation");

      div.innerHTML = `
        <div class="superheroImage">
          <img src="${thumbnail.path}.jpg" alt="">
        </div>
        <div class="superheroDesc">
          <h3>${title}</h3>
          <p>${description || "description not found"}</p>
        </div>
      `;
      eventsWrapper.appendChild(div);
    }
  })
  // if any error occured while fetching data from api then display it on console
  .catch((error) => {
    console.error(error);
  });

// seriesWrapper to display superhero comics details on the superhero details page
let seriesWrapper = document.getElementById("series");
seriesWrapper.innerHTML = "";
uri = `https://gateway.marvel.com:443/v1/public/characters/${superheroDetailsId}/series?apikey=${publicKey}`;

fetch(uri)
  .then((response) => response.json())
  .then((res) => {
    let series = res.data.results;
    // iterate over all the series and render it on superhero details page
    for (let s of series) {
      const { title, thumbnail, description } = s;
      let div = document.createElement("div");
      div.classList.add("superheroInformation");

      div.innerHTML = `
        <div class="superheroImage">
          <img src="${thumbnail.path}.jpg" alt="">
        </div>
        <div class="superheroDesc">
          <h3>${title}</h3>
          <p>${description || "description not found"}</p>
        </div>
      `;
      seriesWrapper.appendChild(div);
    }
  })
  // if any error occured while fetching data from api then display it on console
  .catch((error) => {
    console.error(error);
  });

// storiesWrapper to display superhero comics details on the superhero details page
let storiesWrapper = document.getElementById("stories");
storiesWrapper.innerHTML = "";
uri = `https://gateway.marvel.com:443/v1/public/characters/${superheroDetailsId}/stories?apikey=${publicKey}`;

fetch(uri)
  .then((response) => response.json())
  .then((res) => {
    let stories = res.data.results;
    // iterate over all the stories and render it on superhero details page
    for (let story of stories) {
      const { title, description } = story;
      let div = document.createElement("div");
      div.classList.add("superheroInformation");
      div.innerHTML = `
        <div class="superheroDesc">
          <h3>${title}</h3>
          <p>${description || "description not found"}</p>
        </div>
      `;
      storiesWrapper.appendChild(div);
    }
  })
  // if any error occured while fetching data from api then display it on console
  .catch((error) => {
    console.error(error);
  });

// Fetch and display superhero details
fetchSuperheroDetails();
