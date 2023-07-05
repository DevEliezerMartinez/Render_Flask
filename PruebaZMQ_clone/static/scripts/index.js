
let spanElement = document.getElementById("fecha_span");
let fechaActual = new Date();
let dia = fechaActual.getDate();
if (dia < 10) {
  dia = "0" + dia;
}
let mes = fechaActual.getMonth() + 1;
if (mes < 10) {
  mes = "0" + mes;
}
let anio = fechaActual.getFullYear().toString().slice(-2);
let formatoFecha = dia + "/" + mes + "/" + anio;
spanElement.textContent = formatoFecha;

// hora
let spanElementHora = document.getElementById("hora_span");

function agregarCero(num) {
  return num < 10 ? "0" + num : num;
}

function actualizarHora() {
  let fechaActual = new Date();

  let horas = agregarCero(fechaActual.getHours());
  let minutos = agregarCero(fechaActual.getMinutes());

  let formatoHora = horas + ":" + minutos;

  spanElementHora.textContent = formatoHora;
}

actualizarHora();

setInterval(actualizarHora, 60000);
