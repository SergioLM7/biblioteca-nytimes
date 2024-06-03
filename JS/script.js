document.addEventListener('DOMContentLoaded', () => {

//VARIABLES
const fragment = document.createDocumentFragment();
const sectionCards = document.querySelector('#cards');
let botonCard;
let arrayBack = [];

//FUNCIONES
//Función de acceso inicial a la API
const accesoAPI = async () => {
  mostrarSpinner();
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
      ocultarSpinner();
    }
  } catch (error) {
    ocultarSpinner();
    throw error;
  }
};

//Función de acceso a la API para 2ª lista
const accesoAPILista2 = async (link) => {
  mostrarSpinner();
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
      sectionCards.innerHTML = '';
      pintarCardsTematicas(datosLista);
      ocultarSpinner();
    }

  } catch (error) {
    ocultarSpinner();
    throw error;
  }
};


//Función para pintar 
const pintarCards = (datos) => {
  arrayBack = datos;
  datos.forEach(({ display_name: nombre, oldest_published_date: masAntiguo,
    newest_published_date: masNuevo, updated, list_name_encoded: link }) => {
 
    const contenedorCard = document.createElement("ARTICLE");
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
    botonCard.textContent = "READ MORE";
    botonCard.dataset.link = link;
   
    fragment.append(h3Card, hrCard, datoOldest, datoNewest, datoUpdated, botonCard)
    contenedorCard.append(fragment);
    sectionCards.append(contenedorCard);

  })
};

//Función para pintar las cards de cada temática
const pintarCardsTematicas = (datos) => {
  window.scrollTo(0,0);
  const sectionTituloLista = document.querySelector('#sectionTituloLista');
  const sectionBoton = document.querySelector('#sectionBoton');
  const botonBack = document.createElement('BUTTON');
  botonBack.classList = "botonBack";
  botonBack.textContent = "BACK TO INDEX";
  sectionBoton.append(botonBack);
  

  datos.forEach(({list_name, rank, weeks_on_list:semanas, book_details:detalles}) => {
    sectionTituloLista.innerHTML = '';
    const titulo = detalles[0].title;
    const contenedorLibro = document.createElement("ARTICLE");
    const tituloLista = document.createElement("H3");
    tituloLista.textContent = list_name;
    
    contenedorLibro.classList = "contenedorLibro";
    const h4Libro = document.createElement("H4");
    h4Libro.innerHTML = `#${rank} ${titulo}`;

    const imgLibro = document.createElement("IMG");
    imgLibro.src = detalles[0].book_image;
    imgLibro.classList = "contenedor-imagen";
    imgLibro.alt = "caratula libro";
    
    const semanasEnLista = document.createElement("P");
    semanasEnLista.textContent = `Weeks on list: ${semanas}`;

    const description = document.createElement("P");
    description.textContent = `${detalles[0].description}`;

    const enlaceBoton = document.createElement("A");
    enlaceBoton.href = `${detalles[0].amazon_product_url}`;
    enlaceBoton.target = "_blank";
    const botonComprar = document.createElement("BUTTON");
    botonComprar.textContent = "BUY AT AMAZON";
    

    enlaceBoton.append(botonComprar);
    fragment.append(h4Libro, imgLibro, semanasEnLista, description, enlaceBoton)
    contenedorLibro.append(fragment);
    sectionCards.append(contenedorLibro);
    sectionTituloLista.append(tituloLista);
  })

};


//Funciones para gestionar el spinner de carga
const mostrarSpinner = () => {
  console.log("Cargando spinner")
  spinner.style.display = 'block';
};

// Función para ocultar el spinner
const ocultarSpinner = () => {
  console.log("Quitando spinner")

  spinner.style.display = 'none';
};

//Llamadas a funciones
accesoAPI();

//EVENTOS
sectionCards.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.dataset.link) {
    sectionBoton.innerHTML = '';
    const linkURL = event.target.dataset.link;
    accesoAPILista2(linkURL);
}
});

sectionBoton.addEventListener('click', (event) => {
  if (event.target.classList.contains('botonBack')) {
    sectionCards.innerHTML = '';
    sectionTituloLista.innerHTML = '';
    pintarCards(arrayBack);
  }
});


});//LOADED