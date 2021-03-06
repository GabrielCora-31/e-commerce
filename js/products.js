// Constantes necesarias para trabajar con el criterio de filtrado y ordenado a utilizar:

const FILTER_BY_RANGE_PRICE = "price";
const ORDER_ASC_BY_PRICE = "Ascend.";
const ORDER_DESC_BY_SOLDCOUNT = "9-0";
const ORDER_DESC_BY_PRICE = "Descen.";
var currentProductArray = [];
var currentSortCriteria = undefined;

// Variables para los rangos de precio:
var minPrice = undefined;
var maxPrice = undefined;

// Declaramos un array para guardar la info de los productos extraidos del JSON despues de procesarlo:
var productArray = [];

// Con esta funcion se muestran los productos a los que hace referencia el JSON, colocando en un div con id: "product-list-container" los
// diferentes datos de cada producto:
function showProductsList(array) {
  let htmlContentToAppend = "";
  for (let index = 0; index < array.length; index++) {
    let product = array[index];
    // El siguiente "if" fue agregado para incluir la comprobacion logica
    // detras de la nueva caracteristica de filtrado por rango de precios:
    if (
      (minPrice == undefined ||
        (minPrice != undefined && parseInt(product.cost) >= minPrice)) &&
      (maxPrice == undefined ||
        (maxPrice != undefined && parseInt(product.cost) <= maxPrice))
    ) {
      htmlContentToAppend +=
        `<div class="col-md-6 col-lg-4"> 
      <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
          <img class="bd-placeholder-img card-img-top" src="` +
        product.imgSrc +
        `">
          <h4 class="m-3">` +
        product.name +
        `</h4>
          <div class="card-body">
            <p class="text-muted">Vendidos: ` +
        product.soldCount +
        `</p>
            <p class="card-text">` +
        product.description +
        `</p>
            <small class="float-start badge rounded-pill"> ` +
        product.currency +
        " " +
        product.cost +
        ` </small>
          </div>   
      </a>
  </div>`;
    }
    document.getElementById("product-list-container").innerHTML =
      htmlContentToAppend;
  }
}

// Funcion para ordenar segun el criterio elegido:

function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (parseInt(a.cost) < parseInt(b.cost)) {
        return -1;
      }
      if (parseInt(a.cost) > parseInt(b.cost)) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_PRICE) {
    result = array.sort(function (a, b) {
      if (parseInt(a.cost) > parseInt(b.cost)) {
        return -1;
      }
      if (parseInt(a.cost) < parseInt(b.cost)) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_SOLDCOUNT) {
    result = array.sort(function (a, b) {
      let aSoldCount = parseInt(a.soldCount);
      let bSoldCount = parseInt(b.soldCount);

      if (aSoldCount > bSoldCount) {
        return -1;
      }
      if (aSoldCount < bSoldCount) {
        return 1;
      }
      return 0;
    });
  }
  return result;
}
// Esta funcion hara que se muestre la lista de productos ordenadas:

function sortAndShowProduct(sortCriteria, productArray) {
  currentSortCriteria = sortCriteria;
  if (productArray != undefined) {
    currentProductArray = productArray;
  }
  currentProductArray = sortProducts(currentSortCriteria, currentProductArray);

  //Muestro los productos ordenados previamente ordenados:
  showProductsList(currentProductArray);
}

//Funci??n que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //con esta funcion obtenemos los datos contenidos en el JSON y los procesamos para darle a la funcion showProductList lo que tiene que mostrar:
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      productArray = resultObj.data;
      showProductsList(productArray);
    }
  });
  // Aqui mediante DOM captamos el click a los botones de ordenamiento y filtrado y ejecutamos el codigo para darle la funcionalidad:
  document.getElementById("priceAsc").addEventListener("click", function () {
    sortAndShowProduct(ORDER_ASC_BY_PRICE, productArray);
  });
  document.getElementById("priceDesc").addEventListener("click", function () {
    sortAndShowProduct(ORDER_DESC_BY_PRICE, productArray);
  });
  document
    .getElementById("sortBySoldCount")
    .addEventListener("click", function () {
      sortAndShowProduct(ORDER_DESC_BY_SOLDCOUNT, productArray);
    });
  document
    .getElementById("clearRangeFilter")
    .addEventListener("click", function () {
      document.getElementById("rangeFilterPriceMin").value = "";
      document.getElementById("rangeFilterPriceMax").value = "";

      minPrice = undefined;
      maxPrice = undefined;
      showProductsList(productArray);
    });
  document
    .getElementById("rangeFilterPrice")
    .addEventListener("click", function () {
      //Obtengo el m??nimo y m??ximo de los intervalos para filtrar por precio de los productos mostrados
      minPrice = document.getElementById("rangeFilterPriceMin").value;
      maxPrice = document.getElementById("rangeFilterPriceMax").value;

      if (minPrice != undefined && minPrice != "" && parseInt(minPrice) >= 0) {
        minPrice = parseInt(minPrice);
      } else {
        minPrice = undefined;
      }

      if (maxPrice != undefined && maxPrice != "" && parseInt(maxPrice) >= 0) {
        maxPrice = parseInt(maxPrice);
      } else {
        maxPrice = undefined;
      }

      showProductsList(productArray);
    });
});
