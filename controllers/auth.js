const passport = require ('passport')


exports.formIniciarSesion= (req, res) =>{
    //con esta forma podemos revisar los errores en iniciar sesion y podemos pasarlos a la vista
    const { error } = res.locals.mensajes 
    res.render('iniciarSesion', {
        nombre: 'Iniciar Sesion',
        error
        
    })
}
/**importamos passport y luego le pasamos como exports.nombrecontrolador le pasamos passport.autenticate donde los primeros valores son la estrategia y luego las opciones*/
exports.autenticaUsuario = passport.authenticate('local',{
    //si logra la autenticacion, succesRedirect lo lleva al inicio de la aplicacion
    successRedirect: '/formulario',
    //si falla, lo dejara en la vista de iniciar sesion
    failureRedirect: '/iniciarSesion',
    // esto nos permite cargar los errores en flash
    failureFlash: true,
    //con esta propiedad, le podemos enviar un error si el req es mal o perdido
    badRequestMessage: 'los campos son obligatorios'

})

//funcion saber si el usuario esta logueado o no

exports.usuarioLogueado= (req, res, next) => {
    //esto nos ayuda a guardar la referencia del usuario que inicia
    // console.log(req.user)
    //si el usuario esta atenticado
    if( req.isAuthenticated ()){
        return next()
    } 

    //si el usuario no esta autenticado, redirigir a inicar sesion
    return res.redirect('/iniciarSesion')
}   

exports.cerrarSesion= (req, res) => {
    req.session.destroy(() => {
        res.redirect('/iniciarSesion')
    })
}