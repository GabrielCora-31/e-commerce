// Esta funcion muestra las distintas imagenes del producto:

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 0; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
      imageSrc +
      `" alt="">
            </div>
        </div>
        `;

    document.getElementById("productImagesGallery").innerHTML =
      htmlContentToAppend;
  }
}

// Funcion para mostrar los comentarios:
function showComments(jsonComments) {
  let htmlContentToAppend = "";
  let checked = `<span class="fa fa-star checked"></span>`;
  let notChecked = `<span class="fa fa-star"></span>`;
  for (let index = 0; index < jsonComments.length; index++) {
    comment = jsonComments[index];
    htmlContentToAppend += `<div class="card"><div class="card-header stars"> Fecha: ${
      comment.dateTime +
      " " +
      checked.repeat(comment.score) +
      notChecked.repeat(5 - comment.score)
    }
      </div>
      <div class="card-body">
      <blockquote class="blockquote mb-0">
      <p>${comment.description}</p>
      <footer class="blockquote-footer"> <cite title="Source Title">${
        comment.user
      }</cite></footer>
      </blockquote>
      </div></div>`;
  }
  document.getElementById("commentCard").innerHTML = htmlContentToAppend;
}

// Con la siguiente funcion se guarda un comentario ingresado en forma de objeto para ser agregado a la lista de
// comentarios ya existentes
var comentarios = [];
function addComments() {
  //   obtenemos la fecha del sistema
  let date = new Date();
  //   Aqui le damos un formato lindo a la misma
  let prettyDate =
    date.getDate().toString().padStart(2, `0`) +
    "/" +
    (date.getMonth() + 1).toString().padStart(2, `0`) +
    "/" +
    date.getFullYear().toString() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes();
  //   Con esta linea de codigo btenemos el mensaje del comentario
  let text = document.getElementById("floatingTextarea2").value;
  //   Puntuacion
  let score = document.getElementById("score").value;
  // Construimos una nueva entrada en base al coementario ingresado para la lista
  // de comentarios con los mismos registros
  let newComment = {
    score: score,
    description: text,
    user: localStorage.getItem("user"),
    dateTime: prettyDate,
  };
  comentarios.push(newComment);
  showComments(comentarios);
  document.getElementById("formComments").reset();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //Aqui obtenemos los datos del json que corresponde a la informacion del producto y
  //se procesan para su posterior visualizacion
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML =
        document.getElementById("productDescription");
      let productCostHTML = document.getElementById("cost");
      let productSoldHTML = document.getElementById("soldCount");
      let productCategoryHTML = document.getElementById("category");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.cost + " " + product.currency;
      productSoldHTML.innerHTML = product.soldCount;
      productCategoryHTML.innerHTML = product.category;

      //Muestro las imagenes en forma de galería
      showImagesGallery(product.images);
    }
  });
  //  Aqui obtenemos los comentarios acerca de los produtos que nos son dados a traves de un JSON y se
  //  llama a la funcion que los muestra
  getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      comentarios = resultObj.data;
      showComments(comentarios);
    }
  });
});
