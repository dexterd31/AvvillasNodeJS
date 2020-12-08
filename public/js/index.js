//selectores
const btnCedula = document.getElementById('buscarCedula')
const btnSerial = document.getElementById('buscarSerial')
const btnSerialRetira = document.getElementById('buscarSerialRetira')
const envioDatos = document.getElementById('guardarUsuario')
const envioDatosMaquina = document.getElementById('guardarEquipo')
const btnEquipo = document.getElementById('customCheck1')

//funciones

//template
const templates = (clase, texto) => {
        return contenido =
            `<div class="alert alert-dismissible ${clase}">
          <button type="button" class="close" data-dismiss="alert">&times;</button>
          ${texto}.
        </div>`
    }
    //peticion fetch
const postData = async(url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return response.json();
    }
    //limpiar info
const limpiarCampos = (elemento, texto) => {
    elemento.classList.remove('is-valid')
    texto.textContent = ''
}


//listeners

//buscar cedula
btnCedula.addEventListener('click', e => {
    e.preventDefault()

    const boxInfocedula = document.getElementById('infoCedula')
    const textoAyuda = document.querySelector('#DNIHelp')
    const cedula = document.querySelector('#DNI')
    const errores = document.getElementById('errorDNI')
    const modal = document.getElementById('ModalUsuario')
    const spaceNull = 'Escribe una cedula para poder buscar en nuestra base, no dejes espacios en blanco';
    var url = btnCedula.pathname;

    //generar error por espacio en blanco
    if (!cedula.value) {
        if (boxInfocedula.style.display === 'flex') {
            boxInfocedula.style.display = 'none'
            limpiarCampos(cedula, textoAyuda)
        } else if (modal.style.display === 'none') {
            modal.style.display = 'none'
            limpiarCampos(cedula, textoAyuda)
        }

        errores.style.display = 'block';
        modal.style.display = 'none'
        const template = templates('alert-secondary', spaceNull)
        const message = errores.innerHTML = template
        setTimeout(() => {
            errores.style.display = 'none';
        }, 3000)

    } else {
        postData(url, { dato: cedula.value })
            .then(respuesta => {
                //generar error por usuario no existe
                if (respuesta.error) {
                    if (boxInfocedula.style.display === 'flex') {
                        boxInfocedula.style.display = 'none'
                        limpiarCampos(cedula, textoAyuda)
                    } else if (modal.style.display === 'none') {
                        modal.style.display = 'none'
                        limpiarCampos(cedula, textoAyuda)
                    }
                    textoAyuda.textContent = `${respuesta.error} crea un usuario dando click aqui`
                    modal.style.display = 'block'
                } else {
                    errores.style.display = 'none';
                    cedula.classList.add('is-valid')
                    modal.style.display = 'none'
                    textoAyuda.textContent = 'Correcto.'
                    boxInfocedula.style.display = 'flex'
                    let nombre = document.querySelector('#nombre').value = respuesta.nombre
                    let apellido = document.querySelector('#apellido').value = respuesta.apellido
                    let telefono = document.querySelector('#telefono').value = respuesta.telefono
                }
            });
    }
})

