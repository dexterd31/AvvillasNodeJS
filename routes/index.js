const express = require ('express');
const router = express.Router();
const form = require ('../controllers/form')
const auth = require ('../controllers/auth')
const busqueda = require ('../controllers/busqueda')
const userCreate = require ('../controllers/userCreate')
const informes = require ('../controllers/informes')

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
    router.get('/busqueda', auth.usuarioLogueado, busqueda.busquedaComprobantes)
    router.post('/busqueda', auth.usuarioLogueado, busqueda.busquedaComprobantesPost)

    //creacion usuarios
    router.get('/usuarios', auth.usuarioLogueado, userCreate.creaUsuario)
    router.post('/usuarios', auth.usuarioLogueado, userCreate.creaUsuarioForm)

    //informes
    router.get('/informes', auth.usuarioLogueado, informes.vista)

    //crear usuario/contraseñas
    router.get('/cambiarPass', auth.usuarioLogueado, userCreate.cambiarPass)
    router.post('/cambiarPassForm', auth.usuarioLogueado, userCreate.cambiarPassForm)
    router.post('/cambiarPass', auth.usuarioLogueado, userCreate.cambiarPassDone)

    //comprobante
    router.post('/comprobante', auth.usuarioLogueado , form.comprobante)

    return router;
}