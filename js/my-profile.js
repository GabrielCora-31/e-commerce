// Mediante la siguiente funcion guardaremos la informacion ingresada en el perfil:

function saveProfileInfo() {
  let picSelected = document.getElementById("pic");
  let profileInfo = {
    firstName: document.getElementById("profileName1").value,
    secondName: document.getElementById("profileName2").value,
    firstSurname: document.getElementById("profileSurname1").value,
    secondSurname: document.getElementById("profileSurname2").value,
    age: document.getElementById("profileAge").value,
    email: document.getElementById("profileEmail").value,
    telephone: document.getElementById("profileTelephone").value,
    image: picSelected.src,
  };
  localStorage.setItem("profileInfo", JSON.stringify(profileInfo));
  location.reload();
}

// Para cargar una imagen de perfil creamos la siguiente funcion:
function loadPic() {
  let picSelected = document.getElementById("pic");
  let file = document.getElementById("inputPic").files[0];
  // Aprovechamos el metodo FileReder de JavaScript para "leer" la imagen que seleccionaremos
  let reader = new FileReader();
  // Mediante el "onloadend" hacemos que cuando se termine de leer la imagen cargada se ejecute la siguiente funcion:
  reader.onloadend = function () {
    picSelected.src = reader.result;
  };
  // Si aun no elegimos una imagen de perfil se cargara una por defecto:
  if (file) {
    reader.readAsDataURL(file);
  } else {
    picSelected.src =
      "https://i.ibb.co/PxsmRxW/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-des.png";
  }
}

// La siguiente funcion mostrara la informacion guardada del :

function displayProfile() {
  let picSelected = document.getElementById("pic");
  if (localStorage.getItem("profileInfo") != null) {
    let info = JSON.parse(localStorage.getItem("profileInfo"));
    document.getElementById("profileName1").value = info.firstName;
    document.getElementById("profileName2").value = info.secondName;
    document.getElementById("profileSurname1").value = info.firstSurname;
    document.getElementById("profileSurname2").value = info.secondSurname;
    document.getElementById("profileAge").value = info.age;
    document.getElementById("profileEmail").value = info.email;
    document.getElementById("profileTelephone").value = info.telephone;
    picSelected.src = info.image;
  } else {
    picSelected.src =
      "https://i.ibb.co/PxsmRxW/png-transparent-user-profile-computer-icons-user-interface-mystique-miscellaneous-user-interface-des.png";
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  displayProfile();
});
