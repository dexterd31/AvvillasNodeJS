const express = require ('express');
const router = express.Router();
const form = require ('../controllers/form')

module.exports = () => {

    router.get('/', (req , res) => { res.redirect('/formulario')})

    router.get('/formulario', form.formInput)
    //envio de datos 
    router.post('/formulario', form.formData)

    //valida datos
    router.post('/buscarCedula', form.searchDataUser)
    router.post('/buscarSerial', form.searchDataMachine)

    //subir usuario
    router.post('/envioUsuario', form.envioUsuario)
    router.post('/envioMaquina', form.envioMaquina)

    //opciones
    router.get('/opciones', form.formOptions)
    router.post('/opciones', form.formDataOptions)

    return router;
}