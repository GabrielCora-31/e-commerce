// declaramos un array para guardar la info de los productos extraidos del JSON despues de procesarlo
var productArray = [];

// Con esta funcion se muestran los productos a los que hace referencia el JSON, colocando en un div con id: "product-list-container" los
// diferentes datos de cada producto.
function showProductsList(array) {
  let htmlContentToAppend = "";
  for (let index = 0; index < array.length; index++) {
    let product = array[index];
    htmlContentToAppend +=
      ` <div class="list-group-item list-group-item-action">
        <div class="row">
            <div class="col-3">
                <img src="` +
      product.imgSrc +
      `" alt="` +
      product.description +
      `" class="img-thumbnail">
        </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">` +
      product.name +
      `</h4>
                        <small class="text-muted">` +
      product.soldCount +
      ` artículos</small>
                    </div>
                    <p>` +
      product.description +
      `</p>
                </div>
            </div>
        </div>
        `;
  }
  document.getElementById("product-list-container").innerHTML =
    htmlContentToAppend;
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //con esta funcion obtenemos los datos contenidos en el JSON y los procesamos para darle a la funcion showProductList lo que tiene que mostrar
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productArray = resultObj.data;
      showProductsList(productArray);
    }
  });
});
