"use strict";
//declaramos el array de las posiciones
//declaramos tablero
const tabla = document.querySelector("#table");
const tablero = document.createElement("table");
//declaramos la constante tiempo, que almacenará la cuenta regresiva
const tiempo = document.querySelector("#time");
//declaramos el boton
const divBoton = document.querySelector("#boton");
const boton = document.createElement("button");
boton.textContent = "Jugar de nuevo";
divBoton.appendChild(boton);
//declaramos el array de posiciones
let aPosiciones = [];
//creamos los dos intervalos. Uno es el de los movimientos de las serpientes
//y el otro es el de la cuenta regresiva
let intervaloSerpientes;
let intervaloCronometro;
//declaramos los segundos
let segundos;
document.addEventListener("DOMContentLoaded", () => {
  crearTablero(); //nada más empezar se crea el tablero
  document.addEventListener("keydown", comenzarJuego); //al pulsar la primera tecla comienza el juego
  intervaloSerpientes = setInterval(moverSerpientes, 1000); //comienza el movimiento de serpientes
  segundos = 14; //al empezar la cuenta tiene que empezar en 14 porque el inicial es 15
  intervaloCronometro = setInterval(actualizarCuenta, 1000); //comienza la cuenta atras
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
  boton.addEventListener("click",reiniciarJuego);
  boton.style.display="none";
}
function colocarPuertayExploradora() {
  //declaramos las imágenes que están al inicio, que son la puerta y la exploradora
  document.querySelector("#c0").classList.add("door_opened");
  document.querySelector("#c99").classList.add("exploradora");
}
function eliminarExploradora() {
  const explActual = document.querySelector(".exploradora");
  explActual.classList.remove("exploradora");
}
/**
 * @description Funcion colocarSerpientes() es la encargada
 * de que cada vez que comienza el juego se coloquen las serpientes de manera aleatoria.
 * Hacemos 3 bucles para cad tipo de serpiente y verificamos que su posición no se encuentre
 * en el array que se declaró arriba.la posicion debe de ser entre 1 y 98, excluyendo la
 * posicion 0, donde está la puerta y la 99 que es donde está la exploradora
 */
function colocarSerpientes() {
  for (let id = 0; id < 4; id++) {
    for (let index = 0; index < 4; index++) {
      let numRandom = Math.floor(Math.random() * 97) + 2;
      while (aPosiciones.includes(`c${numRandom}`)) {
        numRandom = Math.floor(Math.random() * 97) + 2;
      }
      aPosiciones.push(`c${numRandom}`);
      document.querySelector(`#c${numRandom}`).classList.add(`serpiente${id}`);
    }
  }
}
/**
 * @description Funcion que se encarga de borrar las serpientes al reiniciar
 * el juego. Selecciona todos los elementos que haya serpientes y les borra
 * la clase.
 */
function borrarSerpientes() {
  for (let index = 1; index < 4; index++) {
    const serpientes = document.querySelectorAll(`.serpiente${index}`);
    serpientes.forEach((serpiente) => {
      serpiente.classList.remove(`serpiente${index}`);
    });
  }
}
/**
 * Esta función es la que controla los movimientos de la exploradora
 * @param {*} event keydown
 */
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
    clearInterval(intervaloCronometro);
    const puertaActual = document.querySelector(".door_opened");
    puertaActual.classList.remove("door_opened");
    puertaActual.classList.add("door_closed");
    let tiempoTardado = 14 - segundos;
    Swal.fire({
      title: "Enhorabuena!",
      text: "Has conseguido llegar a la puerta",
      text: "Has tardado " + tiempoTardado + " segundos",
      imageUrl: "../../TareaUD5-UD6/images/ganadora.png",
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Custom image",
    });
    boton.style.display="block";
    eliminarExploradora();
  }
}
/**
 * @description Funcion para reiniciar el juego
 * borrando y añadiendo las clases necesarias
 */
function reiniciarJuego() {
  boton.style.display="none";
  aPosiciones.length=0;
  //colocamos puerta y exploradora
  colocarPuertayExploradora();
  //eliminamos el intervalo de movimiento de serpientes
  clearInterval(intervaloSerpientes);
  //quitamos las serpientes de donde están
  borrarSerpientes();
  //volvemos a colocar las serpientes en sitios aleatorios
  colocarSerpientes();
  // Establecer un nuevo intervalo de movimiento de serpientes
  intervaloSerpientes = setInterval(moverSerpientes, 1000);
  segundos = 15; //volvemos a setear los segundos a 15
  //Establecemos nuevo intervalo para el cronómetro
  intervaloCronometro = setInterval(actualizarCuenta, 1000);
  //quitamos la puerta cerrada
  const puertaActual = document.querySelector(".door_closed");
  puertaActual.classList.remove("door_closed");
  eliminarExploradora();
  //Comienza el juego
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
/**
 * @description Función que muestra el mensaje de error por haber perdido
 */
function mensajeErroryBoton() {
  clearInterval(intervaloSerpientes);
  clearInterval(intervaloCronometro);
  Swal.fire({
    title: "Has sido deborada por la serpiente!!",
    imageUrl: "../../TareaUD5-UD6/images/serpienteComiendo.jpg",
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: "Custom image",
  });
  boton.style.display="block";
}
/**
 * @description Funcion que comprueba si las serpientes
 * han chocado con la exploradora o no comprobando sus
 * posiciones
 */
function comprobarChoque() {
  let explActual = document.querySelector(".exploradora");
  let posicionActualExpl = explActual.getAttribute("id");
  let choca = false;
  for (let index = 1; index < 4; index++) {
    const serpientes = document.querySelectorAll(`.serpiente${index}`);
    serpientes.forEach((serpiente) => {
      if (serpiente.getAttribute("id") == posicionActualExpl) {
        choca = true;
      }
    });
  }
  //si choca manda mensaje de error
  if (choca) {
    eliminarExploradora();
    mensajeErroryBoton();
  }
}
/**
 * @description Función que lleva el intervalo del cronómetro.
 * Al llegar a 0 si la exploradora no ha llegado a la puerta
 * muestra mensaje de error
 */
function actualizarCuenta() {
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
    boton.style.display="block";
  }
}