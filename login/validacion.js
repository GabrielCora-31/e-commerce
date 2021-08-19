document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formulario")
    .addEventListener("submit", validarFormulario);
});

function validarFormulario(evento) {
  evento.preventDefault();
  var usuario = document.getElementById("login").value;
  if (usuario.length == 0) {
    alert("No has escrito nada en el usuario");
    return;
  }
  var clave = document.getElementById("password").value;
  if (clave.length == 0) {
    alert("La clave no es válida");
    return;
  }
  this.submit();
}
