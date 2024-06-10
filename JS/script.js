//VARIABLES
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw6W16ItqmffU-peo3y6rM8lwWmsZ7B8k",
  authDomain: "fir-firebase-7e96e.firebaseapp.com",
  projectId: "fir-firebase-7e96e",
  storageBucket: "fir-firebase-7e96e.appspot.com",
  messagingSenderId: "467507857731",
  appId: "1:467507857731:web:0bf3d319532aff9fc847f6"
};


firebase.initializeApp(firebaseConfig);// Inicializaar app Firebase

const db = firebase.firestore();// db representa mi BBDD //inicia Firestore


const fragment = document.createDocumentFragment();
const sectionCards = document.querySelector('#cards');
const sectionFilters = document.querySelector('#filters')
const selectFilter = document.querySelector('#filter');
const selectFilterCategories = document.querySelector('#filterCategory');
const selectAToZ = document.querySelector('#filterAToZ');
const botonFilterCategories = document.querySelector('.buttonFilter');
const selectFilterOldest = document.querySelector('#filterOldest');
const selectFilterNewest = document.querySelector('#filterNewest');
const sectionBooksFilters = document.querySelector('#booksFilters');
const selectBookAToZ = document.querySelector('#bookFilterAToZ');
const selectAuthorAToZ = document.querySelector('#authorFilterAToZ');
const buttonFilterTitle = document.querySelector('#botonTituloFilter');
const inputBookTitle = document.querySelector('#tituloLibro');
const buttonFilterAuthor = document.querySelector('#botonAuthorFilter');
const inputAuthorBook = document.querySelector('#autorLibro');
const clearButton = document.querySelector('#clear');
const botonLogIn = document.querySelector('#loginButton');
const buttonLogClose = document.querySelector('#closeLogIn');
const botonReg = document.querySelector('#registerButton');
const buttonRegClose = document.querySelector('#closeRegister');

//const itemsPerPage = 5;
//let activeArray; Esta variable puede cambiarse a 'arrayBackBooks' según el array activo
let currentPage = 1;
let botonCard;
let arrayBack = JSON.parse(localStorage.getItem('arrayBack')) || [];
let arrayBackBooks = [];
let arrayFavorites = [];



//EVENTOS
// Eventos para cambiar de página
//Evento botón PREV
/*buttonPrevPage.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    if (activeArray === arrayBack) {
      showPage(currentPage, arrayBack, pintarCards);
    } else {
      showPage(currentPage, arrayBackBooks, pintarCardsTematicas);
    }
  }
});*/

//Evento botón NEXT
/*buttonNextPage.addEventListener('click', () => {
  const totalPages = Math.ceil((activeArray === arrayBack ? arrayBack.length : arrayBackBooks.length) / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    if (activeArray === arrayBack) {
      showPage(currentPage, arrayBack, pintarCards);
    } else {
      showPage(currentPage, arrayBackBooks, pintarCardsTematicas);
    }
  }
});*/

//Evento botón LogIn Popup
botonLogIn.addEventListener('click', () => {
  document.querySelector('#formLogIn').classList.add('show');
});

buttonLogClose.addEventListener('click', () => {
  document.querySelector('#formLogIn').classList.remove('show');
});

//Evento botón Register Popup
botonReg.addEventListener('click', () => {
  document.querySelector('#formRegister').classList.add('show');
});

buttonRegClose.addEventListener('click', () => {
  document.querySelector('#formRegister').classList.remove('show');
});

//Evento para acceder al género de los libros
sectionCards.addEventListener('click', async ({ target }) => {
  if (target.tagName === 'BUTTON' && target.dataset.link) {
    cleanDOM(sectionBoton);
    const linkURL = target.dataset.link;
    mostrarSpinner();
    const toPrint = await accesoAPILista2(linkURL);
    sectionFilters.style.display = 'none';
    sectionBooksFilters.style.display = 'flex';
    cleanDOM(sectionCards);
    pintarCardsTematicas(toPrint);
    ocultarSpinner();
  }
});

