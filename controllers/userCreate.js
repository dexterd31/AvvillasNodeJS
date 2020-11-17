const tecnicos = require('../models/tecnicos')

exports.creaUsuario = (req, res) => {
    if(req.user.perfil === 'Tecnico'){
        res.redirect('/formulario')
    }
    res.render('creacionUsuario', {
        nombre: 'Creacion Usuario',
        mensaje: false
    })
}
exports.creaUsuarioForm = async (req, res) => {
    
    let { cedula, nombre, apellido, correo, pass, rol } = req.body

    const usuario = await tecnicos.findOne({
        where: {
            cedula
        }
    })

    if(!usuario){
        tecnicos.create({
            nombre,
            apellido,
            cedula,
            perfil: rol,
            correo,
            contraseña : pass
        })

        res.render('creacionUsuario', {
            nombre: 'Creacion Usuario',
            mensaje: { confirmar: 'Usuario creado Correctamente.'}
        })

    }else{
        res.render('creacionUsuario', {
            nombre: 'Creacion Usuario',
            mensaje: { error: 'Usuario ya creado.'}
        }) 
    }
}