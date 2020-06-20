$(document).ready(function () {
    ConectarApi();
    CargarUsuarioActual();
});

//Función para conectarse al proyecto Back4App V2.0
function ConectarApi() {
    Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
    Parse.initialize(
        /*  Claves Victor */
        /*  'AodUV80e7GsQrhBHrTq1bo2KyXAV0cPTIhWkn7zI', // This is your Application ID
         '0SUXjA7DMxDp4lIZiuNMIy0OZDuWWQpxJuqKJVkh' // This is your Javascript key */

         /*Clave NeoTekk V2.0*/
     /*    'YBdO3Y2Lt9HGInu01FfyumuLO21Iln1PqaTCQzIy', // This is your Application ID
        'rzl5Cn1ZuqNHv4AoYbp2J5tUuG4gtODXZO0wj28F' // This is your Javascript key */

         /*Clave NeoTekk Pruebas*/
         'plhNI7pAFk6UBfsEGKNGn37yKZv5aa3JBb20VcIW', // This is your Application ID
         'dIVRSTC2JfrGDruZkM6JMXufr0tdQKTmkKtmqPdm' // This is your Javascript key
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
