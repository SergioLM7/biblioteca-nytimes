//VARIABLES
const fragment = document.createDocumentFragment();
const sectionCards = document.querySelector('#cards');


//EVENTOS

//FUNCIONES
//Función de acceso a la API
const acceso = async () => {
    try {
      const respuesta = await fetch('https://api.nytimes.com/svc/books/lists/names.json?api-key=AxAIDguQa4ASm7ICC6g7eMqm1XG0WPLx', {
        method: 'GET',
      });
      if (!respuesta.ok) {
        return Promise.reject(new Error(`¡Error HTTP! Estado: ${respuesta.status}`));
      } else {
        let respuestaOK = await respuesta.json();
        let listasAPintar = respuestaOK.body.results;
        console.log(respuestaOK)
        pintarCards(listasAPintar);
      }
    } catch (error) {
      throw error;
    }
  };

  //Función para pintar 
  const pintarCards = (datos) => {
    datos.forEach(({display_name:nombre, oldest_published_date:masAntiguo, 
      newest_published_date:masNuevo, updated, list_name_encoded:link}) => {
        const contenedorCard = document.createElement("DIV");
        contenedorCard.classList = "contenedorCard"
        const h3Card = document.createElement("H3");
        h3Card.innerHTML= nombre;
        const hrCard = document.createElement("HR");
        const datoOldest = document.createElement("P");
        datoOldest.textContent = `Oldest: ${masAntiguo}`;
        const datoNewest = document.createElement("P");
        datoNewest.textContent = `Newest: ${masNuevo}`;
        const datoUpdated = document.createElement("P");
        datoUpdated.textContent = `Updated: ${updated}`;
        const botonCard = document.createElement("BUTTON");
        botonCard.classList = "botonCard";
        botonCard.textContent = "READ MORE";
        const enlaceBoton = document.createElement("A");
        enlaceBoton.href = `./detalleLista.html`;

        enlaceBoton.append(botonCard);
        fragment.append(h3Card,hrCard,datoOldest,datoNewest,datoUpdated, enlaceBoton)
        contenedorCard.append(fragment);
        sectionCards.append(contenedorCard);

    })
  };

//Llamadas a funciones
 acceso(); 