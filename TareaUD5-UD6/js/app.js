"use strict";
//declaramos el array de las posiciones
//declaramos tablero
const tabla = document.querySelector("#table");
const tablero = document.createElement("table");
const tiempo = document.querySelector("#time");
let aPosiciones = [];
let intervaloSerpientes;
// let intervaloCronometro;
let botonCreado = false;
document.addEventListener("DOMContentLoaded", () => {
  crearTablero(); //nada más empezar se crea el tablero
  document.addEventListener("keydown", comenzarJuego);
  intervaloSerpientes = setInterval(moverSerpientes, 1000);
  // intervaloCronometro = setInterval(actualizarCuenta,1000);

});
/**
 * @description Función encargada de crear el tablero y asignar
 * un id a cada celda, los cuales después se le asignan a la puerta,
 * serpientes y exploradora
 */
function crearTablero() {
  let contadorPosiciones = -1;
  tabla.appendChild(tablero);
  for (let i = 0; i < 10; i++) {
    const fila = document.createElement("tr");
    for (let index = 0; index < 10; index++) {
      contadorPosiciones++;
      const celda = document.createElement("td");
      celda.setAttribute("id", "c" + contadorPosiciones);
      fila.appendChild(celda);
    }
    tablero.appendChild(fila);
  }
  //colocamos puerta, exploradora y serpientes
  colocarPuertayExploradora();
  colocarSerpientes();
}

function colocarPuertayExploradora() {
  //declaramos las imágenes que están al inicio, que son la puerta y la exploradora
  document.querySelector("#c0").classList.add("door_opened");
  document.querySelector("#c99").classList.add("exploradora");
}

function colocarSerpientes() {
  for (let i = 0; i < 4; i++) {
    let numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    while (aPosiciones.includes(`c${numeroAleatorio}`)) {
      numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    }
    aPosiciones.push(`c${numeroAleatorio}`);
    document.querySelector(`#c${numeroAleatorio}`).classList.add("serpiente1");
  }
  for (let i = 0; i < 4; i++) {
    let numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    while (aPosiciones.includes(`c${numeroAleatorio}`)) {
      numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    }
    aPosiciones.push(`c${numeroAleatorio}`);
    document.querySelector(`#c${numeroAleatorio}`).classList.add("serpiente2");
  }
  for (let i = 0; i < 4; i++) {
    let numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    while (aPosiciones.includes(`c${numeroAleatorio}`)) {
      numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    }
    aPosiciones.push(`c${numeroAleatorio}`);
    document.querySelector(`#c${numeroAleatorio}`).classList.add("serpiente3");
  }
}

function borrarSerpientes() {
  const serpientes1 = document.querySelectorAll(".serpiente1");
  serpientes1.forEach((serpiente) => {
    serpiente.classList.remove("serpiente1");
  });
  const serpientes2 = document.querySelectorAll(".serpiente2");
  serpientes2.forEach((serpiente) => {
    serpiente.classList.remove("serpiente2");
  });
  const serpientes3 = document.querySelectorAll(".serpiente3");
  serpientes3.forEach((serpiente) => {
    serpiente.classList.remove("serpiente3");
  });
}

function comenzarJuego(event) {
  //añadimos eventos de flechas
  if (event.key == "ArrowLeft") {
    moverIzquierda();
  }
  if (event.key == "ArrowRight") {
    moverDerecha();
  }
  if (event.key == "ArrowUp") {
    moverArriba();
  }
  if (event.key == "ArrowDown") {
    moverAbajo();
  }
}

/**
 * @description Funciones de movimiento de exploradora
 */
function moverIzquierda() {
  //obtenemos posicion actual
  const explActual = document.querySelector(".exploradora");
  const posicionActual = explActual.getAttribute("id");

  //como es una cadena necesitamos obtener el número, por lo que hacemos un substring
  const numPosicionActual = parseInt(posicionActual.substring(1));
  //controlamos que no esté en el borde izquierdo
  if (numPosicionActual % 10 !== 0) {
    console.log(numPosicionActual);
    //Una vez ya tenemos la posicion, debemos calcular la nueva posicion
    const numPosicionNueva = numPosicionActual - 1;
    const posicionNueva = "c" + numPosicionNueva;
    comprobarVictoria(numPosicionNueva);
    //movemos a la exploradora
    explActual.classList.remove("exploradora");
    document.querySelector(`#${posicionNueva}`).classList.add("exploradora");
  }
}