//Evento para filtrar por categorías que se actualizan semanal o mensualmente (con opción de
//quitar el filtro y mostrarlos todos)
selectFilter.addEventListener('change', ({ target }) => {
  if (target.value === 'weekly') {
    cleanDOM(sectionCards);
    filtrarCards('weekly');
  } else if (target.value === 'monthly') {
    cleanDOM(sectionCards);
    filtrarCards('monthly');
  } else {
    cleanDOM(sectionCards);
    pintarCards(arrayBack);
  }
});

//Evento para filtrar por orden alfabético y a la inversa las listas
selectAToZ.addEventListener('change', ({ target }) => {
  if (target.value === 'aToz') {
    filterAlphabetical('aToz');
  } else if (target.value === 'zToa') {
    filterAlphabetical('zToa');
  }
  resetSelects();
});

//Evento para filtrar por oldest_published_date
selectFilterOldest.addEventListener('change', ({ target }) => {
  if (target.value === 'toOldest') {
    filterByOldest('toOldest');
  } else if (target.value === 'fromOldest') {
    filterByOldest('fromOldest');
  }
  resetSelects();
});

//Evento para filtrar por newest_published_date
selectFilterNewest.addEventListener('change', ({ target }) => {
  if (target.value === 'toNewest') {
    filterByNewest('toNewest');
  } else if (target.value === 'fromNewest') {
    filterByNewest('fromNewest');
  }
  resetSelects();
});


//Evento para filtrar por los géneros de las listas
botonFilterCategories.addEventListener('click', () => {
  let optionsSelected = selectFilterCategories.selectedOptions;
  let arraySelectedOptions = [];
  for (let i = 0; i < optionsSelected.length; i++) {
    arraySelectedOptions.push(optionsSelected[i].value);
  }
  if (arraySelectedOptions.includes('Todas')) {
    cleanDOM(sectionCards);
    pintarCards(arrayBack);
  } else {
    let arrayFiltrado = arrayBack.filter(elemento => arraySelectedOptions.includes(elemento.list_name));
    cleanDOM(sectionCards);
    pintarCards(arrayFiltrado);
  }
  resetSelects();
});

//Evento para filtrar por orden alfabético y a la inversa en base a los libros
selectBookAToZ.addEventListener('change', ({ target }) => {
  if (target.value === 'aToz') {
    cleanDOM(sectionBoton);
    filterAlphabeticalTitles('aToz');
  } else if (target.value === 'zToa') {
    cleanDOM(sectionBoton);
    filterAlphabeticalTitles('zToa');
  }
  resetSelects();
});

//Evento para filtrar por orden alfabético y a la inversa en base a los autores
selectAuthorAToZ.addEventListener('change', ({ target }) => {
  if (target.value === 'aToz') {
    cleanDOM(sectionBoton);
    filterAlphabeticalAuthors('aToz');
  } else if (target.value === 'zToa') {
    cleanDOM(sectionBoton);
    filterAlphabeticalAuthors('zToa');
  }
  resetSelects();
});

//Evento para buscar un libro por su título
buttonFilterTitle.addEventListener('click', () => {
  let valueLower = inputBookTitle.value.toLowerCase();
  console.log(arrayBackBooks);
  if (valueLower) {
    const bookToSearch = arrayBackBooks.filter(element =>
      element.book_details[0].title.toLowerCase().includes(valueLower));
    if (bookToSearch.length > 0) {
      console.log(bookToSearch);
      cleanDOM(sectionCards);
      cleanDOM(sectionBoton);
      resetSelects();
      pintarCardsTematicas(bookToSearch);
    } else {
      alert('No books found. Try again!');
    }
  } else {
    alert('Empty search. Try again!');
  }
});

