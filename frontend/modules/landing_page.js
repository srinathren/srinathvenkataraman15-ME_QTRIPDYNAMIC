import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let data = await fetch(config.backendEndpoint + "/cities");
    let jsonData = await data.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  var divele = document.createElement("div");
  divele.setAttribute("class", "col-6 col-lg-3 mb-4");

  var tilediv = document.createElement("div");
  tilediv.setAttribute("class", "tile");

  var tiletextdiv = document.createElement("div");
  tiletextdiv.setAttribute("class", "tile-text");

  var containerele = document.getElementById("data");

  let imgele = document.createElement("img");
  imgele.setAttribute("src", image);
  imgele.setAttribute("alt", `${city} image`);
  tilediv.appendChild(imgele);

  let h6ele = document.createElement("h6");
  h6ele.textContent = city;
  tiletextdiv.appendChild(h6ele);

  let pele = document.createElement("p");
  pele.textContent = description;
  tiletextdiv.appendChild(pele);

  tilediv.appendChild(tiletextdiv);

  let aele = document.createElement("a");
  aele.setAttribute("href", `pages/adventures/?city=${id}`);
  aele.setAttribute("id", `${id}`);

  aele.appendChild(tilediv);
  divele.appendChild(aele);


  containerele.appendChild(divele);
}

export { init, fetchCities, addCityToDOM };
