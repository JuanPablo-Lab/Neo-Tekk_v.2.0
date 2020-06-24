function resolveLoadDetail() {
    var objectId = getParameterByName("id");

    if (objectId) {
        CargarDetallesProducto(objectId, injectProductDetails);
    }
}

//Función para cargar los datos del Producto para mostrar el detalle
function CargarDetallesProducto(objectId, resultHandler) {
    event.preventDefault();
    //Aquí va el código para enviar los datos y visualizar el detalle del producto
  
    const Productos = Parse.Object.extend('Product');
    const query = new Parse.Query(Productos);
  
    /* query.equalTo("value", 1); PENDIENTE*/
    query.equalTo("objectId", objectId);
  
    query.find().then((results) => {
      if (results.length > 0) {
        var result = results[0];
        resultHandler(result);
      }
      else {
        resultHandler(null);
      }
    }, (error) => {
      resultHandler(null);
    });
  }
  
  function injectProductDetails(result) {
    if (typeof document != 'undefined') {
      var picture = document.getElementById("detailPicture");
      var name = document.getElementById("detailName");
      var reference = document.getElementById("detailReference");
      var formattedValue = document.getElementById("detailValue");
      var available = document.getElementById("detailAvailable");
      var addToKart = document.getElementById("detailAddToKart");
      var quantity = document.getElementById("detailQuantity");
      var trademark = document.getElementById("detailTrademark");
      var formattedDescription = document.getElementById("detailDescription");
      var formattedSpecifications = document.getElementById("detailSpecifications");
      
      var numericValue = parseFloat(result.attributes["value"]);
      
      picture.src = result.attributes["photoUrl"];
      name.innerText = result.attributes["name"];
      reference.innerText = result.attributes["reference"];
      formattedValue.innerText = "COP $" + numberWithDots(numericValue);
      available.value = result.attributes["availability"];
      quantity.innerText = result.attributes["availability"];
      trademark.innerText = result.attributes["trademark"];
  
      formattedDescription.innerHTML = result.attributes["description"];
      formattedSpecifications.innerHTML = result.attributes["specifications"];
  
      addToKart.innerHTML = "<button type=\"button\" class=\"btn btn-default cart\" onclick=\"AgregarAlCarrito(" + result.id + ")\">" +
        "<i class=\"fa fa-shopping-cart\"></i> Agregar Al Carrito</button>";
  
    }
  }  

/* Para cantidad de unidades */
function aumentar() { // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id aumentar
    event.preventDefault();
    var cantidad = document.getElementById('cantidad').value;
    var available = document.getElementById("detailAvailable").value;

    if (cantidad < available) {
        document.getElementById('cantidad').value = ++cantidad; //se obtiene el valor del input, y se incrementa en 1 el valor que tenga.
    }
}

function disminuir() { 
    event.preventDefault();  
    var cantidad = document.getElementById('cantidad').value;

    if(cantidad > 1)
    {
        document.getElementById('cantidad').value = --cantidad; 
    }
}