//Evento para buscar un libro por autor
buttonFilterAuthor.addEventListener('click', () => {
  let valueLower = inputAuthorBook.value.toLowerCase();
  console.log(arrayBackBooks)
  if (valueLower) {
    const bookToSearch = arrayBackBooks.filter(element =>
      element.book_details[0].author.toLowerCase().includes(valueLower));
    if (bookToSearch.length > 0) {
      console.log(bookToSearch);
      cleanDOM(sectionCards);
      cleanDOM(sectionBoton);
      resetSelects();
      pintarCardsTematicas(bookToSearch);
    } else {
      alert('No books found. Try again!');
    }
  } else {
    alert('Empty search. Try again!');
  }
});

//Evento para volver al Index
sectionBoton.addEventListener('click', ({ target }) => {
  if (target.classList.contains('botonBack')) {
    cleanDOM(sectionCards);
    cleanDOM(sectionTituloLista);
    sectionBooksFilters.style.display = 'none';
    console.log(arrayBack)
    pintarCards(arrayBack);
    sectionFilters.style.display = 'flex';
    document.getElementById('profilePic').style.display = 'none';
    document.getElementById('sectionPicProfile').style.display = 'none';
    cleanDOM(sectionBoton);
  }
});

//Evento para limpiar la sección libros y volver a cargar su versión inicial
clearButton.addEventListener('click', () => {
  clearBookSection();
});


//Evento botón MyProfile
document.querySelector('.loginButtons').addEventListener('click', (event) => {
  if (event.target.matches('#myProfileButton')) {
    const user = firebase.auth().currentUser;
    document.getElementById('sectionPicProfile').style.display = 'block';
    document.getElementById('profilePic').style.display = 'block';

    const botonBack = document.createElement('BUTTON');
    botonBack.classList = "botonBack";
    botonBack.textContent = "BACK TO INDEX";
    sectionBoton.append(botonBack);

    checkFavorites(user.uid)
      .then(favoritesNoEmpty => {
        if (favoritesNoEmpty) {
          cleanDOM(sectionCards);
          getFavorite(user.uid)
            .then(favoriteGetted => {
              if (favoriteGetted && favoriteGetted.length > 0) {
                cleanDOM(sectionBoton);
                sectionFilters.style.display = 'none';
                cleanDOM(botonBack);
                pintarCardsTematicas(favoriteGetted);
                sectionTituloLista.innerHTML = 'My profile';
                document.getElementById('booksFilters').style.display = 'none';
                document.getElementById('filters').style.display = 'none';


              } else {
                console.log('No se obtuvieron favoritos.');
              }
            })
            .catch(error => console.log('Error imprimiendo favoritos ' + error))
        } else {
          sectionCards.innerHTML = '<p>No tienes ningún libro marcado como favorito.</p>';
        }
      })
      .catch(error => {
        console.error('Error verificando favoritos: ', error);
      });

  }

});

//EVENTOS FIREBASE 
//Evento para modificar la persistencia del Log In.
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(() => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  })
  .catch((error) => {
    throw (`Error ${error.code}a la hora de gestionar la persistencia: ${error.message}`)
  });

//Evento para el botón de Register
document.querySelector("#formReg").addEventListener("submit", (event) => {
  event.preventDefault();
  let email = event.target.elements.email.value;
  let pass = event.target.elements.pass.value;
  let pass2 = event.target.elements.pass2.value;
  document.querySelector('#formRegister').classList.remove('show');
  pass === pass2 ? signUpUser(email, pass) : alert("error password");
});

//Evento para el botón de LogIn
document.querySelector("#formAuth").addEventListener("submit", (event) => {
  event.preventDefault();
  let email = event.target.elements.userEmail.value;
  let pass = event.target.elements.userPassword.value;
  signInUser(email, pass)
});

//Listener del botón Me Gusta
sectionCards.addEventListener('click', (event) => {
  if (event.target.matches('.heartButton')) {
    const user = firebase.auth().currentUser;

    if (user) {
      const bookID = event.target.id;
      const bookData = findBook(bookID);

      if (bookData) {
        isBookInFavorites(user.uid, bookData)
          .then(isInFavorites => {
            if (isInFavorites) {
              console.log('El libro está en favoritos.');
              deleteBookFav(user.uid, bookData);
            } else {
              console.log('El libro no está en favoritos.');
              addBookFav(user.uid, bookData);
            }
          }).catch(error => {
            console.error('Error verificando favoritos: ', error);
          });
      } else {
        console.error('El libro no se encontró.');
      }
    } else {
      alert('Regístrese/Inicie sesión para poder guardar libros favoritos.');
    }
  }
});

