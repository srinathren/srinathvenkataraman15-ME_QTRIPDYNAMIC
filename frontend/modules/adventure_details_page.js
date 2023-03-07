import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  console.log(search);
  if (search) {
    var id = "";
    for (var i = 0; i < search.length; i++) {
      if (search[i] == "=") {
        for (var j = i + 1; j < search.length; j++) {
          id += search[j];
        }
      }
    }
    return id;
  }

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let promise = await fetch(
      config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`
    );
    let data = await promise.json();
    return data;
  } catch {
    return null;
  }

  // Place holder for functionality to work in the Stubs
  // return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // let nameele = document.createElement("h1");
  // nameele.textContent = adventure[0].name;
  let nameid = document.getElementById("adventure-name");
  nameid.textContent = adventure.name;

  let subtitleid = document.getElementById("adventure-subtitle");
  subtitleid.textContent = adventure.subtitle;

  let contentid = document.getElementById("adventure-content");
  contentid.textContent = adventure.content;

  let arr = adventure.images;

  console.log(arr);

  let ptoid = document.getElementById("photo-gallery");
  for (let i = 0; i < arr.length; i++) {
    // let divimg1 = document.createElement("div");
    // divimg1.setAttribute("class","activity-card-image");

    let imgele = document.createElement("img");
    imgele.setAttribute("src", `${arr[i]}`);
    imgele.setAttribute("alt", `${arr[i]} image`);
    imgele.setAttribute("class", "activity-card-image");

    // divimg1.appendChild(imgele);
    ptoid.appendChild(imgele);
  }
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  const photos = document.getElementById("photo-gallery");
  let items = "";
  let indicators = "";
  images.forEach((image, i) => {
    indicators += `
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="${i}"
        ${
          i === 0
            ? 'class="active" aria-current="true" aria-label="Slide 1"'
            : `aria-label="Slide ${i + 1}"`
        }
      ></button>
    `;
    items += `
      <div class="carousel-item ${i === 0 ? "active" : ""}">
        <img src="${image}" class="d-block activity-card-image" alt="Activity Card Image">
      </div>
    `;
  });

  photos.innerHTML = `  
    <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        ${indicators}
      </div>
      <div class="carousel-inner">
        ${items}
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `;
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  console.log(adventure);
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display =
      "none";
    document.getElementById("reservation-panel-available").style.display =
      "block";
    document.getElementById("reservation-person-cost").textContent =
      adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-available").style.display =
      "none";
    document.getElementById("reservation-panel-sold-out").style.display =
      "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  console.log(persons);
  document.getElementById("reservation-cost").textContent =
    adventure.costPerHead * persons;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  var formid = document.getElementById("myForm");
  formid.addEventListener("submit", async function (e) {
    e.preventDefault();
    var name = formid.elements["name"].value;
    var date = formid.elements["date"].value;
    var person = formid.elements["person"].value;
    var data = JSON.stringify({
      name: name,
      date: date,
      person: person,
      adventure: adventure.id,
    });

    console.log(data);

    try {
      var response = await fetch(config.backendEndpoint + "/reservations/new", {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });
      if (response.ok) {
        alert("Success!");
        location.reload();
      } else {
        alert("Failed!");
      }
    } catch (error) {
      return error;
    }
  });
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved){
    document.getElementById("reserved-banner").setAttribute("style","display:block");
  }
  else{
    document.getElementById("reserved-banner").setAttribute("style","display:none");
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