function moverDerecha() {
  //obtenemos posicion actual
  const explActual = document.querySelector(".exploradora");
  const posicionActual = explActual.getAttribute("id");

  //como es una cadena necesitamos obtener el número, por lo que hacemos un substring
  const numPosicionActual = parseInt(posicionActual.substring(1));
  //controlamos que no esté en el borde derecho
  if (numPosicionActual % 10 !== 9) {
    console.log(numPosicionActual);
    //Una vez ya tenemos la posicion, debemos calcular la nueva posicion
    const numPosicionNueva = numPosicionActual + 1;
    const posicionNueva = "c" + numPosicionNueva;
    comprobarVictoria(numPosicionNueva);
    comprobarChoque();
    //movemos a la exploradora
    explActual.classList.remove("exploradora");
    document.querySelector(`#${posicionNueva}`).classList.add("exploradora");
  }
}

function moverArriba() {
  //obtenemos posicion actual
  const explActual = document.querySelector(".exploradora");
  const posicionActual = explActual.getAttribute("id");

  //como es una cadena necesitamos obtener el número, por lo que hacemos un substring
  const numPosicionActual = parseInt(posicionActual.substring(1));
  //controlamos que no esté en el borde superior
  if (numPosicionActual >= 10) {
    console.log(numPosicionActual);
    //Una vez ya tenemos la posicion, debemos calcular la nueva posicion
    const numPosicionNueva = numPosicionActual - 10;
    const posicionNueva = "c" + numPosicionNueva;
    comprobarVictoria(numPosicionNueva);
    comprobarChoque();
    //movemos a la exploradora
    explActual.classList.remove("exploradora");
    document.querySelector(`#${posicionNueva}`).classList.add("exploradora");
  }
}

function moverAbajo() {
  //obtenemos posicion actual
  const explActual = document.querySelector(".exploradora");
  const posicionActual = explActual.getAttribute("id");

  //como es una cadena necesitamos obtener el número, por lo que hacemos un substring
  const numPosicionActual = parseInt(posicionActual.substring(1));
  //controlamos que no esté en el borde de abajo
  if (numPosicionActual < 90) {
    console.log(numPosicionActual);
    //Una vez ya tenemos la posicion, debemos calcular la nueva posicion
    const numPosicionNueva = numPosicionActual + 10;
    const posicionNueva = "c" + numPosicionNueva;
    comprobarVictoria(numPosicionNueva);
    comprobarChoque();
    //movemos a la exploradora
    explActual.classList.remove("exploradora");
    document.querySelector(`#${posicionNueva}`).classList.add("exploradora");
  }
}

/**
 * @description Esta función comprueba si la posicion de
 * la exploradora es la misma que la de la puerta.
 * Si lo es muestra un sweetAlert de que ha conseguido llegar
 */
