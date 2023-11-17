"use strict";
//declaramos el array de las posiciones
let aPosiciones = [];
//declaramos tablero

document.addEventListener("DOMContentLoaded", () => {
  crearTablero(); //nada más empezar se crea el tablero
});

function crearTablero() {
  const tabla = document.querySelector("#table");
  const tablero = document.createElement("table");
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
    let numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    while (aPosiciones.includes(`c${numeroAleatorio}`)) {
      numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    }
    console.log(`La serpiente 1 estará en la posicion: ${numeroAleatorio}`);
    aPosiciones.push(`c${numeroAleatorio}`);
    document.querySelector(`#c${numeroAleatorio}`).classList.add("serpiente1");
  }
  for (let i = 0; i < 4; i++) {
    let numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    while (aPosiciones.includes(`c${numeroAleatorio}`)) {
      numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    }
    console.log(`La serpiente 2 estará en la posicion: ${numeroAleatorio}`);
    aPosiciones.push(`c${numeroAleatorio}`);
    document.querySelector(`#c${numeroAleatorio}`).classList.add("serpiente2");
  }
  for (let i = 0; i < 4; i++) {
    let numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    while (aPosiciones.includes(`c${numeroAleatorio}`)) {
      numeroAleatorio = Math.floor(Math.random() * 97) + 2;
    }
    console.log(`La serpiente 3 estará en la posicion: ${numeroAleatorio}`);
    aPosiciones.push(`c${numeroAleatorio}`);
    document.querySelector(`#c${numeroAleatorio}`).classList.add("serpiente3");
  }
}
