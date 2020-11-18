const db = require( '../config/db')
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

exports.cambiarPass = async (req, res) => {

    const usuario = await tecnicos.findAll()

    let lista = []
    usuario.forEach(element => {
        lista.push(element.dataValues)
    });

    res.render('actualizaPass',{
        nombre: 'Usuarios',
        lista,
        mensaje: false
    })
}

exports.cambiarPassForm = (req, res) => {

    const { cedula } = req.body

    res.render('confirmarPass', {
        nombre: 'Confirmar Contraseña',
        cedula: cedula,

    })

}

exports.cambiarPassDone = async (req, res) => {


    const { pass , cedula } = req.body
    const [results, metadata] = await db.query(`UPDATE tecnicos SET contraseña= "${pass}" WHERE cedula = "${cedula}" `);

    const usuario = await tecnicos.findAll()

    let lista = []
    usuario.forEach(element => {
        lista.push(element.dataValues)
    });

    res.render('actualizaPass',{
        nombre: 'Usuarios',
        lista,
        mensaje:'Cambio realizado Correctamente'
    })
    


}