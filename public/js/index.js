//selectores
var btnCedula = document.getElementById('buscarCedula');
var btnSerial = document.getElementById('buscarSerial');
var btnSerialRetira = document.getElementById('buscarSerialRetira');
var envioDatos = document.getElementById('guardarUsuario');
var envioDatosMaquina = document.getElementById('guardarEquipo');
var btnEquipo = document.getElementById('customCheck1'); //funciones
//template

var templates = function templates(clase, texto) {
    return contenido = "<div class=\"alert alert-dismissible ".concat(clase, "\">\n          <button type=\"button\" class=\"close\" data-dismiss=\"alert\">&times;</button>\n          ").concat(texto, ".\n        </div>");
}; //peticion fetch


var postData = async function postData() {
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
}; //limpiar info


var limpiarCampos = function limpiarCampos(elemento, texto) {
    elemento.classList.remove('is-valid');
    texto.textContent = '';
}; //listeners
//buscar cedula


btnCedula.addEventListener('click', function(e) {
    e.preventDefault();
    var boxInfocedula = document.getElementById('infoCedula');
    var textoAyuda = document.querySelector('#DNIHelp');
    var cedula = document.querySelector('#DNI');
    var errores = document.getElementById('errorDNI');
    var modal = document.getElementById('ModalUsuario');
    var spaceNull = 'Escribe una cedula para poder buscar en nuestra base, no dejes espacios en blanco';
    var url = btnCedula.pathname; //generar error por espacio en blanco

    if (!cedula.value) {
        if (boxInfocedula.style.display === 'flex') {
            boxInfocedula.style.display = 'none';
            limpiarCampos(cedula, textoAyuda);
        } else if (modal.style.display === 'none') {
            modal.style.display = 'none';
            limpiarCampos(cedula, textoAyuda);
        }

        errores.style.display = 'block';
        modal.style.display = 'none';
        var template = templates('alert-secondary', spaceNull);
        var message = errores.innerHTML = template;
        setTimeout(function() {
            errores.style.display = 'none';
        }, 3000);
    } else {
        postData(url, {
            dato: cedula.value
        }).then(function(respuesta) {
            //generar error por usuario no existe
            if (respuesta.error) {
                if (boxInfocedula.style.display === 'flex') {
                    boxInfocedula.style.display = 'none';
                    limpiarCampos(cedula, textoAyuda);
                } else if (modal.style.display === 'none') {
                    modal.style.display = 'none';
                    limpiarCampos(cedula, textoAyuda);
                }

                textoAyuda.textContent = "".concat(respuesta.error, " crea un usuario dando click aqui");
                modal.style.display = 'block';
            } else {
                errores.style.display = 'none';
                cedula.classList.add('is-valid');
                modal.style.display = 'none';
                textoAyuda.textContent = 'Correcto.';
                boxInfocedula.style.display = 'flex';
                var nombre = document.querySelector('#nombre').value = respuesta.nombre;
                var apellido = document.querySelector('#apellido').value = respuesta.apellido;
                var telefono = document.querySelector('#telefono').value = respuesta.telefono;
            }
        });
    }
}); //buscar serial

