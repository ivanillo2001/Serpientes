"use strict";
//declaramos el array de las posiciones
let aPosiciones = [];
document.addEventListener("DOMContentLoaded", () => {
  crearTablero(); //nada más empezar se crea el tablero
});

function crearTablero() {
  let contadorPosiciones = -1;
  const tablero = document.querySelector("#table");
  for (let i = 0; i < 10; i++) {
    const fila = document.createElement("tr");
    for (let index = 0; index < 10; index++) {
      contadorPosiciones++;
      const celda = document.createElement("td");
      celda.setAttribute("id", contadorPosiciones);
      if (celda.getAttribute("id") === "0") {
        //si la celda es la 0 se llama a la funcion agregarImagenInicio
        agregarImagenInicio(celda,"door_opened");
      } else if (celda.getAttribute("id")==="99") {
        //si la celda tiene id 99 llama a funcion para agregarle la clase
        agregarImagenInicio(celda,"exploradora");
      }
      fila.appendChild(celda);
    }
    tablero.appendChild(fila);
  }
}

function agregarImagenInicio(carta,clase) {
    const imagen = document.createElement("img");
    imagen.classList.add(clase);
    carta.appendChild(imagen);
}