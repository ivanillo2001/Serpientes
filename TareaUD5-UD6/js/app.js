"use strict";
//declaramos el array de las posiciones
//declaramos tablero
const tabla = document.querySelector("#table");
const tablero = document.createElement("table");

let aSerpientes = [];
document.addEventListener("DOMContentLoaded", () => {
  crearTablero(); //nada más empezar se crea el tablero
  document.addEventListener("keydown", comenzarJuego);
});
let botonCreado = false;
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
    for (let j = 1; j < 4; j++) {
      let numeroAleatorio = Math.floor(Math.random() * 97) + 2;
      while (aSerpientes.includes(numeroAleatorio)) {
        numeroAleatorio = Math.floor(Math.random() * 97) + 2;
      }
      document
        .querySelector(`#c${numeroAleatorio}`)
        .classList.add(`serpiente${j}`);
    }
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

function moverIzquierda(evento) {
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
  console.log(object);
  comprobarVictoria(numPosicionNueva);
  evento.preventDefault();
}

function moverDerecha(evento) {
  //obtenemos posicion actual
  const explActual = document.querySelector(".exploradora");
  const posicionActual = explActual.getAttribute("id");

  //como es una cadena necesitamos obtener el número, por lo que hacemos un substring
  const numPosicionActual = parseInt(posicionActual.substring(1));
  //controlamos que no esté en el borde izquierdo
  if (numPosicionActual % 10 !== 9) {
    console.log(numPosicionActual);
    //Una vez ya tenemos la posicion, debemos calcular la nueva posicion
    const numPosicionNueva = numPosicionActual + 1;
    const posicionNueva = "c" + numPosicionNueva;
    comprobarVictoria(numPosicionNueva);
    //movemos a la exploradora
    explActual.classList.remove("exploradora");
    document.querySelector(`#${posicionNueva}`).classList.add("exploradora");
  }
  comprobarVictoria(numPosicionNueva);
  evento.preventDefault();
}

function moverArriba(evento) {
  //obtenemos posicion actual
  const explActual = document.querySelector(".exploradora");
  const posicionActual = explActual.getAttribute("id");

  //como es una cadena necesitamos obtener el número, por lo que hacemos un substring
  const numPosicionActual = parseInt(posicionActual.substring(1));
  //controlamos que no esté en el borde izquierdo
  if (numPosicionActual >= 10) {
    console.log(numPosicionActual);
    //Una vez ya tenemos la posicion, debemos calcular la nueva posicion
    const numPosicionNueva = numPosicionActual - 10;
    const posicionNueva = "c" + numPosicionNueva;
    comprobarVictoria(numPosicionNueva);
    //movemos a la exploradora
    explActual.classList.remove("exploradora");
    document.querySelector(`#${posicionNueva}`).classList.add("exploradora");
  }

  evento.preventDefault();
}

function moverAbajo(evento) {
  //obtenemos posicion actual
  const explActual = document.querySelector(".exploradora");
  const posicionActual = explActual.getAttribute("id");

  //como es una cadena necesitamos obtener el número, por lo que hacemos un substring
  const numPosicionActual = parseInt(posicionActual.substring(1));
  //controlamos que no esté en el borde izquierdo
  if (numPosicionActual < 90) {
    console.log(numPosicionActual);
    //Una vez ya tenemos la posicion, debemos calcular la nueva posicion
    const numPosicionNueva = numPosicionActual + 10;
    const posicionNueva = "c" + numPosicionNueva;
    comprobarVictoria(numPosicionNueva);
    //movemos a la exploradora
    explActual.classList.remove("exploradora");
    document.querySelector(`#${posicionNueva}`).classList.add("exploradora");
  }

  evento.preventDefault();
}

/**
 * @description Esta función comprueba si la posicion de
 * la exploradora es la misma que la de la puerta.
 * Si lo es muestra un sweetAlert de que ha conseguido llegar
 */
function comprobarVictoria(numPosicionNueva) {
  if (numPosicionNueva == 0) {
    const puertaActual = document.querySelector(".door_opened");
    puertaActual.classList.remove("door_opened");
    puertaActual.classList.add("door_closed");
    Swal.fire({
      title: "Enhorabuena!",
      text: "Has conseguido llegar a la puerta",
      imageUrl: "../images/ganadora.png",
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

function reiniciarJuego() {
  const explActual = document.querySelector(".exploradora");
  explActual.classList.remove("exploradora");
  const puertaActual = document.querySelector(".door_closed");
  puertaActual.classList.remove("door_closed");
  puertaActual.classList.add("door_opened");
  borrarSerpientes();
  colocarSerpientes();
  colocarPuertayExploradora();
  comenzarJuego();
}