btnSerial.addEventListener('click', function(e) {
    e.preventDefault();
    var texto = 'Escribe un serial para poder buscar en nuestra base, no dejes espacios en blanco';
    var serial = document.getElementById('serialNumber');
    var errorSerial = document.getElementById('errorSerial');
    var modal = document.getElementById('ModalSerial');
    var url = btnSerial.pathname;
    var infoMaquina = document.getElementById('infoMaquina');
    var textoAyuda = document.getElementById('serialHelp'); //error espacion en blanco

    if (!serial.value) {
        if (infoMaquina.style.display === 'flex') {
            infoMaquina.style.display = 'none';
            limpiarCampos(serial, textoAyuda);
        } else if (modal.style.display === 'block') {
            modal.style.display = 'none';
            limpiarCampos(serial, textoAyuda);
        }

        errorSerial.style.display = 'block';
        var template = templates('alert-secondary', texto);
        var message = errorSerial.innerHTML = template;
        setTimeout(function() {
            errorSerial.style.display = 'none';
        }, 3000);
    } else {
        postData(url, {
            serial: serial.value
        }).then(function(respuesta) {
            //no existe el serial
            if (respuesta.error) {
                if (infoMaquina.style.display === 'flex') {
                    infoMaquina.style.display = 'none';
                    limpiarCampos(serial, textoAyuda);
                } else if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    limpiarCampos(serial, textoAyuda);
                }

                errorSerial.style.display = 'none';
                textoAyuda.textContent = "".concat(respuesta.error, ", puedes crear el equipo aqui.");
                modal.style.display = 'block';
                setTimeout(function() {
                    errorSerial.style.display = 'none';
                }, 3000);
            } else {
                textoAyuda.textContent = 'Maquina encontrada';
                modal.style.display = 'none';
                serial.classList.add('is-valid');
                infoMaquina.style.display = 'flex';
                var marca = document.querySelector('#marca').value = respuesta.marca;
                var modelo = document.querySelector('#modelo').value = respuesta.modelo;
                var placa = document.querySelector('#placa').value = respuesta.placa;
                var spare = document.querySelector('#spare').value = respuesta.spare;
            }
        });
    }
}); //enviar usuario

envioDatos.addEventListener('click', function(e) {
    e.preventDefault;
    var nombre = document.getElementsByName('modalNombre')[0];
    var apellido = document.getElementsByName('modalApellido')[0];
    var cedula = document.getElementsByName('modalCedula')[0];
    var ext = document.getElementsByName('modalExt')[0];
    var correo = document.getElementsByName('modalCorreo')[0];
    var usuarioRed = document.getElementsByName('modalUsuarioRed')[0];
    var area = document.getElementsByName('modalArea')[0];
    postData('/envioUsuario', {
        nombre: nombre.value,
        apellido: apellido.value,
        cedula: cedula.value,
        ext: ext.value,
        area: area.value,
        correo: correo.value,
        usuarioRed: usuarioRed.value
    }).then(function(respuesta) {
        if (respuesta.error) {
            var alerta = document.getElementById('respuesta');
            alerta.style.display = 'block';
            var template = templates('alert-secondary', "".concat(respuesta.error));
            alerta.innerHTML = template;
        } else {
            document.getElementById('guardarUsuario').style.display = 'none';
            document.getElementById('cerrar').style.display = 'none';

            var _alerta = document.getElementById('respuesta');

            _alerta.style.display = 'block';

            var _template = templates('alert-success', "".concat(respuesta.respuesta));

            _alerta.innerHTML = _template;
            setTimeout(function() {
                location.reload();
            }, 3000);
        }
    });
}); //enviar datos maquina

envioDatosMaquina.addEventListener('click', function(e) {
    e.preventDefault;
    var tipo = document.getElementsByName('modalTipo')[0];
    var serial = document.getElementsByName('modalSerial')[0];
    var marca = document.getElementsByName('modalMarca')[0];
    var modelo = document.getElementsByName('modalModelo')[0];
    var placa = document.getElementsByName('modalPlaca')[0];
    var spare = document.getElementsByName('modalSpare')[0];
    var cedula = document.getElementById('DNI');
    postData('/envioMaquina', {
        tipo: tipo.value,
        serial: serial.value,
        marca: marca.value,
        modelo: modelo.value,
        placa: placa.value,
        spare: spare.value,
        cedula: cedula.value
    }).then(function(respuesta) {
        if (respuesta.error) {
            var alerta = document.getElementById('respuestaEquipo');
            alerta.style.display = 'block';
            var template = templates('alert-secondary', "".concat(respuesta.error));
            alerta.innerHTML = template;
        } else {
            document.getElementById('guardarEquipo').style.display = 'none';
            document.getElementById('cerrarEquipo').style.display = 'none';

            var _alerta2 = document.getElementById('respuestaEquipo');

            _alerta2.style.display = 'block';

            var _template2 = templates('alert-success', "".concat(respuesta.respuesta));

            _alerta2.innerHTML = _template2;
            setTimeout(function() {
                location.reload();
            }, 3000);
        }
    });
}); //cambio equipo

