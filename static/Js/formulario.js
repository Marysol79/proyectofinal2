function validacion() {
  var valorNombre = document.getElementById("firstName").value;
  var valorApellido = document.getElementById("lastName").value;
  var valorEmail = document.getElementById("email").value;
  var valorCelular = document.getElementById("cellphone").value;
  var valorMensaje = document.getElementById("message").value;
  
  // Limpiar mensajes de error previos
  document.getElementById('errorNombre').innerHTML = "";
  document.getElementById('errorApellido').innerHTML = "";
  document.getElementById('errorEmail').innerHTML = "";
  document.getElementById('errorCelular').innerHTML = "";
  document.getElementById('errorMessage').innerHTML = "";
  
  if (valorNombre == null || valorNombre.length == 0) {
      document.getElementById('errorNombre').innerHTML = "Tienes que completar el Nombre!";
      document.getElementById('firstName').focus();
      return false;
  } else if (valorApellido == null || valorApellido.length == 0) {
      document.getElementById('errorApellido').innerHTML = "Tienes que completar el Apellido!";
      document.getElementById('lastName').focus();
      return false;
  } else if (!(/^\w+([\.-]?\w+)*@(?:|hotmail|outlook|yahoo|live|gmail)\.(?:|com|ar)+$/.test(valorEmail))) {
      document.getElementById('errorEmail').innerHTML = "No es una direccion de email correcta";
      document.getElementById('email').value = '';
      document.getElementById('email').focus();
      return false;
  } else if (!(/^\d+$/.test(valorCelular))) {
      document.getElementById('errorCelular').innerHTML = "El número de celular debe contener solo números";
      document.getElementById('cellphone').value = '';
      document.getElementById('cellphone').focus();
      return false;
  } else if (valorMensaje == null || valorMensaje.length == 0) {
      document.getElementById('errorMessage').innerHTML = "Tienes que escribir un mensaje!";
      document.getElementById('message').focus();
      return false;
  }
  
}
