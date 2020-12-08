var btn = document.getElementById('envioForm'); //peticion fetch

var enviarDatos = async function enviarDatos() {
    var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

btn.addEventListener('click', function(e) {
    e.preventDefault();
    enviarDatos('/formulario/opciones/resumen/envioForm', {
        envio: 'envio'
    }).then(function(response) {
        if (response.respuesta) {
            var ventana = document.getElementById('modalEnvio');
            ventana.removeAttribute('role');
            ventana.removeAttribute('aria-modal');
            ventana.setAttribute('aria-hidden', true);
            ventana.style.display = 'none';
            ventana.classList.remove('show');
            var nuevaVentana = document.getElementById('modalSalida');
            nuevaVentana.classList.add('show');
            nuevaVentana.setAttribute('aria-modal', true);
            nuevaVentana.setAttribute('role', 'dialog');
            nuevaVentana.style.display = 'block';
            var origen = window.origin;
            setTimeout(function() {
                window.location.href = "".concat(origen, "/formulario");
            }, 2000);
        } else if (response.error) {
            var titulo = document.getElementById('title');
            var icono = document.getElementById('icon');
            var mensaje = document.getElementById('message');
            titulo.textContent = 'Error';
            icono.classList.remove('fa-file-upload');
            icono.classList.add('fa-exclamation-circle');
            mensaje.textContent = "".concat(response.error);
        }
    });
});