// Evento para el formulario de subida de la imagen de Perfil
document.getElementById('ProfilePicForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const file = document.getElementById('profilePicInput').files[0];
  if (file) {
    uploadProfilePic(file);
  }
});


// Listener de usuario en el sistema para controlar usuario logado
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`Está en el sistema:${user.email} ${user.uid}`);
    document.getElementById("message").innerText = `${user.email} está en el sistema`;
    const userRef = firebase.firestore().collection('users').doc(user.uid);
    userRef.get()
      .then((doc) => {
        if (doc.exists) {
          const profilePicURL = doc.data().profilePicURL;
          if (profilePicURL) {
            displayProfilePic(profilePicURL);
          } else {
            console.log('El usuario no tiene una imagen de perfil.');
          }
        } else {
          console.log('No se encontró el documento del usuario.');
        }
      })
      .catch((error) => {
        console.error('Error obteniendo el documento del usuario: ', error);
      });
  } else {
    console.log("no hay usuarios en el sistema");
    document.getElementById("message").innerText = `No hay usuarios en el sistema`;
  }
});




//FUNCIONES FIREBASE 
//FUnción para crear usuario en Firebase Datastore con mismo ID que en Auth
const createUser = async (user) => {
  try {
    await db.collection("users").doc(user.id).set(user);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

//Función para el register del usuario
const signUpUser = (email, password) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha registrado ${user.email} ID:${user.uid}`);
      alert(`El usuario ${user.email} con ID:${user.uid} está registrado`);
      // Saves user in firestore
      createUser({
        id: user.uid,
        email: user.email
      });
      const buttonMyProfile = document.createElement('BUTTON');
      buttonMyProfile.id = 'myProfileButton';
      buttonMyProfile.textContent = 'My profile';
      document.querySelector('.loginButtons').append(buttonMyProfile);
    })
    .catch((error) => {
      console.log("Error en el sistema" + ' ' + error.message, "Error: " + error.code);
      if (error.code === 'auth/email-already-in-use') {
        alert('Este email ya está registrado.');
      }
    });
};

//Función para recuperar los datos en favorite
const getFavorite = (userID) => {
  const userRef = firebase.firestore().collection('users').doc(userID);

  return userRef.get().then((doc) => {
    if (doc.exists) {
      const favorites = doc.data().favorites || [];
      return favorites; // Devuelve los favoritos como array
    } else {
      console.error('No se encontró el documento del usuario.');
      return [];
    }
  }).catch((error) => {
    console.error('Error obteniendo el documento del usuario: ', error);
    throw error;
  })
};

//Función para el logIN del usuario
const signInUser = (email, password) => {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      let user = userCredential.user;
      console.log(`se ha logado ${user.email} ID:${user.uid}`)
      alert(`se ha logado ${user.email} ID:${user.uid}`)
      console.log("USER", user);
      document.querySelector('#formLogIn').classList.remove('show');

      const buttonMyProfile = document.createElement('BUTTON');
      buttonMyProfile.id = 'myProfileButton';
      buttonMyProfile.textContent = 'My profile';
      document.querySelector('.loginButtons').append(buttonMyProfile);
    })
    .catch((error) => {
      alert('Est@ usuari@ no está registrad@ en el sistema. Complete el registro')
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode)
      console.log(errorMessage)
    });
};

//Función para el logOut del usuario
const signOut = () => {
  let user = firebase.auth().currentUser;

  firebase.auth().signOut()
    .then(() => {
      alert(`${user.email} cerró sesión.`)
      location.reload();
      window.scrollTo(0, 0);

    })
    .catch((error) => {
      console.log("hubo un error: " + error);
    });
};

//Evento para el botón de LogOut
document.querySelector("#logOut").addEventListener("click", signOut);

//Función para subir la foto de perfil al Cloud Storage
const uploadProfilePic = (file) => {
  const user = firebase.auth().currentUser;

  if (user) {
    const storageRef = firebase.storage().ref();
    const profilePicRef = storageRef.child(`profile_pics/${user.uid}/${file.name}`);
    const uploadTask = profilePicRef.put(file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        console.error('Error al subir la imagen: ', error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL()
          .then((downloadURL) => {
            console.log('URL de descarga de la imagen: ', downloadURL);
            updateProfilePicURL(user.uid, downloadURL);
          });
      }
    );
  } else {
    console.log('No hay usuario autenticado.');
  }
};


//Función para actualizar el perfil de usuario con la URL de la imagen subida
const updateProfilePicURL = (userID, url) => {
  const userRef = firebase.firestore().collection('users').doc(userID);

  userRef.update({ profilePicURL: url })
    .then(() => {
      console.log('URL de la imagen de perfil actualizada en Firestore.');
      displayProfilePic(url);
    })
    .catch((error) => {
      console.error('Error actualizando la URL de la imagen de perfil: ', error);
    });
};

//Función para pintar la imagen de perfil en el DOM
const displayProfilePic = (url) => {
  document.getElementById('profilePic').src = url;
};

//Función buscar Libro Me Gusta
const findBook = (id) => {
  const bookFinded = arrayBackBooks.find(book => book.book_details[0].title === id);
  return bookFinded;
};

//FUnción para buscar si un libro esta en la base de datos de Firebase
const isBookInFavorites = (userID, book) => {
  const userRef = firebase.firestore().collection('users').doc(userID);

  return userRef.get()
    .then((doc) => {
      if (doc.exists) {
        const favorites = doc.data().favorites || [];
        return favorites.some(favBook => favBook.book_details[0].title === book.book_details[0].title);
      } else {
        console.error('No se encontró el documento del usuario.');
        return false;
      }
    })
    .catch((error) => {
      console.error(`Error ${error} al obtener el documento del usuario`);
      throw error;
    });
};

//Función para comprobar si hay algún libro en favorites
const checkFavorites = (userID) => {
  const userRef = firebase.firestore().collection('users').doc(userID);

  return userRef.get()
    .then((doc) => {
      if (doc.exists) {
        const favorites = doc.data().favorites;
        if (favorites) {
          return true;
        } else {
          return false;
        }
      } else {
        console.error('No se encontró el documento del usuario.');
        return false;
      }
    })
    .catch((error) => {
      console.error(`Error ${error} al obtener el documento del usuario`);
      throw error;
    });

};

//Función para añadir libro a favoritos de Firebase
const addBookFav = (uid, book) => {
  db.collection('users').where('id', '==', uid)
    .get()
    .then((docs) => {
      docs.forEach(async (doc) => {
        const docID = doc.id;
        const refUser = db.collection('users').doc(docID);

        await refUser.update({ favorites: firebase.firestore.FieldValue.arrayUnion(book) })
          .then(() => {
            alert('Libro guardado en la colección de favoritos.')
          })
          .catch((error) => {
            throw `Error ${error} al añadir el libro a la colección.`
          })
      })
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })
};

//Función para eliminar libro a favoritos de Firebase
const deleteBookFav = (uid, book) => {
  db.collection('users').where('id', '==', uid)
    .get()
    .then((docs) => {
      docs.forEach(async (doc) => {
        const docID = doc.id;
        const refUser = db.collection('users').doc(docID);

        await refUser.update({ favorites: firebase.firestore.FieldValue.arrayRemove(book) })
          .then(() => {
            alert('Libro eliminado de la colección de favoritos.')
          })
          .catch((error) => {
            throw `Error ${error} al eliminar el libro a la colección.`
          })
      })
    })
    .catch((error) => {
      console.log(error)
      alert(error)
    })
};



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
      //arrayBack = listasAPintar;
      //localStorage.setItem('arrayBack', JSON.stringify(listasAPintar));
      //pintarCards(listasAPintar);
      return listasAPintar;
    }
  } catch (error) {
    ocultarSpinner();
    throw error;
  }
};

//Función inicial de llamada
const firstCall = async () => {
  if (arrayBack.length === 0) {
    mostrarSpinner();
    const categoriesToPrint = await accesoAPI();
    console.log(categoriesToPrint)
    sectionFilters.style.display = 'flex';
    sectionBooksFilters.style.display = 'none';
    pintarCards(categoriesToPrint);
    cleanDOM(sectionBoton);
    toLocalStorage(categoriesToPrint);
    ocultarSpinner();


  } else {
    sectionFilters.style.display = 'flex';
    sectionBooksFilters.style.display = 'none';
    pintarCards(arrayBack);
    cleanDOM(sectionBoton);
  };
};

//Función para mandar datos al local storage
const toLocalStorage = (array) => {
  localStorage.setItem('arrayBack', JSON.stringify(array));
  arrayBack = JSON.parse(localStorage.getItem('arrayBack'));
};

//Función de acceso a la API para 2ª lista
const accesoAPILista2 = async (link) => {
  try {
    const respuesta2 = await fetch(`https://api.nytimes.com/svc/books/lists/${link}.json?api-key=AxAIDguQa4ASm7ICC6g7eMqm1XG0WPLx`, {
      method: 'GET'
    });
    if (!respuesta2.ok) {
      return Promise.reject(new Error(`¡Error HTTP! Estado: ${respuesta2.status}`));
    } else {
      let respuesta2OK = await respuesta2.json();
      let datosLista = respuesta2OK.body;
      arrayBackBooks = datosLista;
      return datosLista;
    }

  } catch (error) {
    ocultarSpinner();
    throw error;
  }
};


