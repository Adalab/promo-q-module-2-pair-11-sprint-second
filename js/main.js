'use strict';


/* Elementos que usamos en el HTML */
const newFormElement = document.querySelector('.js-new-form');
const listElement = document.querySelector('.js-list');
const searchButton = document.querySelector('.js-button-search');
const buttonAdd = document.querySelector('.js-btn-add');
const buttonCancelForm = document.querySelector('.js-btn-cancel');
const inputDesc = document.querySelector('.js-input-desc');
const inputPhoto = document.querySelector('.js-input-photo');
const inputName = document.querySelector('.js-input-name');
const linkNewFormElememt = document.querySelector('.js-button-new-form');
const labelMesageError = document.querySelector('.js-label-error');
const input_search_desc = document.querySelector('.js_in_search_desc');
const inputRace = document.querySelector('.js-input-race');
const GITHUB_USER = 'cristinah.sansaloni';
const SERVER_URL = `https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`;



//Objetos con cada gatito
const kittenData_1 = {
    image: "https://ychef.files.bbci.co.uk/976x549/p07ryyyj.jpg",
    name: "Anastacio",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_2 = {
    image: "https://media-cldnry.s-nbcnews.com/image/upload/t_nbcnews-fp-1200-630,f_auto,q_auto:best/newscms/2019_39/3021711/190923-cat-pet-stock-cs-1052a.jpg",
    name: "Fiona",
    desc: "Juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};
const kittenData_3 = {
    image: "https://images.emedicinehealth.com/images/article/main_image/cat-scratch-disease.jpg",
    name: "Cielo",
    desc: "Ruiseño, juguetón, le guta estar tranquilo y que nadie le moleste. Es una maravilla acariciarle!",
    race: "British Shorthair",
};

// Obtener listado de gatitos desde el servidor

let kittenDataList = [];

/* fetch('https://adalab-api.herokuapp.com/api/kittens/tuusuariodegithub', {
    image: 'kittenDataList.url',
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  }).then((response) => response.json())
  .then ((data) => {
    console.log(data);
 kittenDataList = data.results
 renderKittenList(kittenDataList) 
  })

  .catch((error) => console.log(`Ha sucedido un error: ${error}`)) */


//local storage//
const kittenListStored = JSON.parse(localStorage.getItem('kittenDataList'));
console.log(kittenListStored);

if( kittenListStored )
{ renderKitten(kittenListStored) }  
else{ 

    fetch('https://adalab-api.herokuapp.com/api/kittens/tuusuariodegithub', {
        image: 'kittenDataList.url',
        method: 'GET',
        headers: {'Content-Type': 'application/json'},
      }) 
      .then((response) => response.json())
      .then ((data) => {
        console.log(data);
     kittenDataList = data.results
     renderKittenList(kittenDataList) 

      })}
           


//Funciones
function renderKitten(kittenData) {
    const kitten = `<li class="card">
    <article>
      <img
        class="card_img"
        src=${kittenData.image}
        alt="gatito"
      />
      <h3 class="card_title">${kittenData.name}</h3>
      <h3 class="card_race">${kittenData.race}</h3>
      <p class="card_description">
      ${kittenData.desc}
      </p>
    </article>
    </li>`;
    return kitten;
}

function renderKittenList(kittenDataList) {
    listElement.innerHTML = "";
    for (const kittenItem of kittenDataList) {
        listElement.innerHTML += renderKitten(kittenItem);
    }
}

//Mostrar/ocultar el formulario
function showNewCatForm() {
    newFormElement.classList.remove('collapsed');
}
function hideNewCatForm() {
    newFormElement.classList.add('collapsed');
}

function handleClickNewCatForm(event) {
    event.preventDefault();
    if (newFormElement.classList.contains('collapsed')) {
        showNewCatForm();
    } else {
        hideNewCatForm();
    }
}



//Adicionar nuevo gatito
function addNewKitten(event) {
    event.preventDefault();
    

    const newKittenDataObject   = {
      desc: inputDesc.value,
      name: inputName.value,
        race: inputRace.value,
        image: inputPhoto.value,
        
        
   }
   console.log(newKittenDataObject);
  
    const valueDesc = inputDesc.value;
    const valuePhoto = inputPhoto.value;
    const valueName = inputName.value; 
    if (valueDesc === "" && valuePhoto === "" && valueName === "") {
        labelMesageError.innerHTML = "Debe rellenar todos los valores";
    } else {
        if (valueDesc !== "" && valuePhoto !== "" && valueName !== "") {
            labelMesageError.innerHTML = 'Mola! Un nuevo gatito en Adalab!';
            fetch(`https://adalab-api.herokuapp.com/api/kittens/${GITHUB_USER}`, {
             method: 'POST',
             headers: {'Content-Type': 'application/json'},
             body: JSON.stringify(newKittenDataObject),
})
    .then((response) => response.json())
  .then((data) => {
    if (data.success) {
        kittenDataList.push(newKittenDataObject);
        renderKittenList(kittenDataList);
      //Completa y/o modifica el código:
      //Agrega el nuevo gatito al listado
      //Guarda el listado actualizado en el local stoarge
      //Visualiza nuevamente el listado de gatitos
      //Limpia los valores de cada input
    } else {
      console.log('Ha habido un error');
    }
  });
        }
    }

   
}   
//Cancelar la búsqueda de un gatito
function cancelNewKitten(event) {
    event.preventDefault();
    newFormElement.classList.add("collapsed");
    inputDesc.value = "";
    inputPhoto.value = "";
    inputName.value = "";
}

//Filtrar por descripción
function filterKitten(event) {
    event.preventDefault();
    const descrSearchText = input_search_desc.value;
    listElement.innerHTML = "";

    const kittenListFiltered = kittenDataList.filter(oneCat=> oneCat.desc.toLowerCase().includes(descrSearchText.toLowerCase())

    );
   
    console.log(kittenListFiltered );
    renderKittenList(kittenListFiltered);


/* 
     for (const kittenItem of kittenDataList) {
        if (kittenItem.race.includes(descrSearchText)) {
            listElement.innerHTML += renderKitten(kittenItem);
        }
    } */
}

//Mostrar el litado de gatitos en ell HTML
renderKittenList(kittenDataList);

//Eventos
linkNewFormElememt.addEventListener("click", handleClickNewCatForm);
searchButton.addEventListener("click", filterKitten);
buttonAdd.addEventListener("click", addNewKitten);
buttonCancelForm.addEventListener("click", cancelNewKitten);


