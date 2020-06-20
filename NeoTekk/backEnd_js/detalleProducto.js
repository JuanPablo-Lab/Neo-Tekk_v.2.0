/* Para cantidad de unidades */
function aumentar() { // se crean la funcion y se agrega al evento onclick en en la etiqueta button con id aumentar
    event.preventDefault();
    var cantidad = document.getElementById('cantidad').value;
    document.getElementById('cantidad').value = ++cantidad; //se obtiene el valor del input, y se incrementa en 1 el valor que tenga.
}

function disminuir() { 
    event.preventDefault();  
    var cantidad = document.getElementById('cantidad').value;

    if(cantidad != 1)
    {
        document.getElementById('cantidad').value = --cantidad; 
    }
}