//Función para pintar las listas
const pintarCards = (datos) => {
  const sectionBoton = document.querySelector('#sectionBoton');
  const botonBack = document.createElement('BUTTON');
  botonBack.classList = "botonBack";
  botonBack.textContent = "BACK TO INDEX";
  sectionBoton.append(botonBack);

  datos.forEach(({ list_name: nombre, oldest_published_date: masAntiguo,
    newest_published_date: masNuevo, updated, list_name_encoded: link }) => {

    const contenedorCard = document.createElement("ARTICLE");
    contenedorCard.classList = "contenedorCard"
    const h3Card = document.createElement("H3");
    h3Card.innerHTML = nombre;
    const optionCard = document.createElement("OPTION");
    optionCard.value = nombre;
    optionCard.id = nombre;
    optionCard.name = nombre;
    optionCard.textContent = nombre;
    const hrCard = document.createElement("HR");
    const datoOldest = document.createElement("P");
    datoOldest.textContent = `Oldest: ${masAntiguo}`;
    const datoNewest = document.createElement("P");
    datoNewest.textContent = `Newest: ${masNuevo}`;
    const datoUpdated = document.createElement("P");
    datoUpdated.classList = 'filterSelect';
    datoUpdated.textContent = `Updated: ${updated}`;
    botonCard = document.createElement("BUTTON");
    botonCard.textContent = "READ MORE";
    botonCard.dataset.link = link;
    selectFilterCategories.append(optionCard);
    fragment.append(h3Card, hrCard, datoOldest, datoNewest, datoUpdated, botonCard)
    contenedorCard.append(fragment);
    sectionCards.append(contenedorCard);

  })
};