//buscar serial
btnSerial.addEventListener('click', e => {
    e.preventDefault()
    const texto = 'Escribe un serial para poder buscar en nuestra base, no dejes espacios en blanco'
    let serial = document.getElementById('serialNumber')
    const errorSerial = document.getElementById('errorSerial')
    const modal = document.getElementById('ModalSerial')
    const url = btnSerial.pathname
    const infoMaquina = document.getElementById('infoMaquina')
    const textoAyuda = document.getElementById('serialHelp')

    //error espacion en blanco
    if (!serial.value) {
        if (infoMaquina.style.display === 'flex') {
            infoMaquina.style.display = 'none'
            limpiarCampos(serial, textoAyuda)
        } else if (modal.style.display === 'block') {
            modal.style.display = 'none'
            limpiarCampos(serial, textoAyuda)
        }
        errorSerial.style.display = 'block';
        const template = templates('alert-secondary', texto)
        const message = errorSerial.innerHTML = template
        setTimeout(() => {
            errorSerial.style.display = 'none';
        }, 3000)
    } else {
        postData(url, { serial: serial.value })
            .then(respuesta => {
                //no existe el serial
                if (respuesta.error) {
                    if (infoMaquina.style.display === 'flex') {
                        infoMaquina.style.display = 'none'
                        limpiarCampos(serial, textoAyuda)
                    } else if (modal.style.display === 'block') {
                        modal.style.display = 'none'
                        limpiarCampos(serial, textoAyuda)
                    }
                    errorSerial.style.display = 'none';
                    textoAyuda.textContent = `${respuesta.error}, puedes crear el equipo aqui.`
                    modal.style.display = 'block'
                    setTimeout(() => {
                        errorSerial.style.display = 'none';
                    }, 3000)
                } else {
                    textoAyuda.textContent = 'Maquina encontrada'
                    modal.style.display = 'none'
                    serial.classList.add('is-valid')
                    infoMaquina.style.display = 'flex'
                    let marca = document.querySelector('#marca').value = respuesta.marca
                    let modelo = document.querySelector('#modelo').value = respuesta.modelo
                    let placa = document.querySelector('#placa').value = respuesta.placa
                    let spare = document.querySelector('#spare').value = respuesta.spare
                }
            })
    }
})

//enviar usuario
envioDatos.addEventListener('click', e => {
    e.preventDefault
    const nombre = document.getElementsByName('modalNombre')[0]
    const apellido = document.getElementsByName('modalApellido')[0]
    const cedula = document.getElementsByName('modalCedula')[0]
    const ext = document.getElementsByName('modalExt')[0]
    const correo = document.getElementsByName('modalCorreo')[0]
    const usuarioRed = document.getElementsByName('modalUsuarioRed')[0]
    const area = document.getElementsByName('modalArea')[0]

    postData('/envioUsuario', {
            nombre: nombre.value,
            apellido: apellido.value,
            cedula: cedula.value,
            ext: ext.value,
            area: area.value,
            correo: correo.value,
            usuarioRed: usuarioRed.value
        })
        .then(respuesta => {
            if (respuesta.error) {
                const alerta = document.getElementById('respuesta')
                alerta.style.display = 'block'
                const template = templates('alert-secondary', `${respuesta.error}`)
                alerta.innerHTML = template
            } else {
                document.getElementById('guardarUsuario').style.display = 'none'
                document.getElementById('cerrar').style.display = 'none'
                const alerta = document.getElementById('respuesta')
                alerta.style.display = 'block'
                const template = templates('alert-success', `${respuesta.respuesta}`)
                alerta.innerHTML = template
                setTimeout(() => {
                    location.reload()
                }, 3000)
            }

        })

})

//enviar datos maquina
envioDatosMaquina.addEventListener('click', e => {
    e.preventDefault
    const tipo = document.getElementsByName('modalTipo')[0]
    const serial = document.getElementsByName('modalSerial')[0]
    const marca = document.getElementsByName('modalMarca')[0]
    const modelo = document.getElementsByName('modalModelo')[0]
    const placa = document.getElementsByName('modalPlaca')[0]
    const spare = document.getElementsByName('modalSpare')[0]
    const cedula = document.getElementById('DNI')


    postData('/envioMaquina', {
            tipo: tipo.value,
            serial: serial.value,
            marca: marca.value,
            modelo: modelo.value,
            placa: placa.value,
            spare: spare.value,
            cedula: cedula.value
        })
        .then(respuesta => {
            if (respuesta.error) {
                const alerta = document.getElementById('respuestaEquipo')
                alerta.style.display = 'block'
                const template = templates('alert-secondary', `${respuesta.error}`)
                alerta.innerHTML = template
            } else {
                document.getElementById('guardarEquipo').style.display = 'none'
                document.getElementById('cerrarEquipo').style.display = 'none'
                const alerta = document.getElementById('respuestaEquipo')
                alerta.style.display = 'block'
                const template = templates('alert-success', `${respuesta.respuesta}`)
                alerta.innerHTML = template

                setTimeout(() => {
                    location.reload()
                }, 3000)
            }
        })

})

