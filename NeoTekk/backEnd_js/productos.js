//Función para consultar todos los productos
function BusquedaProductosHome() {
  event.preventDefault();
  var busqueda = $('#txtBusquedaProducto').val();

  if (busqueda != "") {

    if (busqueda.toUpperCase() == "CELULARES") window.location = 'Celulares.html';
    else if (busqueda.toUpperCase() == "PORTÁTILES" || busqueda.toUpperCase() == "PORTATILES") window.location = 'Portatiles.html';
    else if (busqueda.toUpperCase() == "TELEVISORES") window.location = 'Televisores.html';
    else if (busqueda.toUpperCase() == "VIDEOJUEGOS") window.location = 'Videojuegos.html';
    else {
      const Productos = Parse.Object.extend('Product');
      const query = new Parse.Query(Productos);

      /* query.equalTo("name", 'A string');
      query.equalTo("trademark", 'A string');
      query.equalTo("reference", 'A string');
      query.equalTo("description", 'A string');
      query.equalTo("specifications", 'A string');
      query.equalTo("value", 1);
      query.equalTo("photoUrl", 'A string');
      query.equalTo("availability", 1);
      query.equalTo("category", 'A string'); */

      query.find().then((results) => {

        const ProdutosEncontrados = JSON.stringify(results, undefined, 4);
        debugger;
        if (typeof document !== 'undefined') {
          if (ProdutosEncontrados != "[]") {

            //Mensaje de Prueba Consulta
            MensajeConTextoRedireccion('Mensaje de prueba consulta desde Home', ProdutosEncontrados, 'ResultadoBusqueda.html');
            //Aquí va el código para pintar el resultado de la búsqueda de los Productos



          }
          else {
            window.location = 'ProductoNoEncontrado.html';
          }
        }
      }, (error) => {
        if (typeof document !== 'undefined') {
          MensajeGenericoIcono('No se pudo realizar la consulta. Por favor intente nuevamente.', "Error: " + error.code + " " + error.message, 'error', false, 'Ok');
        }
      });
    }
  }
  else {
    MensajeGenericoIcono('El cuadro de búsqueda esta vacio', '', 'info', false, 'Ok');
  }
}

//Función para busqueda en cada categoría
function BusquedaEnCategoria(categoria) {
  event.preventDefault();
  var buscar = $('#txtBusquedaEnCategoria').val().toUpperCase();

  if (buscar != "") {
    if (buscar == "CELULARES") window.location = 'Celulares.html';
    else if (buscar == "PORTÁTILES" || buscar == "PORTATILES") window.location = 'Portatiles.html';
    else if (buscar == "TELEVISORES") window.location = 'Televisores.html';
    else if (buscar== "VIDEOJUEGOS") window.location = 'Videojuegos.html';
    else {
      const Productos = Parse.Object.extend('Product');
      const query = new Parse.Query(Productos);

      /* query.equalTo("name", 'A string');
      query.equalTo("trademark", 'A string');
      query.equalTo("reference", 'A string');
      query.equalTo("description", 'A string');
      query.equalTo("specifications", 'A string');
      query.equalTo("value", 1);
      query.equalTo("photoUrl", 'A string');
      query.equalTo("availability", 1); */
      query.equalTo("category", categoria);
      query.find().then((results) => {

        const ProdutosEnCategoría = JSON.stringify(results, undefined, 4);

        if (typeof document !== 'undefined') {
          if (ProdutosEnCategoría != "[]") {

            //Mensaje de Prueba
            MensajeGenericoIcono('Mensaje de prueba consulta desde Categoría ' + categoria, ProdutosEnCategoría, 'success', false, 'Ok');

            //Aquí va el código para pintar el resultado de la búsqueda de los productos en la categoría



          }
          else {
            window.location = 'ProductoNoEncontrado.html';
          }
        }
      }, (error) => {
        if (typeof document !== 'undefined') {
          MensajeGenericoIcono('No se pudo realizar la consulta. Por favor intente nuevamente.', "Error: " + error.code + " " + error.message, 'error', false, 'Ok');
        }
      });
    }
  }
  else {
    MensajeGenericoIcono('El cuadro de búsqueda esta vacio', '', 'info', false, 'Ok');
  }
}

//Función para filtrar productos por marca
function FiltrarProductosPorMarca(categoria) {
  event.preventDefault();
  var marca = $('#txtFiltroMarca').val().toUpperCase();
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

//Función para cargar los datos del Producto para mostrar el detalle
function CargarDetallesProducto() {
  event.preventDefault();
  //Aquí va el código para enviar los datos y visualizar el detalle del producto


}

