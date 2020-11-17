const usuarios = require('../models/usuarios')
const equipos = require('../models/equipos')
const checkList = require('../models/checkList')
const tecnicos = require('../models/tecnicos')


exports.busquedaComprobantes = (req, res) =>{
    res.render('consultas',{
        nombre: 'Consulta Comprobantes',
        datos: false
    })
}
exports.busquedaComprobantesPost = async (req , res) => {
    
    let { busqueda } = req.body

    const info = await checkList.findOne( { where : {
        numeroServicio : busqueda
    }})

    if(info){
        const usuario = await usuarios.findOne({where: {
            id_usuario : info.usuarioIdUsuario
        }})
    
        const tecnico = await tecnicos.findOne({ where: {
            id_tecnico: info.tecnicoIdTecnico
        }})
    
        const datos = {
            numeroServicio: info.numeroServicio,
            tipoServicio: info.tipoServicio,
            tecnico: `${tecnico.nombre} ${tecnico.apellido }`,
            usuario: `${usuario.nombres} ${usuario.apellidos}`
        }
    
        res.render('consultas', {
            nombre: 'Consulta Comprobante',
            datos: datos
        })
    }else{
        res.render('consultas', {
            nombre: 'Consulta Comprobante',
            datos: {error:'No existe el documento.'}
        })
    }
    
}