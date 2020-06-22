//Función para consultar todos los productos
function BusquedaProductosHome() {
  event.preventDefault();
  var busqueda = $('#txtBasicSearch').val();

  if (busqueda != "") {
    window.location = "Productos.html?name=" + busqueda;
  }
  else {
    MensajeGenericoIcono('El cuadro de búsqueda esta vacio', '', 'info', false, 'Ok');
  }
}

function resolveBasicRequest() {
  var byCategory = getParameterByName("cat");
  var byName = getParameterByName("name");

  var results;
  if (byCategory) {
    results = getProductsBy("category", byCategory, injectProducts);
  } else if (byName) {
    results = getProductsBy("name", byName, injectProducts);
  } else {
    results = getProductsBy(null, null, injectProducts);
  }
}

function injectProducts(results) {
  if (!results) {
    window.location = "ProductoNoEncontrado.html";
  }
  if (typeof document != 'undefined') {
    var productList = document.getElementById("productList");
    productList.innerHTML = results;
  }
}

function getProductsBy(filter, value, resultHandler) {
  const Productos = Parse.Object.extend('Product');
  const query = new Parse.Query(Productos);

  var title = "";
  if (filter) {
    // query.contains(filter, value);
    query.matches(filter, "(?i).{0,}(" + value + ").{0,}")
    title = value + "...";
  } else {
    title = "Productos";
  }

  query.find().then((results) => {
    if (results.length > 0) {
      var result = "<h2 class=\"title text-center\">" + title + "</h2>\n";
      result += results.map(createProductItem).reduce(reduceList);
      resultHandler(result);
    }
    else {
      resultHandler(null);
    }
  }, (error) => {
    resultHandler(null);
  });
}

function createProductItem(value, index, array) {
  var result = "<div id=\"producto_" + index + "\" class=\"col-sm-4\">" + 
    "<div class=\"product-image-wrapper\">" +
      "<div class=\"single-products\">" +
        "<div class=\"productinfo text-center\">" +
          "<img id=\"imgProducto_" + index + "\" " +
            "src=\"" + value.attributes["photoUrl"] + " alt=\"\" />" +
              "<h2 id=\"precioProducto_" + index + ">" + value.attributes["value"] + "</h2>" +
              "<p id=\"nombreProducto_" + index + "\">" + value.attributes["name"] + "</p>" +
              "<p><a href=\"DetalleProducto.html?id="+ value.id + "\"><i class=\"fa fa-plus-square\"></i> Ver Especificaciones</a></p>" +
              "<a href=\"#\" class=\"btn btn-default add-to-cart\" onclick=\"AgregarAlCarrito(" + value.attributes["objectId"] + ")\">" +
              "<i class=\"fa fa-shopping-cart\"></i> Agregar al Carrito</a>" +
        "</div>" +
      "</div>" +
    "</div>" +
  "</div>\n"

  return result
}






//Función para filtrar productos por marca
function FiltrarProductosPorMarca(categoria) {
  event.preventDefault();
  var marca = $('#txtFiltroMarca').val();
 /*  marca = marca.charAt(0).toUpperCase() + marca.slice(1); */

  debugger;
  if (marca != "") {
    
    const Productos = Parse.Object.extend('Product');
    const query = new Parse.Query(Productos);

    query.equalTo("trademark", marca);
    query.equalTo("category", categoria);

    query.find().then((results) => {

      const ProdutosMarca = JSON.stringify(results, undefined, 4);

      if (typeof document !== 'undefined') {
        if (ProdutosMarca != "[]") {

          //Mensaje de Prueba
          MensajeGenericoIcono('Mensaje de prueba consulta Marca', ProdutosMarca, 'success', false, 'Ok');

          //Aquí va el código para pintar el resultado de la búsqueda de los productos que corresponden con la marca




        }
        else {
          MensajeGenericoIcono('Sin resultados', 'No se encontraron productos con la marca indicada', 'error', false, 'Ok');
        }
      }
    }, (error) => {
      if (typeof document !== 'undefined') {
        MensajeGenericoIcono('No se pudo realizar la consulta. Por favor intente nuevamente.', "Error: " + error.code + " " + error.message, 'error', false, 'Ok');
      }
    });
  }
  else {
    MensajeGenericoIcono('Escribe una Marca', '', 'info', false, 'Ok');
  }
}

//Función para filtrar productos por rangp de Precio
function FiltrarProductosPorPrecio(categoria) {
  event.preventDefault();
  /* var rangoPrecio = $('#sl2').val(); PENDIENTE*/
  var rangoPrecio = "";/* PENDIENTE TOMAR VALOR DE SLIDER */

  if (rangoPrecio != "") {
    
    const Productos = Parse.Object.extend('Product');
    const query = new Parse.Query(Productos);

    /* query.equalTo("value", 1); PENDIENTE*/
    query.equalTo("category", categoria);

    query.find().then((results) => {

      const ProdutosPrecio = JSON.stringify(results, undefined, 4);

      if (typeof document !== 'undefined') {
        if (ProdutosPrecio != "[]") {

          //Mensaje de Prueba
          MensajeGenericoIcono('Mensaje de prueba consulta rango de Precio', ProdutosPrecio, 'success', false, 'Ok');

          //Aquí va el código para pintar el resultado de la búsqueda de los productos que estan en el rango de precio




        }
        else {
          MensajeGenericoIcono('Sin resultados', 'No se encontraron productos en el rango indicado', 'error', false, 'Ok');
        }
      }
    }, (error) => {
      if (typeof document !== 'undefined') {
        MensajeGenericoIcono('No se pudo realizar la consulta. Por favor intente nuevamente.', "Error: " + error.code + " " + error.message, 'error', false, 'Ok');
      }
    });
  }
  else {
    MensajeGenericoIcono('Mensaje de prueba consulta rango de Precio','', 'success', false, 'Ok');
  }
}
