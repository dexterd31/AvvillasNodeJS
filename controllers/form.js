const sequelize = require('sequelize')
const usuarios = require('../models/usuarios')
const equipos = require('../models/equipos')
const checkList = require('../models/checkList')
const tecnicosHasUsuarios = require('../models/tecnicosHasUsuarios')
const opciones = require('../models/opciones')


exports.formInput = (req, res) => {
    const { id_tecnico , nombre, apellido } = req.user
    dataUserSession = {
        id: `${id_tecnico}`,
        nombre: `${nombre} ${apellido}`
    }

    res.render ('formulario', {
        nombre: 'Fase 1.',
        error: false, 
        mensaje: false
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
                tecnicoIdTecnico: req.user.id_tecnico
            })
            
            res.send({'respuesta': 'elemento creado correctamente.'})
        } catch (error) {   
            res.send({'error':`${error.message}`})
        }
    }
}

exports.formData = (req , res) => {

    
    let { numberServices, typeServices, Date, DNI, serialNumber, serialNumberRetira, cambioEquipo, Formateo} = req.body
    

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



    let datosForm = {
        idTecnico: req.user.id_tecnico,
        numeroServicio: numberServices,
        tipoServicio: typeServices,
        fecha: Date,
        cedulaUser: DNI,
        equipoActual: serialNumber,
        equipoRetira: serialNumberRetira,
        opcionesEquipo : {
            formateo: Formateo,
            cambioEquipo
        }
    }


    req.app.locals = datosForm

    res.redirect('/formulario/opciones')


 
}

