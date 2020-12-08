var busqueda = document.getElementById('busqueda'); //peticion fetch

var envioData = async function envioData() {
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

busqueda.addEventListener('click', function(e) {
    e.preventDefault();
    var valor = document.getElementById('buscar');
    envioData('/busqueda', {
        dato: valor.value
    }).then(function(response) {
        if (response.error) {
            document.getElementById('error').textContent = response.error;
            setTimeout(function() {
                document.getElementById('error').textContent = '';
            }, 2000);
        } else {
            document.getElementById('numeroServicio').textContent = response.numeroServicio;
            document.getElementById('tipoServicio').textContent = response.tipoServicio;
            document.getElementById('tecnico').textContent = response.tecnico, document.getElementById('usuario').textContent = response.usuario;
        }
    });
});