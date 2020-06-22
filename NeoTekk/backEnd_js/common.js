$(document).ready(function () {
    ConectarApi();
    CargarUsuarioActual();
    setMenu();
});

//Función para conectarse al proyecto Back4App V2.0
function ConectarApi() {
    Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    Parse.initialize(
        /*  Claves Victor */
         'AodUV80e7GsQrhBHrTq1bo2KyXAV0cPTIhWkn7zI', // This is your Application ID
         '0SUXjA7DMxDp4lIZiuNMIy0OZDuWWQpxJuqKJVkh' // This is your Javascript key
    );
}

function CargarUsuarioActual() {
    debugger;
    if (sessionStorage.getItem('user') != null) {
        document.getElementById("usuarioActual").innerHTML = sessionStorage.getItem('user');
    }
}

//Función para crear mensajes simples de solo texto
function MensajeGenerico(texto) {
    Swal.fire(texto)
}

//Función para crear mensajes con icono
function MensajeGenericoIcono(titulo, texto = "", icono, cancelButton = false, textoConfirmar = "Ok") {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        showCancelButton: cancelButton,
        confirmButtonColor: '#3085d6',
        confirmButtonText: textoConfirmar
    })
}

//Función para crear mensaje con redireccionamiento a otro formulario
function MensajeConRedireccion(titulo, destino) {
    Swal.fire({
        title: titulo,
        text: "",
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.value) {
            window.location = destino;
        }
    })
}

//Función para crear mensaje con redireccionamiento a otro formulario
function MensajeConTextoRedireccion(titulo, texto, destino) {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.value) {
            window.location = destino;
        }
    })
}

function formatCurrency(locales, currency, fractionDigits, number) {
    var formatted = new Intl.NumberFormat(locales, {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: fractionDigits
    }).format(number);
    return formatted;
}

function setMenu() {
    const Categorias = Parse.Object.extend('Category');
    const query = new Parse.Query(Categorias);

    query.find().then((results) => {
        var listItems = "<li><a href=\"Home.html\"><i class=\"fas fa-home\"></i> Home</a></li>";
        listItems += results.map(getCategoryList).reduce(reduceList);
        
        if (typeof document != 'undefined') {
            var menuCategories = document.getElementById("categoriesMenu");
            menuCategories.innerHTML = listItems;
        } 
      }, (error) => {
        if (typeof document !== 'undefined') {
          MensajeGenericoIcono('No se pudo realizar la consulta. Por favor intente nuevamente.', "Error: " + error.code + " " + error.message, 'error', false, 'Ok');
        }
      });
}

function getCategoryList(value, index, array) {
    var result = "\n<li><a href=\"Productos.html?cat=" + value.attributes["name"] + "\"><i class=\"" + value.attributes["css"] + "\"></i> " + value.attributes["name"] + "</a></li>"
    return result
}

function reduceList(total, value, index, array) {
return total + value;
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}