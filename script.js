const peopleContainer = document.getElementById("people-container");
const paginationContainer = document.getElementById("pagination");
const loadingSpinner = document.getElementById("loading-spinner");

let currentPage = 1;
let totalPeople;
const peoplePage = 10;

function showLoadingSpinner(){
    loadingSpinner.classList.add("loading-spinner-visible");
}
function hideLoadingSpinner(){
    loadingSpinner.classList.remove("loading-spinner-visible");
}
function renderPeople(people){
    peopleContainer.innerHTML = "";
    people.forEach(people => {
         const peopleEl = document.createElement("div");
         peopleEl.classList.add("people");
         peopleEl.innerHTML = `
         <h2>${people.name}</h2>
        
         <p><strong>height:</strong> ${people.height}</p>
         <p><strong>mass:</strong> ${people.mass}</p>
         <p><strong>hair_color:</strong> ${people.hair_color}</p>
          <p><strong>skin_color:</strong> ${people.skin_color}</p>
         `;
         peopleContainer.appendChild(peopleEl)
    });
}
function renderPagination(){
    const totalPages = Math.ceil(totalPeople / peoplePage);
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++){
        const button = document.createElement("button");
        button .innerHTML = i;
        if( i === currentPage){
            button.classList.add("active");
        }
     button.addEventListener("click",()=>{
        currentPage = i;
        fetchPeople();
     })
     paginationContainer.appendChild(button)
    }
}
 function fetchPeople(){

    showLoadingSpinner();
    fetch(`https://swapi.dev/api/people/?page=${currentPage}`)
    .then((response)=>{
        return response.json();
    })
    .then ((data)=>{
        totalPeople = data.count;
        renderPeople(data.results);
        renderPagination();
        hideLoadingSpinner();
        console.log(data);
    })
    .catch((err)=>{
        console.log(err);
    })
 }
 fetchPeople()