exports.formOptions = (req, res) => {
    
    res.render('opciones',{
        nombre:'Fase 2'
    })
   
}
exports.formDataOptions = async (req, res) => {

    let {
        inicioAdmin,
        configRegional,
        controladoresOn,
        estandarNombre,
        ipGatewayDns,
        nucleosProcesador,
        matriculaDominio,
        agregargrupos,
        intalaChrome,
        instalaAltiris,
        instalaTsm,
        instalaSystemCenter,
        instalaMcafee,
        verificaFirewall,
        licenciaOffice,
        instalaTripton,
        instalaAntivirus,
        configPerfil,
        redirecD,
        privilegiosAdmin,
        configImpresoras,
        configODBC,
        configUnidadesRed,
        configPerfilCorreo,
        configPst,
        configFirmasCorreo,
        configCertDigital,
        configWifi,
        configExtencionesProgramas,
        connfigAccesosDirectosPerfil,
        configFavoritosInternet,
        configInfoMisDocumentos,
        pruebasCorreo,
        pruebasEnvioCorreo,
        pruebasODBC,
        pruebasSkype,
        pruebasOffice,
        pruebasImpresoras,
        pruebasAntivirus,
        pruebas7Zip,
        verificaProgramas,
        VerificaFNTecla,
        VerificaAplicacionesUsuario,
        verificaOnbaseWeb,
        verificaCRM,
        verificaSisa,
        verificaSAP
    }= req.body//opciones



    const { idTecnico, numeroServicio, tipoServicio, fecha, cedulaUser, equipoActual, equipoRetira, opcionesEquipo} = res.app.locals

    try {
        if(equipoRetira === 'No'){
            const usuarioPromise = usuarios.findOne({where: {cedula : cedulaUser}})
            const equipoPromise = equipos.findOne({where: { serial: equipoActual}})
    
            const [ user, machine] = await Promise.all([usuarioPromise,equipoPromise])


            await checkList.create({
                numeroServicio,
                tipoServicio,
                fecha,
                equipoRetira,
                cambioEquipo: opcionesEquipo.cambioEquipo,
                formateo: opcionesEquipo.formateo,
                equipoIdEquipo: machine.id_equipo,
                usuarioIdUsuario: user.id_usuario,
                tecnicoIdTecnico: idTecnico
            })
            
            await tecnicosHasUsuarios.create({
                usuarioIdUsuario: user.id_usuario,
                tecnicoIdTecnico: idTecnico

            })

            const IdCheck = await checkList.findOne({where:{ numeroServicio}})

            await opciones.create({ 
                inicioAdmin,
                configRegional,
                controladoresOn,
                estandarNombre,
                ipGatewayDns,
                nucleosProcesador,
                matriculaDominio,
                agregargrupos,
                intalaChrome,
                instalaAltiris,
                instalaTsm,
                instalaSystemCenter,
                instalaMcafee,
                verificaFirewall,
                licenciaOffice,
                instalaTripton,
                instalaAntivirus,
                configPerfil,
                redirecD,
                privilegiosAdmin,
                configImpresoras,
                configODBC,
                configUnidadesRed,
                configPerfilCorreo,
                configPst,
                configFirmasCorreo,
                configCertDigital,
                configWifi,
                configExtencionesProgramas,
                connfigAccesosDirectosPerfil,
                configFavoritosInternet,
                configInfoMisDocumentos,
                pruebasCorreo,
                pruebasEnvioCorreo,
                pruebasODBC,
                pruebasSkype,
                pruebasOffice,
                pruebasImpresoras,
                pruebasAntivirus,
                pruebas7Zip,
                verificaProgramas,
                VerificaFNTecla,
                VerificaAplicacionesUsuario,
                verificaOnbaseWeb,
                verificaCRM,
                verificaSisa,
                verificaSAP,
                checklistIdCheck: IdCheck.id_check
            })

            const mensaje = 'Comprobante almacenado correctamente'
            res.render('formulario',{
                nombre:'Fase 1', 
                error: false,
                mensaje : mensaje
            })
            
      }else{


            const usuarioPromise = usuarios.findOne({where: {cedula : cedulaUser}})
            const equipoPromise = equipos.findOne({where: { serial: equipoActual}})
            const equipoRetiraPromise = equipos.findOne({where: { serial: equipoRetira}})
    
            const [ user, machine, machineOff] = await Promise.all([usuarioPromise,equipoPromise, equipoRetiraPromise])

            

            await checkList.create({
                numeroServicio,
                tipoServicio,
                fecha,
                equipoRetira:machineOff.serial,
                cambioEquipo: opcionesEquipo.cambioEquipo,
                formateo: opcionesEquipo.formateo,
                equipoIdEquipo: machine.id_equipo,
                usuarioIdUsuario: user.id_usuario,
                tecnicoIdTecnico: idTecnico
            })
            
            await tecnicosHasUsuarios.create({
                usuarioIdUsuario: user.id_usuario,
                tecnicoIdTecnico: idTecnico

            })

            const IdCheck = await checkList.findOne({where:{ numeroServicio}})

            await opciones.create({ 
                inicioAdmin,
                configRegional,
                controladoresOn,
                estandarNombre,
                ipGatewayDns,
                nucleosProcesador,
                matriculaDominio,
                agregargrupos,
                intalaChrome,
                instalaAltiris,
                instalaTsm,
                instalaSystemCenter,
                instalaMcafee,
                verificaFirewall,
                licenciaOffice,
                instalaTripton,
                instalaAntivirus,
                configPerfil,
                redirecD,
                privilegiosAdmin,
                configImpresoras,
                configODBC,
                configUnidadesRed,
                configPerfilCorreo,
                configPst,
                configFirmasCorreo,
                configCertDigital,
                configWifi,
                configExtencionesProgramas,
                connfigAccesosDirectosPerfil,
                configFavoritosInternet,
                configInfoMisDocumentos,
                pruebasCorreo,
                pruebasEnvioCorreo,
                pruebasODBC,
                pruebasSkype,
                pruebasOffice,
                pruebasImpresoras,
                pruebasAntivirus,
                pruebas7Zip,
                verificaProgramas,
                VerificaFNTecla,
                VerificaAplicacionesUsuario,
                verificaOnbaseWeb,
                verificaCRM,
                verificaSisa,
                verificaSAP,
                checklistIdCheck: IdCheck.id_check
            })

            const mensaje = 'Comprobante almacenado correctamente'
            res.render('formulario',{
                nombre:'Fase 1', 
                error: false,
                mensaje : mensaje
            })

        }
    } catch (error) {
        res.render('formulario', {
            nombre: 'Fase 1.',
            error

        })

    }
}

