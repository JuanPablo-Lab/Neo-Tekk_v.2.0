//Función para agregar al carrito
function AgregarAlCarrito() {
    //Aquí va el código para agregar al Carrito

    MensajeCarrito();
}

//Mensaje de producto agregado al Carrito
function MensajeCarrito() {
    Swal.fire({
        title: 'Producto agregado al carrito',
        text: "",
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'Continuar Comprando',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ir al Carrito'
    }).then((result) => {
        if (result.value) {
            window.location = 'Carrito.html';
        }
    })
}

function RealizarPedido() {
    event.preventDefault();

    if (sessionStorage.getItem('user') != null) {
        var direccion = $('#txtDireccion').val();

        if (direccion != "") {
            //Aquí va el código para adicionalmente guardar la compra en base de datos si se alcanza.
            MensajeGenericoIcono('Pedido realizado correctamente. Gracias por tu Compra', '', 'success', false, 'Ok');
            window.location = 'Home.html';
        }
        else {
            MensajeGenericoIcono('Debe ingresar una dirección de envío', '', 'info', false, 'Ok');
        }
    }
    else {
        MensajeGenericoIcono('Debes iniciar Sesión', 'No puedes realizar pedidos', 'info', false, 'Ok');
    }
}