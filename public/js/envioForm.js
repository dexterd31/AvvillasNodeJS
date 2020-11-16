const btn = document.getElementById('envioForm')

//peticion fetch
const enviarDatos = async (url = '', data = {}) => {
    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data) 
    });
    return response.json(); 
}

btn.addEventListener('click', e => {
    e.preventDefault()

    enviarDatos('/formulario/opciones/resumen/envioForm',{envio: 'envio'})

    .then(response =>{
        if(response.respuesta){
            let ventana = document.getElementById('modalEnvio')
            ventana.removeAttribute('role')
            ventana.removeAttribute('aria-modal')
            ventana.setAttribute('aria-hidden', true)
            ventana.style.display= 'none'
            ventana.classList.remove('show')

            const nuevaVentana = document.getElementById('modalSalida')
            nuevaVentana.classList.add('show')
            nuevaVentana.setAttribute('aria-modal', true)
            nuevaVentana.setAttribute('role', 'dialog')
            nuevaVentana.style.display='block'
            
            const origen = window.origin

            setTimeout(()=>{
                window.location.href = `${origen}/formulario`
            },2000)

        }else if(response.error){
            const titulo = document.getElementById('title')
            const icono = document.getElementById('icon')
            let mensaje = document.getElementById('message')
            titulo.textContent = 'Error'
            icono.classList.remove('fa-file-upload')
            icono.classList.add('fa-exclamation-circle')
            mensaje.textContent = `${response.error}`

        }
    })

    
})