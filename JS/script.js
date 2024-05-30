document.addEventListener('DOMContentLoaded', () => {

//VARIABLES
const fragment = document.createDocumentFragment();
const sectionCards = document.querySelector('#cards');
let botonCard;


//EVENTOS


//FUNCIONES
//Función de acceso inicial a la API
const accesoAPI = async () => {
  try {
    const respuesta = await fetch('https://api.nytimes.com/svc/books/lists/names.json?api-key=AxAIDguQa4ASm7ICC6g7eMqm1XG0WPLx', {
      method: 'GET',
    });
    if (!respuesta.ok) {
      return Promise.reject(new Error(`¡Error HTTP! Estado: ${respuesta.status}`));
    } else {
      let respuestaOK = await respuesta.json();
      let listasAPintar = respuestaOK.body.results;
      console.log(respuestaOK);
      pintarCards(listasAPintar);
    }
  } catch (error) {
    throw error;
  }
};

//Función de acceso a la API para 2ª lista
const accesoAPILista2 = async (link) => {
  try {
    const respuesta2 = await fetch(`https://api.nytimes.com/svc/books/lists/${link}.json?api-key=AxAIDguQa4ASm7ICC6g7eMqm1XG0WPLx`, {
      method: 'GET'});
    if (!respuesta2.ok) {
      return Promise.reject(new Error(`¡Error HTTP! Estado: ${respuesta2.status}`));
    } else {
      let respuesta2OK = await respuesta2.json();
      console.log(respuesta2OK);
      let datosLista = respuesta2OK.body;
      console.log(datosLista);
      pintarCardsTematicas(datosLista);


      /*Los libros deben estar organizados según el orden de la lista oficial
Incluir
Carátula del libro
Cantidad de semanas que lleva en la lista
Descripción
Titulo y la posición que ocupa en la lista ( #1 titulo.... #2 titulo....)
Link para poder comprar el libro en amazon (debe abrirse en otra pestaña)*/

    }

  } catch (error) {
    throw error;
  }
};


//Función para pintar 
const pintarCards = (datos) => {
  datos.forEach(({ display_name: nombre, oldest_published_date: masAntiguo,
    newest_published_date: masNuevo, updated, list_name_encoded: link }) => {
    const contenedorCard = document.createElement("DIV");
    contenedorCard.classList = "contenedorCard"
    const h3Card = document.createElement("H3");
    h3Card.innerHTML = nombre;
    const hrCard = document.createElement("HR");
    const datoOldest = document.createElement("P");
    datoOldest.textContent = `Oldest: ${masAntiguo}`;
    const datoNewest = document.createElement("P");
    datoNewest.textContent = `Newest: ${masNuevo}`;
    const datoUpdated = document.createElement("P");
    datoUpdated.textContent = `Updated: ${updated}`;
    botonCard = document.createElement("BUTTON");
    botonCard.classList.add = link;
    botonCard.textContent = "READ MORE";
    botonCard.dataset.link = link;
    const enlaceBoton = document.createElement("A");
    enlaceBoton.href = `./detalleLista.html`;

    enlaceBoton.append(botonCard);
    fragment.append(h3Card, hrCard, datoOldest, datoNewest, datoUpdated, enlaceBoton)
    contenedorCard.append(fragment);
    sectionCards.append(contenedorCard);

  })
};



//Llamadas a funciones
accesoAPI();

sectionCards.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const linkURL = event.target.dataset.link;
    console.log(`Botón pulsado: ${linkURL}`);
    accesoAPILista2(linkURL);
  }
});

//indexOF para acceder a la ULR de la API del elemento en el que se ha pulsado el boton de Read MORE

});//LOADED