//Función para pintar las cards de cada género/temática
const pintarCardsTematicas = (datos) => {
  window.scrollTo(0, 0);

  const sectionTituloLista = document.querySelector('#sectionTituloLista');
  const sectionBoton = document.querySelector('#sectionBoton');
  const botonBack = document.createElement('BUTTON');
  botonBack.classList = "botonBack";
  botonBack.textContent = "BACK TO INDEX";
  sectionBoton.append(botonBack);


  datos.forEach(({ list_name, rank, weeks_on_list: semanas, book_details: detalles }) => {
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

    const favoriteButton = document.createElement("BUTTON");
    favoriteButton.id = detalles[0].title;
    favoriteButton.textContent = 'LIKE';
    favoriteButton.classList = 'heartButton';


    enlaceBoton.append(botonComprar);
    fragment.append(h4Libro, imgLibro, semanasEnLista, description, enlaceBoton, favoriteButton)
    contenedorLibro.append(fragment);
    sectionCards.append(contenedorLibro);
    sectionTituloLista.append(tituloLista);
  })

};

//Función para limpiar el DOM 
const cleanDOM = (element) => {
  element.innerHTML = '';
};

//Función para recargar la sección de libros
const clearBookSection = () => {
  cleanDOM(sectionCards);
  cleanDOM(sectionBoton);
  pintarCardsTematicas(arrayBackBooks);
}