function comprobarVictoria(numPosicionNueva) {
  if (numPosicionNueva == 0) {
    clearInterval(intervaloSerpientes);
    const puertaActual = document.querySelector(".door_opened");
    puertaActual.classList.remove("door_opened");
    puertaActual.classList.add("door_closed");
    Swal.fire({
      title: "Enhorabuena!",
      text: "Has conseguido llegar a la puerta",
      imageUrl: "../../TareaUD5-UD6/images/ganadora.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    if (botonCreado == false) {
      const divBoton = document.querySelector("#boton");
      const boton = document.createElement("button");
      boton.textContent = "Jugar de nuevo";
      divBoton.appendChild(boton);
      boton.addEventListener("click", reiniciarJuego);
      botonCreado = true;
    }
  }
}

/**
 * @description Funcion para reiniciar el juego
 * borrando y añadiendo las clases necesarias
 */
function reiniciarJuego() {
  //eliminamos el intervalo de movimiento de serpientes
  clearInterval(intervaloSerpientes);
  //quitamos las serpientes de donde están
  borrarSerpientes();
  //volvemos a colocar las serpientes en sitios aleatorios
  colocarSerpientes();
  // Establecer un nuevo intervalo y almacenar su ID
  intervaloSerpientes = setInterval(moverSerpientes, 1000);
  //eliminamos la exploradora de donde esté y la colocamos en la celda 99
  const explActual = document.querySelector(".exploradora");
  explActual.classList.remove("exploradora");
  document.querySelector("#c99").classList.add("exploradora");
  //quitamos la puerta cerrada
  const puertaActual = document.querySelector(".door_closed");
  puertaActual.classList.remove("door_closed");
  //se llama a las funciones para colocar la puerta abierta y la exploradora
  colocarPuertayExploradora();
  comenzarJuego();
}

function moverSerpientes() {
  //creamos los arrays con las diferentes serpientes
  const serpientes1 = document.querySelectorAll(".serpiente1");
  const serpientes2 = document.querySelectorAll(".serpiente2");
  const serpientes3 = document.querySelectorAll(".serpiente3");
  for (let index = 0; index < 15; index++) {
    serpientes1.forEach((serpiente1) => {
      //obtenemos la posicion actual
      const posicionActual = serpiente1.getAttribute("id");
      //obtenemos el numero
      const posicionActualNumero = parseInt(posicionActual.substring(1));
      //sumamos la posicion 1 a la posicion actual
      let posicionNuevaNumero = posicionActualNumero + 1;
      if (posicionNuevaNumero == 100) {
        posicionNuevaNumero = 1;
      }
      //creamos a cadena
      const posicionNueva = "c" + posicionNuevaNumero;
      comprobarChoque();
      //borramos la clase anterior
      serpiente1.classList.remove("serpiente1");
      //añadimos serpiente a la clase nueva
      document.querySelector(`#${posicionNueva}`).classList.add("serpiente1");
    });
    serpientes3.forEach((serpiente) => {
      //obtenemos la posicion actual
      const posicionActual = serpiente.getAttribute("id");
      //obtenemos el numero
      const posicionActualNumero = parseInt(posicionActual.substring(1));
      //sumamos la posicion 1 a la posicion actual
      let posicionNuevaNumero = posicionActualNumero + 1;
      if (posicionNuevaNumero == 100) {
        posicionNuevaNumero = 1;
      }
      //creamos a cadena
      const posicionNueva = "c" + posicionNuevaNumero;
      comprobarChoque();
      //borramos la clase anterior
      serpiente.classList.remove("serpiente3");
      //añadimos serpiente a la clase nueva
      document.querySelector(`#${posicionNueva}`).classList.add("serpiente3");
    });
    serpientes2.forEach((serpiente) => {
      //obtenemos la posicion actual
      const posicionActual = serpiente.getAttribute("id");
      //obtenemos el numero
      const posicionActualNumero = parseInt(posicionActual.substring(1));
      //sumamos la posicion 1 a la posicion actual
      let posicionNuevaNumero = posicionActualNumero + 10;
      if (posicionActualNumero == 90) {
        posicionNuevaNumero = 10;
      }
      if (posicionNuevaNumero > 100) {
        posicionNuevaNumero = posicionNuevaNumero - 100;
      }
      //creamos a cadena
      const posicionNueva = "c" + posicionNuevaNumero;
      comprobarChoque();
      //borramos la clase anterior
      serpiente.classList.remove("serpiente2");
      //añadimos serpiente a la clase nueva
      document.querySelector(`#${posicionNueva}`).classList.add("serpiente2");
    });
  }
}

function mensajeErroryBoton() {
  clearInterval(intervaloSerpientes);
  Swal.fire({
    title: "Has sido deborada por la serpiente!!",
    imageUrl: "../../TareaUD5-UD6/images/serpienteComiendo.jpg",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
}

/**
 * @description Funcion que comprueba si las serpientes
 * han chocado con la exploradora o no comprobando sus
 * posiciones
 */
function comprobarChoque() {
  let explActual = document.querySelector(".exploradora");
  let posicionActualExpl = explActual.getAttribute("id");
  let numPosExplo = parseInt(posicionActualExpl.substring(1));
  let choca = false;
  const serpientes1 = document.querySelectorAll(".serpiente1");
  const serpientes2 = document.querySelectorAll(".serpiente2");
  const serpientes3 = document.querySelectorAll(".serpiente3");

  serpientes1.forEach((serpiente) => {
    let posicion = serpiente.getAttribute("id");
    let numPosicion = parseInt(posicion.substring(1));
    if (numPosExplo == numPosicion) {
      choca = true;
    }
  });
  serpientes2.forEach((serpiente) => {
    let posicion = serpiente.getAttribute("id");
    let numPosicion = parseInt(posicion.substring(1));
    if (numPosExplo == numPosicion) {
      choca = true;
    }
  });
  serpientes3.forEach((serpiente) => {
    let posicion = serpiente.getAttribute("id");
    let numPosicion = parseInt(posicion.substring(1));
    if (numPosExplo == numPosicion) {
      choca = true;
    }
  });

  //si choca manda mensaje de error
  if (choca) {
    mensajeErroryBoton();
  }
}

function actualizarCuenta(){
  let segundos = 15;
  tiempo.innerHTML = `Escapa en ${segundos} segundos`;
  segundos--;
  if (segundos == 0) {
    clearInterval(intervaloSerpientes);
    clearInterval(intervaloCronometro);
    Swal.fire({
      title: "Has sido deborada por la serpiente!!",
      imageUrl: "../../TareaUD5-UD6/images/finalizado.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    if (botonCreado == false) {
      const divBoton = document.querySelector("#boton");
      const boton = document.createElement("button");
      boton.textContent = "Jugar de nuevo";
      divBoton.appendChild(boton);
      boton.addEventListener("click", reiniciarJuego);
      botonCreado = true;
    }
  }
}

