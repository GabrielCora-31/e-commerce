document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formulario")
    .addEventListener("submit", validarFormulario);
});
// funcion para validar que los campos esten rellenados y no vacios
function validarFormulario(evento) {
  evento.preventDefault();
  // Aqui obtenemos lo ingresado en el campo usuario y verificamos que no este vacio, de estarlo se emitira
  // un alert indicando que no se escribio nada
  var usuario = document.getElementById("login").value;
  if (usuario.length == 0) {
    alert("No has escrito nada en el usuario");
    return;
  }
  // En este caso lo que verificams es la clave
  var clave = document.getElementById("password").value;
  if (clave.length == 0) {
    alert("La clave no es válida");
    return;
  }
  this.submit();
}