btnEquipo.addEventListener('click', function(e) {
    if (e.target.checked) {
        document.getElementById('equipoRetira').style.display = 'block';
        document.getElementById('serialNumberRetira').setAttribute('required', '');
    } else {
        document.getElementById('equipoRetira').style.display = 'none';
        document.getElementById('serialNumberRetira').removeAttribute('required');
    }
}); //buscar serial Retira

btnSerialRetira.addEventListener('click', function(e) {
    e.preventDefault();
    var texto = 'Escribe un serial para poder buscar en nuestra base, no dejes espacios en blanco';
    var serial = document.getElementById('serialNumberRetira');
    var errorSerial = document.getElementById('errorSerialRetira');
    var modal = document.getElementById('ModalSerialRetira');
    var url = btnSerialRetira.pathname;
    var infoMaquina = document.getElementById('infoMaquinaRetira');
    var textoAyuda = document.getElementById('serialHelpRetira'); //error espacion en blanco

    if (!serial.value) {
        if (infoMaquina.style.display === 'flex') {
            infoMaquina.style.display = 'none';
            limpiarCampos(serial, textoAyuda);
        } else if (modal.style.display === 'block') {
            modal.style.display = 'none';
            limpiarCampos(serial, textoAyuda);
        }

        errorSerial.style.display = 'block';
        var template = templates('alert-secondary', texto);
        var message = errorSerial.innerHTML = template;
        setTimeout(function() {
            errorSerial.style.display = 'none';
        }, 3000);
    } else {
        postData(url, {
            serial: serial.value
        }).then(function(respuesta) {
            //no existe el serial
            if (respuesta.error) {
                if (infoMaquina.style.display === 'flex') {
                    infoMaquina.style.display = 'none';
                    limpiarCampos(serial, textoAyuda);
                } else if (modal.style.display === 'block') {
                    modal.style.display = 'none';
                    limpiarCampos(serial, textoAyuda);
                }

                errorSerial.style.display = 'none';
                textoAyuda.textContent = "".concat(respuesta.error, ", puedes crear el equipo aqui.");
                modal.style.display = 'block';
                setTimeout(function() {
                    errorSerial.style.display = 'none';
                }, 3000);
            } else {
                textoAyuda.textContent = 'Maquina encontrada';
                modal.style.display = 'none';
                serial.classList.add('is-valid');
                infoMaquina.style.display = 'flex';
                var marca = document.querySelector('#marcaRetira').value = respuesta.marca;
                var modelo = document.querySelector('#modeloRetira').value = respuesta.modelo;
                var placa = document.querySelector('#placaRetira').value = respuesta.placa;
                var spare = document.querySelector('#spareRetira').value = respuesta.spare;
            }
        });
    }
}); //localStorage

var btnSiguiente = document.getElementById('siguiente');
btnSiguiente.addEventListener('click', function(e) {
    var customCheck1 = document.getElementById('customCheck1');

    if (customCheck1.checked) {
        var serRet = document.getElementById('serialNumberRetira');
        var Ced = document.getElementById('DNI');
        var serAct = document.getElementById('serialNumber');
        localStorage.setItem('{446a3996-7d7c-48ac-93c1-5280a638fcca}', JSON.stringify({
            cedula: "".concat(Ced.value),
            actual: "".concat(serAct.value),
            retira: "".concat(serRet.value)
        }));
    } else {
        var _Ced = document.getElementById('DNI');

        var _serAct = document.getElementById('serialNumber');

        localStorage.setItem('{446a3996-7d7c-48ac-93c1-5280a638fcca}', JSON.stringify({
            cedula: "".concat(_Ced.value),
            actual: "".concat(_serAct.value)
        }));
    }
});