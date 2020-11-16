const express = require ('express');
const router = express.Router();
const form = require ('../controllers/form')
const auth = require ('../controllers/auth')

module.exports = () => {

    router.get('/', (req , res) => { res.redirect('/formulario')})

    //iniciar sesion
    router.get('/iniciarSesion', auth.formIniciarSesion)
    router.post('/iniciarSesion', auth.autenticaUsuario)
    //cerrar sesion
    router.get('/cerrarSesion', auth.cerrarSesion)
    //formulario
    router.get('/formulario', auth.usuarioLogueado, form.formInput)
    //envio de datos 
    router.post('/formulario/opciones', auth.usuarioLogueado, form.formData)

    //valida datos
    router.post('/buscarCedula', auth.usuarioLogueado, form.searchDataUser)
    router.post('/buscarSerial', auth.usuarioLogueado, form.searchDataMachine)

    //subir usuario
    router.post('/envioUsuario', auth.usuarioLogueado, form.envioUsuario)
    router.post('/envioMaquina', auth.usuarioLogueado, form.envioMaquina)

    //opciones
    // router.get('/formulario/opciones', auth.usuarioLogueado, form.formOptions)
    router.post('/formulario/opciones/resumen', auth.usuarioLogueado, form.formDataOptions)
    router.post('/formulario/opciones/resumen/envioForm', auth.usuarioLogueado, form.envioForm)

    //menu opciones
    router.get('/busqueda', auth.usuarioLogueado, form.busquedaComprobantes)
    router.post('/busqueda', auth.usuarioLogueado, form.busquedaComprobantesPost)

    return router;
}