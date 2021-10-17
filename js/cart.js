// Inicializo variables necesarias:
let cartProducts = [];
let currency = "UYU";

// Esta funcion actualiza el valor del subtotal a medida que modificamos la cantidad de productos en el carrito
function updateProductSubtotal(id) {
  let cost = convert(
    cartProducts[id - 1].unitCost,
    cartProducts[id - 1].currency
  );
  let cantidad = document.getElementById(id).value;
  if (cantidad <= 0) {
    cantidad = 1;
    document.getElementById(id).value = 1;
  }
  document.getElementById("subtotal" + id).innerHTML = cantidad * cost;
  sumaSubtotales();
}

// Aqui construimos esta funcion para mostrar los articulos del carrito mostrar los productos y sus datos en funcion de la cantida ingresada
function showCarrito() {
  let htmlToAppend = "";
  let htmlToAppend2 = "";
  let id = 1;
  let cost = 0;
  for (let article of cartProducts) {
    cost = convert(article.unitCost, article.currency);

    htmlToAppend += `
        <tr>
        <td><img src="${
          article.src
        }" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${article.name}</td>
        <td class="align-middle" id="unitCost${id}">${currency} ${cost}</td>
        <td class="align-middle"><input id="${id}" onchange="updateProductSubtotal(${id});" type="number" min ="1" value=${
      article.count
    }></td>
        <td id="subtotal${id}">${article.count * cost}</td>
        </tr>`;

    id++;
  }

  htmlToAppend2 = `
          <tr>
          <td></td>
          <td></td>
          <td></td>
          <td> Total: </td>
          <td id="sumaSubtotal"></td>
          </tr>`;

  document.getElementById("carrito").innerHTML = htmlToAppend + htmlToAppend2;
}

// Esta funcion se declara para cambiar la moneda y mostrar el valor del subtotal en una y en otra divisa
function switchCurrency() {
  let costoUnitario = 0;
  let cantidad = 0;
  for (let i = 1; i <= cartProducts.length; i++) {
    costoUnitario = convert(
      cartProducts[i - 1].unitCost,
      cartProducts[i - 1].currency
    );
    cantidad = document.getElementById(i).value;
    if (cantidad <= 0) {
      cantidad = 1;
      document.getElementById(i).value = 1;
    }
    document.getElementById("subtotal" + i).innerHTML =
      cantidad * costoUnitario;
    document.getElementById("unitCost" + i).innerHTML =
      currency + " " + costoUnitario;
  }
  sumaSubtotales();
}

//Funcion para mostrar suma de subtotales
function sumaSubtotales() {
  let subtotal = 0;
  for (let i = 1; i <= cartProducts.length; i++) {
    subtotal =
      subtotal +
      parseFloat(document.getElementById("subtotal" + i).textContent);
  }

  document.getElementById("sumaSubtotal").innerHTML = subtotal;
  document.getElementById("subtotalCost").innerHTML = subtotal;
  // Aqui habra que modificar a futuro para incluir el monto extra del metodo de envio
  document.getElementById("totalCost").innerHTML = subtotal;
}

// La siguiente funcion calculara los costos totales con envio incluido:
// function getFinalCost() {
//   let finalCost = 0;
//   let shippingForm = document.getElementById("shippingForm");
//   let shippingCost = shippingForm.value;
// }

// Aqui construimos la funcion que cambiara el valor de una divisa al equivalente de la otra
function convert(cost, currency2) {
  if (currency == "UYU" && currency2 == "USD") {
    cost = cost * 40;
  } else if (currency == "USD" && currency2 == "UYU") {
    cost = cost / 40;
  }
  return cost;
}

// Esta funcion existe para traer el contenido del JSON y asi poder trabajar con el
function getCart(url) {
  return fetch(url).then((respuesta) => {
    return respuesta.json();
  });
}
// El siguiente codigo se correra una vez que cargue el documento
document.addEventListener("DOMContentLoaded", function (e) {
  getCart("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(
    (respuesta) => {
      cartProducts = respuesta.articles;
      currency = "UYU";
      showCarrito();
      sumaSubtotales();
      document
        .getElementById("uruguayos")
        .addEventListener("click", function (e) {
          currency = "UYU";
          switchCurrency();
        });
      document
        .getElementById("dolares")
        .addEventListener("click", function (e) {
          currency = "USD";
          switchCurrency();
        });
    }
  );
});
