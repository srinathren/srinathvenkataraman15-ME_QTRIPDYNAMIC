import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{var resp = await fetch(config.backendEndpoint+`/reservations/`);
  let data = await resp.json();
  return data;}

  // Place holder for functionality to work in the Stubs
  catch{
  return null;
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  console.log(reservations);

  if(reservations.length < 1 ){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  } else {
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
  }

  let tablebody = document.getElementById("reservation-table");

  for(var i=0;i<reservations.length;i++){
    let resid = document.createElement("tr");
    
    // let tableres = document.createElement("tr");

    let tabledata1 = document.createElement("td");    
    tabledata1.textContent = reservations[i].id;
    resid.appendChild(tabledata1);
    // tableres.appendChild(resid);
    // tabledata.textContent = "";

    let tabledata2 = document.createElement("td");
    tabledata2.textContent = reservations[i].name;
    resid.appendChild(tabledata2);
    // tableres.appendChild(resid);
    // tabledata.textContent = "";

    let tabledata3 = document.createElement("td");
    tabledata3.textContent = reservations[i].adventureName;
    resid.appendChild(tabledata3);
    // tabledata.textContent = "";

    let tabledata4 = document.createElement("td");
    tabledata4.textContent = reservations[i].person;
    resid.appendChild(tabledata4);
    // tabledata.textContent = "";

    let tabledata5 = document.createElement("td");
    let date = new Date(reservations[i].date);
    tabledata5.textContent = date.toLocaleDateString("en-IN");
    resid.appendChild(tabledata5);
    // tabledata.textContent = "";

    let tabledata6 = document.createElement("td");
    tabledata6.textContent = reservations[i].price;
    resid.appendChild(tabledata6);
    // tabledata6.textContent = "";

    let tabledata7 = document.createElement("td");
    let time = new Date(reservations[i].time)
    tabledata7.textContent = time.toLocaleString('en-IN', {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: true
    }).replace(' at',',');
    resid.appendChild(tabledata7);
    // tabledata7.textContent = "";

    // let tabledata8 = document.createElement("td");
    // tabledata8.textContent = reservations[i].adventureName;
    
    // tabledata.textContent = "";

    // let tabledata9 = document.createElement("td");  
    // tabledata9.textContent = reservations[i].adventureName;
        
    // tabledata9.textContent = "";
    
    let tabledata8 = document.createElement("td");
    // tabledata8.setAttribute("class","reservation-visit-button");
    tabledata8.setAttribute("id", reservations[i].id)
    
    // let atag = document.createElement("a");
    // atag.setAttribute("class","reservation-visit-button");
    // atag.setAttribute("href",`/frontend/pages/adventures/detail/?adventure=${reservations[i].adventure}`);
    
    // tabledata8.appendChild(atag)
    // tabledata8.textContent = 'Visit adventure'
    // resid.appendChild(tabledata10);
    // resid.appendChild(tabledata9);
    tabledata8.innerHTML=`
    <a href="/pages/adventures/detail/?adventure=${reservations[i].adventure}" class="reservation-visit-button">Visit Adventure
    `
    resid.appendChild(tabledata8);
    // resid.appendChild(tabledata7);
    // resid.appendChild(tabledata6);
    // resid.appendChild(tabledata5);
    // resid.appendChild(tabledata4);
    // resid.appendChild(tabledata3);
    // resid.appendChild(tabledata2);
    // resid.appendChild(tabledata1);

    tablebody.appendChild(resid);
    // tableid.appendChild(tableres);
  }
}

export { fetchReservations, addReservationToTable };
