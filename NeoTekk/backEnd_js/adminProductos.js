$(document).ready(function () {
    FormatoValor();
});

//Función para dar formato a moneda local (es-CO): Español Colombia 
function FormatoValor() {
    document.getElementById("txtValor").onchange = function () {

        const formatoPesos = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        })

        document.getElementById("txtValor").value = formatoPesos.format(this.value);
    }
}

function MostrarRegistrarProducto() {
    var registrar = document.getElementById('divRegistrarProducto');
    var editar = document.getElementById('divEditarProducto');
    editar.style.display = "none";

    if (registrar.style.display == "none") {
        registrar.style.display = "block";
        document.getElementById('frmRegistrar').reset();
    }
    else {
        registrar.style.display = "none";
    }
}

function MostrarEditarProducto() {
    var editar = document.getElementById('divEditarProducto');
    var registrar = document.getElementById('divRegistrarProducto');
    registrar.style.display = "none";

    if (editar.style.display == "none") {
        editar.style.display = "block";
        document.getElementById('frmEditar').reset();
    }
    else {
        editar.style.display = "none";
    }
}

//Función para crear un producto nuevo
function RegistrarProducto() {

    if (sessionStorage.getItem('user') != null) {
        /* var producto = new Parse.Product(); */
        const Productos = Parse.Object.extend('Product');
        const producto = new Productos();

        var currency = $('#txtValor').val();
        var number = Number(currency.replace(/[^0-9\,-]+/g, ""));

        producto.set("name", $('#txtNomProducto').val());
        producto.set("reference", $('#txtReferencia').val());
        producto.set("trademark", $('#txtMarca').val());
        producto.set("description", $('#txtDescripcion').val());
        producto.set("specifications", $('#txtEspecificaciones').val());
        producto.set("value", number);
        producto.set("availability", parseInt($('#txtDisponibilidad').val()));
        producto.set("photoUrl", $('#txtUrlImagen').val());
        producto.set("category", $('#ddlCategorias').val());

        producto.save().then(function (producto) {
            MensajeGenericoIcono('El producto ' + producto.get("name") + ' se ha creado correctamente', '', 'success', false, 'Ok');
            LimpiarFormulario();
        }).catch(function (error) {
            MensajeGenericoIcono('Error registrando el Producto. Por favor intentalo nuevamente', '', 'error', false, 'Ok');
            console.log("Error: " + error.code + " " + error.message);
        });
    }
    else {
        MensajeGenericoIcono('Debes iniciar sesión como Administrador', 'No puedes agregar Productos', 'info', false, 'Ok');
    }
}



//PENDIENTE
//Función para editar un producto
function EditarProducto() {
    const Productos = Parse.Object.extend('Productos');
    const query = new Parse.Query(Productos);

    // here you put the objectId that you want to update
    query.get('xKue915KBG').then((object) => {
        object.set('Nombre', 'A string');
        object.set('Referencia', 'A string');
        object.set('Marca', 'A string');
        object.set('Descripcion', 'A string');
        object.set('Especificaciones', 'A string');
        object.set('Valor', 1);
        object.set('Disponibilidad', 1);
        object.set('UrlFoto', 'A string');
        object.set('Categoria', 'A string');

        object.save().then((response) => {
            // You can use the "get" method to get the value of an attribute
            // Ex: response.get("<ATTRIBUTE_NAME>")
            if (typeof document !== 'undefined') document.write(`Updated Productos: ${JSON.stringify(response)}`);
            console.log('Updated Productos', response);
        }, (error) => {
            if (typeof document !== 'undefined') document.write(`Error while updating Productos: ${JSON.stringify(error)}`);
            console.error('Error while updating Productos', error);
        });
    });
}

//Función para eliminar un producto
function EliminarProducto() {
    const MyCustomClass = Parse.Object.extend('MyCustomClassName');
    const query = new Parse.Query(MyCustomClass);
    
    // here you put the objectId that you want to delete
    query.get('xKue915KBG').then((object) => {
        object.destroy().then((response) => {
            if (typeof document !== 'undefined') document.write(`Deleted ParseObject: ${JSON.stringify(response)}`);
            console.log('Deleted ParseObject', response);
        }, (error) => {
            if (typeof document !== 'undefined') document.write(`Error while deleting ParseObject: ${JSON.stringify(error)}`);
            console.error('Error while deleting ParseObject', error);
        });
    });
}

function ConsultarProductoPorCategoria(nombreCategoria) {
    debugger;
    const Productos = Parse.Object.extend('Product');
    /*      const query = new Parse.Query(Productos);

         query.equalTo("Nombre", 'A string');
         query.equalTo("Referencia", 'A string');
         query.equalTo("Marca", 'A string');
         query.equalTo("Descripcion", 'A string');
         query.equalTo("Especificaciones", 'A string');
         query.equalTo("Valor", 1);
         query.equalTo("Disponibilidad", 1);
         query.equalTo("UrlFoto", 'A string');
         query.equalTo("Categoria", 'A string'); */

    query.find().then((results) => {
        if (typeof document !== 'undefined') {
            document.getElementById('txtDescripcion1').innerHTML = nombreTabla + ':' + JSON.stringify(results, undefined, 4);
        }
    }, (error) => {
        if (typeof document !== 'undefined') {
            document.getElementById('txtDescripcion1').innerHTML = JSON.stringify(error, undefined, 4);
        }
    });
}

function ConsultarProductoPorCategoria2(categoria) {
    var Productos = new Parse.Product();

    Productos.query.equalTo("category", categoria).find().then((result) => {
        document.getElementById('txtDescripcion1').innerHTML = nombreTabla + ':' + JSON.stringify(results, undefined, 4);
    });
}
//PENDIENTE



//Función para limpiar campos
function LimpiarFormulario() {
    document.getElementById("frmRegistrar").reset();
}