//cambio equipo

btnEquipo.addEventListener('click', e => {
    if (e.target.checked) {
        document.getElementById('equipoRetira').style.display = 'block'
        document.getElementById('serialNumberRetira').setAttribute('required', '')
    } else {
        document.getElementById('equipoRetira').style.display = 'none'
        document.getElementById('serialNumberRetira').removeAttribute('required')
    }

})

//buscar serial Retira
btnSerialRetira.addEventListener('click', e => {
    e.preventDefault()

    const texto = 'Escribe un serial para poder buscar en nuestra base, no dejes espacios en blanco'
    let serial = document.getElementById('serialNumberRetira')
    const errorSerial = document.getElementById('errorSerialRetira')
    const modal = document.getElementById('ModalSerialRetira')
    const url = btnSerialRetira.pathname
    const infoMaquina = document.getElementById('infoMaquinaRetira')
    const textoAyuda = document.getElementById('serialHelpRetira')

    //error espacion en blanco
    if (!serial.value) {
        if (infoMaquina.style.display === 'flex') {
            infoMaquina.style.display = 'none'
            limpiarCampos(serial, textoAyuda)
        } else if (modal.style.display === 'block') {
            modal.style.display = 'none'
            limpiarCampos(serial, textoAyuda)
        }
        errorSerial.style.display = 'block';
        const template = templates('alert-secondary', texto)
        const message = errorSerial.innerHTML = template
        setTimeout(() => {
            errorSerial.style.display = 'none';
        }, 3000)

    } else {
        postData(url, { serial: serial.value })
            .then(respuesta => {
                //no existe el serial
                if (respuesta.error) {
                    if (infoMaquina.style.display === 'flex') {
                        infoMaquina.style.display = 'none'
                        limpiarCampos(serial, textoAyuda)
                    } else if (modal.style.display === 'block') {
                        modal.style.display = 'none'
                        limpiarCampos(serial, textoAyuda)
                    }
                    errorSerial.style.display = 'none';
                    textoAyuda.textContent = `${respuesta.error}, puedes crear el equipo aqui.`
                    modal.style.display = 'block'
                    setTimeout(() => {
                        errorSerial.style.display = 'none';
                    }, 3000)
                } else {
                    textoAyuda.textContent = 'Maquina encontrada'
                    modal.style.display = 'none'
                    serial.classList.add('is-valid')
                    infoMaquina.style.display = 'flex'
                    let marca = document.querySelector('#marcaRetira').value = respuesta.marca
                    let modelo = document.querySelector('#modeloRetira').value = respuesta.modelo
                    let placa = document.querySelector('#placaRetira').value = respuesta.placa
                    let spare = document.querySelector('#spareRetira').value = respuesta.spare
                }
            })
    }

})

//localStorage
const btnSiguiente = document.getElementById('siguiente')

btnSiguiente.addEventListener('click', e => {
    let customCheck1 = document.getElementById('customCheck1')
    if (customCheck1.checked) {
        let serRet = document.getElementById('serialNumberRetira')
        let Ced = document.getElementById('DNI')
        let serAct = document.getElementById('serialNumber')
        localStorage.setItem('{446a3996-7d7c-48ac-93c1-5280a638fcca}', JSON.stringify({ cedula: `${Ced.value}`, actual: `${serAct.value}`, retira: `${serRet.value}` }))
    } else {
        let Ced = document.getElementById('DNI')
        let serAct = document.getElementById('serialNumber')
        localStorage.setItem('{446a3996-7d7c-48ac-93c1-5280a638fcca}', JSON.stringify({ cedula: `${Ced.value}`, actual: `${serAct.value}` }))
    }

})