//Función reset selects
const resetSelects = () => {
  selectFilterCategories.value = 'todas';
  selectFilter.value = 'all';
  selectAToZ.value = 'sinFiltro';
  selectFilterOldest.value = "noOrder";
  selectFilterNewest.value = 'noOrder';
  selectBookAToZ.value = 'bookNoFilter';
  selectAuthorAToZ.value = 'bookNoFilter';
  inputAuthorBook.value = '';
  inputBookTitle.value = '';
};

//Función para filtrar por categorías actualizadas weekly o monthly
const filtrarCards = (filtro) => {
  let filtroAPintar = [...arrayBack].filter(card => card.updated.toLowerCase() === filtro);
  pintarCards(filtroAPintar);
};

//Función para filtrar las categorías por orden alfabético
const filterAlphabetical = (value) => {
  if (value === 'aToz') {
    let alphabeticalFilter = [...arrayBack].sort((a, b) => {
      if (a.list_name < b.list_name) {
        return -1;
      } else if (a.list_name > b.list_name) {
        return 1;
      } return 0;
    });
    console.log(alphabeticalFilter)
    cleanDOM(sectionCards);
    currentPage = 0;
    pintarCards(alphabeticalFilter);
  } else if (value === 'zToa') {
    let alphabeticalFilter = [...arrayBack].sort((a, b) => {
      if (a.list_name > b.list_name) {
        return -1;
      } else if (a.list_name < b.list_name) {
        return 1;
      } return 0;
    });
    console.log(alphabeticalFilter)
    cleanDOM(sectionCards);
    currentPage = 0;
    console.log(arrayBack)
    pintarCards(alphabeticalFilter);
  }

};

//Función para filtrar las categorías por su oldest_published_date
const filterByOldest = (value) => {
  if (value === 'fromOldest') {
    let oldestFilter = [...arrayBack].sort((a, b) => {
      let oldestA = new Date(a.oldest_published_date);
      let oldestB = new Date(b.oldest_published_date);
      if (oldestA.getTime() < oldestB.getTime()) {
        return -1;
      } else if (oldestA.getTime() > oldestB.getTime()) {
        return 1;
      } return 0;
    });
    cleanDOM(sectionCards);
    pintarCards(oldestFilter);
  } else if (value === 'toOldest') {
    let oldestFilter = [...arrayBack].sort((a, b) => {
      let oldestA = new Date(a.oldest_published_date);
      let oldestB = new Date(b.oldest_published_date);
      if (oldestA.getTime() > oldestB.getTime()) {
        return -1;
      } else if (oldestA.getTime() < oldestB.getTime()) {
        return 1;
      } return 0;
    });
    cleanDOM(sectionCards);
    pintarCards(oldestFilter);
  }
};

