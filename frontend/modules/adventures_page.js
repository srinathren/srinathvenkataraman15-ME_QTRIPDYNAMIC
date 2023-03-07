import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  var id = "";
  for (var i = 0; i < search.length; i++) {
    if (search[i] == "=") {
      for (var j = i + 1; j < search.length; j++) {
        id += search[j];
      }
    }
  }
  console.log(search);
  console.log(id);
  return id;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let data = await fetch(config.backendEndpoint + `/adventures?city=${city}`);
    let jsonData = await data.json();
    return jsonData;
  } catch (err) {
    return null;
  }
  console.log(city);
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  console.log(typeof adventures);
  // console.log(adventures.costPerHead);
  // document.getElementById("data").textContent = "";
  let classele = document.getElementById("data");
  for (var i = 0; i < adventures.length; i++) {
    let divele = document.createElement("div");
    divele.setAttribute("class", "col-6 col-lg-3 mb-4");

    let activitydivele = document.createElement("div");
    activitydivele.setAttribute("class", "activity-card");

    let actpart1 = document.createElement("div");

    let imgele = document.createElement("img");
    imgele.setAttribute("src", adventures[i].image);
    imgele.setAttribute("alt", `${adventures[i].name} image`);

    activitydivele.appendChild(imgele);

    let nameele1 = document.createElement("h6");
    nameele1.textContent = adventures[i].name;

    let cphele1 = document.createElement("p");
    cphele1.textContent = "₹ " + adventures[i].costPerHead;

    actpart1.setAttribute(
      "class",
      "d-flex justify-content-between w-100 px-2 py-2"
    );
    actpart1.appendChild(nameele1);
    actpart1.appendChild(cphele1);

    let actpart2 = document.createElement("div");

    let nameele2 = document.createElement("h6");
    nameele2.textContent = "Duration";

    let cphele2 = document.createElement("p");
    cphele2.textContent = adventures[i].duration + " hours";

    actpart2.setAttribute("class", "d-flex justify-content-between w-100 px-2");
    actpart2.appendChild(nameele2);
    actpart2.appendChild(cphele2);

    activitydivele.appendChild(actpart1);
    activitydivele.appendChild(actpart2);

    let catdiv = document.createElement("div");
    catdiv.setAttribute("class", "category-banner overflow-auto");

    let catpara = document.createElement("span");
    catpara.textContent = adventures[i].category;

    catdiv.appendChild(catpara);

    activitydivele.appendChild(catdiv);

    let aele = document.createElement("a");
    aele.setAttribute("href", `detail/?adventure=${adventures[i].id}`);
    aele.setAttribute("id", `${adventures[i].id}`);

    aele.appendChild(activitydivele);
    divele.appendChild(aele);

    classele.appendChild(divele);
  }
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filtlist = list.filter(function (adventure) {
    return adventure.duration >= low && adventure.duration <= high;
  });
  return filtlist;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let listfiltered = list.filter(function (adventure) {
    return categoryList.includes(adventure.category);
  });
  console.log(listfiltered);
  return listfiltered;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs
  if (filters.category.length) {
    list = filterByCategory(list, filters.category);
  }
  // list = filterByDuration(list,filters.duration);
  if (filters.duration) {
    let arr = new Array();
    arr = filters.duration.split("-");
    console.log(arr);
    list = filterByDuration(list, arr[0], arr[1]);
    console.log(arr[0]);
  }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  let str = JSON.stringify(filters);
  localStorage.setItem("filters",str);

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let gotItem = localStorage.getItem("filters");

  if(!gotItem){
    return null;
  }
  let res = JSON.parse(gotItem);
    return res;
}
  // Place holder for functionality to work in the Stubs
  

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  console.log(filters);
  let catid = document.getElementById("category-list");

  for (var i = 0; i < filters.category.length; i++) {
    let pele = document.createElement("span");
    let div1ele1 = document.createElement("div");
    div1ele1.setAttribute("class", "category-filter");
    pele.textContent = filters.category[i];
    div1ele1.appendChild(pele);
    catid.appendChild(div1ele1);
  }
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
