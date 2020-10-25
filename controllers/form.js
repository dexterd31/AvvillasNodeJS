const sequelize = require('sequelize')
const usuarios = require('../models/usuarios')
const equipos = require('../models/equipos')
const checkList = require('../models/checkList')
const tecnicosHasUsuarios = require('../models/tecnicosHasUsuarios')


exports.formInput = (req, res) => {
    res.render ('formulario', {
        nombre: 'Fase 1.',
        error: false
    })
}

//buscar cedula
exports.searchDataUser = async (req, res) => {

    const { dato } =req.body

    const usuario = await usuarios.findOne({
        where: {
            cedula: dato
        }
    })
    if(usuario){
        res.send({"nombre": usuario.nombres, "apellido": usuario.apellidos, "telefono": usuario.extencion})
    }else{
        res.send({"error": "No encontramos este numero de documento en nuestra base de datos"})
    }
}

//buscar maquina con serial
exports.searchDataMachine = async( req , res) => {
    const { serial } =req.body

    const equipo = await equipos.findOne({
        where : {
            serial
        } 
    })
    //marca, modelo, placa, spare
    if(equipo){
        res.send({ "marca":equipo.marca, "modelo": equipo.modelo, "placa": equipo.placa, "spare": equipo.spare})
    }else{
        res.send({"error": "no existe el equipo"})
    }
}

//envio usuario
exports.envioUsuario = async (req, res) => {
   
    const { nombre, apellido, cedula, ext, area, correo, usuarioRed } = req.body

    console.log(req.body)

    try {
        await usuarios.create({
            nombres: nombre,
            apellidos: apellido,
            cedula: cedula,
            extencion: ext,
            area: area,
            correo: correo,
            usuarioRed: usuarioRed
        })
        res.send({'respuesta': 'usuario creado correctamente.'})
    } catch (error) {
        res.send({'error':`${error.message}`})
        
    }
}

exports.envioMaquina = async (req, res) => {
    const { tipo, serial, marca, modelo, placa, spare, cedula } = req.body

    if(cedula === ''){
        res.send({'error': 'no has registrado una cedula aún, debes hacerlo para continuar con el proceso.'})
    }else {
        //buscamos el id del usuario
        const usuario = await usuarios.findOne({
            where:{
                cedula
            }
        })
    
        try {
            await equipos.create({
                tipo: tipo,
                serial: serial, 
                marca: marca,
                modelo: modelo,
                placa: placa,
                spare: spare,
                usuarioIdUsuario: usuario.id_usuario,
                tecnicoIdTecnico: 1
            })
            
            res.send({'respuesta': 'elemento creado correctamente.'})
        } catch (error) {   
            res.send({'error':`${error.message}`})
        }
    }
}

exports.formData = async (req , res) => {
    
    let { numberServices, typeServices, Date, DNI, serialNumber, serialNumberRetira, cambioEquipo, Formateo} = req.body
    
    const usuarioPromise = usuarios.findOne({where: {cedula : DNI}})
    const equipoPromise = equipos.findOne({where: { serial: serialNumber}})

    const [ user, machine] = await Promise.all([usuarioPromise,equipoPromise])

    //cambiando el on para los select

    if(Formateo){
        Formateo = 'Si'
    }else {
        Formateo = 'No'
    }

    if(cambioEquipo){
        cambioEquipo = 'Si'
    }else{
        cambioEquipo= 'No'
    }

    if(!serialNumberRetira){
        serialNumberRetira = 'No'
    }

    
    
    try {

        await tecnicosHasUsuarios.create({
            usuarioIdUsuario: user.id_usuario,
            tecnicoIdTecnico: machine.id_equipo
        })
        //sube datos checlist
        await checkList.create({
            numeroServicio: numberServices,
            tipoServicio: typeServices,
            fecha: Date,
            equipoRetira:serialNumberRetira,
            cambioEquipo: cambioEquipo,
            formateo: Formateo,
            equipoIdEquipo: machine.id_equipo,
            usuarioIdUsuario: user.id_usuario,
            tecnicoIdTecnico: 1

        })

        
        req.app.locals = { numeroServicio: numberServices}
        res.redirect('/opciones')
    } catch (error) {
        
        res.render('formulario', {
            nombre: 'Fase 1.',
            error
        })
        
    }
}

exports.formOptions = (req, res) => {
    const dataReq= req.app.locals
    res.render('opciones', {
        nombre: 'Fase 2.'
    })
}
exports.formDataOptions = (req, res) => {

    datos = req.body
    console.log(req.app.locals)
    res.send('enviado')
}