//Función para filtrar las categorías por su newest_published_date
const filterByNewest = (value) => {
  if (value === 'fromNewest') {
    let newestFilter = [...arrayBack].sort((a, b) => {
      let newestA = new Date(a.oldest_published_date);
      let newestB = new Date(b.oldest_published_date);
      if (newestA.getTime() < newestB.getTime()) {
        return -1;
      } else if (newestA.getTime() > newestB.getTime()) {
        return 1;
      } return 0;
    });
    cleanDOM(sectionCards);
    pintarCards(newestFilter);
  } else if (value === 'toNewest') {
    let newestFilter = [...arrayBack].sort((a, b) => {
      let newestA = new Date(a.oldest_published_date);
      let newestB = new Date(b.oldest_published_date);
      if (newestA.getTime() > newestB.getTime()) {
        return -1;
      } else if (newestA.getTime() < newestB.getTime()) {
        return 1;
      } return 0;
    });
    cleanDOM(sectionCards);
    pintarCards(newestFilter);
  }
};

//Función para filtrar los títulos de los libros por orden alfabético
const filterAlphabeticalTitles = (value) => {
  if (value === 'aToz') {
    let alphabeticalFilterTitle = [...arrayBackBooks].sort((a, b) => {
      if (a.book_details[0].title < b.book_details[0].title) {
        return -1;
      } else if (a.book_details[0].title > b.book_details[0].title) {
        return 1;
      } return 0;
    });
    console.log(alphabeticalFilterTitle)
    cleanDOM(sectionCards);
    pintarCardsTematicas(alphabeticalFilterTitle);
  } else if (value === 'zToa') {
    let alphabeticalFilterTitle = [...arrayBackBooks].sort((a, b) => {
      if (a.book_details[0].title > b.book_details[0].title) {
        return -1;
      } else if (a.book_details[0].title < b.book_details[0].title) {
        return 1;
      } return 0;
    });
    console.log(alphabeticalFilterTitle)
    cleanDOM(sectionCards);
    pintarCardsTematicas(alphabeticalFilterTitle);
  }

};
//Función para filtrar los títulos de los libros por orden alfabético
const filterAlphabeticalAuthors = (value) => {
  if (value === 'aToz') {
    let alphabeticalFilterAuthor = [...arrayBackBooks].sort((a, b) => {
      if (a.book_details[0].author < b.book_details[0].author) {
        return -1;
      } else if (a.book_details[0].author > b.book_details[0].author) {
        return 1;
      } return 0;
    });
    console.log(alphabeticalFilterAuthor)
    cleanDOM(sectionCards);
    pintarCardsTematicas(alphabeticalFilterAuthor);
  } else if (value === 'zToa') {
    let alphabeticalFilterAuthor = [...arrayBackBooks].sort((a, b) => {
      if (a.book_details[0].author > b.book_details[0].author) {
        return -1;
      } else if (a.book_details[0].author < b.book_details[0].author) {
        return 1;
      } return 0;
    });
    console.log(alphabeticalFilterAuthor)
    cleanDOM(sectionCards);
    pintarCardsTematicas(alphabeticalFilterAuthor);
  }

};

//PAGINACIÓN (NO IMPLEMENTADA)
// Función para actualizar la información de la página y los botones de navegación
/*const updatePaginationControls = (totalItems) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  buttonPrevPage.disabled = currentPage === 1;
  buttonNextPage.disabled = currentPage === totalPages;
};

// Función para mostrar una página específica de libros
const showPage = (page, arrayData, pintarFuncion) => {
  cleanDOM(sectionCards);
  cleanDOM(sectionBoton);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = arrayData.slice(startIndex, endIndex);

  pintarFuncion(itemsToShow);
  updatePaginationControls(arrayData.length);
};

//Función para resetear la paginación
const pagReset = (array) => {
  activeArray = array
  currentPage = 1;
  updatePaginationControls(array.length);

};

//FUnción para ocultar los botones de página
const hidePageButtons = () => {
  buttonPrevPage.style.display = 'none'
  buttonNextPage.style.display = 'none'
};*/

//SPINNER
//Función para mostrar el spinner de carga
const mostrarSpinner = () => {
  spinner.style.display = 'block';
};

// Función para ocultar el spinner
const ocultarSpinner = () => {
  spinner.style.display = 'none';
};


//LLamada inicial a la APPI
firstCall();
