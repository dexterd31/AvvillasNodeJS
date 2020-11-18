const sequelize = require('sequelize')
const usuarios = require('../models/usuarios')
const equipos = require('../models/equipos')
const checkList = require('../models/checkList')
const tecnicos = require('../models/tecnicos')
const tecnicosHasUsuarios = require('../models/tecnicosHasUsuarios')
const opciones = require('../models/opciones')


exports.formInput = (req, res) => {

    const { id_tecnico , nombre, apellido, perfil } = req.user
    dataUserSession = {
        id: `${id_tecnico}`,
        nombre: `${nombre} ${apellido}`,
        perfil: perfil

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

exports.formData = async (req , res) => {
    
    let { numberServices, typeServices, Date, DNI, serialNumber, serialNumberRetira , cambioEquipo, Formateo} = req.body

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

    res.render('opciones',{
        nombre:'Fase 2'
    })
}

exports.formOptions = (req, res) => {
    
    res.render('opciones',{
        nombre:'Fase 2'
    })

    
}

exports.formDataOptions = async (req, res) => {

    let { cedula, equipoActual, equipoRetira } = req.body
    let { idTecnico, numeroServicio, tipoServicio, fecha, opcionesEquipo} = res.app.locals

    try {
        if(equipoRetira !== 'undefined'){
            const equipoBaja = await equipos.findOne({where: { 
                serial: equipoRetira
            }})
            equipoRetira = equipoBaja
        }else{
            equipoRetira = 'No'
        }
    
        const usuario = await usuarios.findOne({ where: {
            cedula
        }})

        const equipo= await equipos.findOne({where: { 
            serial: equipoActual
        }})
        
        // validar entradas
    
        let entrada = req.body
        if(Object.entries(req.body).length === 0){
            entrada = 'No'
        }
        
        const dataFinal = {
            idTecnico,
            numeroServicio,
            tipoServicio,
            fecha,
            user:usuario,
            equipoActual: equipo, 
            equipoRetira,
            opcionesEquipo,
            configuraciones: entrada
        }
        
        req.app.locals= dataFinal
    
        res.render('comprobante',{
            nombre: 'Fase 3.',
            dataFinal: dataFinal
        })
    } catch (error) {
        console.log(error)
    }
}


exports.envioForm = async (req , res ) => {
    
    let { idTecnico, numeroServicio, tipoServicio, fecha, user, equipoActual,equipoRetira, opcionesEquipo, configuraciones} = res.app.locals

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
    }= configuraciones //opciones

    try {
        if(equipoRetira === 'No'){

            await checkList.create({
                numeroServicio,
                tipoServicio,
                fecha,
                equipoRetira,
                cambioEquipo: opcionesEquipo.cambioEquipo,
                formateo: opcionesEquipo.formateo,
                equipoIdEquipo: equipoActual.id_equipo,
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


            res.send({'respuesta': 'Comprobante almacenado Correctamente.'})
            
      }else{
            
            await checkList.create({
                numeroServicio,
                tipoServicio,
                fecha,
                equipoRetira:equipoRetira.serial,
                cambioEquipo: opcionesEquipo.cambioEquipo,
                formateo: opcionesEquipo.formateo,
                equipoIdEquipo: equipoActual.id_equipo,
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

            res.send({'respuesta': 'Comprobante almacenado Correctamente.'})

        }
    } catch (error) {

        res.send({'error':`${error.message}`})
    }

}

exports.comprobante = async (req , res) => {
    const {numeroServicio} =req.body

    //consultas
    const check = await checkList.findOne({
        where: {
            numeroServicio: numeroServicio
        }
    })

    const usuario = await usuarios.findOne({
        where: {
            id_usuario: check.usuarioIdUsuario
        }
    })

    const equipo = await equipos.findOne({
        where: {
            id_equipo: check.equipoIdEquipo
        }
    })

    const tecnico = await tecnicos.findOne({
        where: {
            id_tecnico: check.tecnicoIdTecnico
        }
    })

    const configuraciones = await opciones.findOne({
        where:{
            checklistIdCheck:check.dataValues.id_check
        }
    })

    //objeto con info a enviar a pagina
    let configs = {
        inicioAdmin: "Inicio como Administrador.",
        configRegional: "verificar configuracion regional, teclado y fecha.",
        controladoresOn: "Verificar que todos los controladores este instalados.",
        estandarNombre: "Nombre de la maquina de acuerdo al estandar de nomenclatura definido (15 Caracteres - Mayusculas). ",
        ipGatewayDns: "Conf. IP, Gateway y DNS (10.10.3.120 y 10.10.3.121  Contingencia 10.10.3.119 y 10.10.7.120) ",
        nucleosProcesador: "Activar los procesadores del equipo según corresponda y Verificar la totalidad de la memoria. ",
        matriculaDominio: "Matricular en dominio bancoavvillas.net - Previamente bajar del Dominio, Solicitar Eliminar Objeto en AD ",
        agregargrupos: "Agregar grupos  administradores IBMSoporte y PC Admin luego forzar politicas y Borrar Usuarios locales no Permitidos.",
        intalaChrome: "Instalar Google Chrome con version a la fecha actual. ",
        instalaAltiris: "Instalar Altiris version 7.10  y pcAnywhere_12_6 (pcAClientInstallManager.exe /iall). AexAgentUtil /Server:zaparo. ",
        instalaTsm: "Instalar Agente TSM.",
        instalaSystemCenter: "Instalar System Center CB-2018.",
        instalaMcafee: "Instalar Agente McafeeSmartInstall_23012019 - UNICAMENTE EN PORTATILES EXCEPTO PRESIDENCIAS Y VICEPRESIDENCIAS. ",
        verificaFirewall: "Verificar que este iniciado windows firewall en servicios y dejarlo automatico.",
        licenciaOffice: "Verificar la activacion automatica de Licencia de Windows y Office365.",
        instalaTripton: "Instalar Agente WebSense (Tripton).",
        instalaAntivirus: "Instalar Antivirus Symantec Endpoint versión 14.2 con updates a la fecha. ",
        configPerfil: "Ingresar al Perfil usuario final. ",
        redirecD: "Cada instalación nueva: el redireccionamiento de las carpetas: Escritorio/ Mis documentos / Descargas / Imágenes; deben ir a la partición D. ",
        privilegiosAdmin: "Asignar privilegios de Usuario administrador (Verifique permisos con el precheck y en caso de tener dudas comunicarse con Admon Circular 052 Cristian Rivera) . ",
        configImpresoras: "Impresoras red o locales (Predefinida).",
        configODBC: "Configurar los ODBC´s (Según precheck).",
        configUnidadesRed: "Configurar las Unidades de red (Según precheck).",
        configPerfilCorreo: "Verificar Numero de perfiles de correo a configurar (según precheck). ",
        configPst: "Configurar Correo. Todos los PST deben quedar en  D ejemplo D:\Correos\Martinezos2018. ",
        configFirmasCorreo: "Restaurar Firma Outlook  Formato usuario. ",
        configCertDigital: "Importar Certificado Digital  y/o crearlo según el caso. ",
        configWifi: "Verificacion de la CONECTIVIDAD del Wifi con el usuario (Portatil),En Propiedades: Protocolo de internet versión 4(TCP/IPv4): NO debe tener configurada Direccion IP ni DNS, En Iexplorer deshabilitar el uso del servidor Proxy para wifi publicas.",
        configExtencionesProgramas: "Asociar extensiones de archivos (.rar .ppt .jpg .7z)  con programas predeterminados.",
        connfigAccesosDirectosPerfil: "Colocar los accesos directos del escritorio (Según Precheck).",
        configFavoritosInternet: "Colocar favoritos de internet  (Según Precheck).",
        configInfoMisDocumentos: "Colocar informacion de mis documentos  (Según Precheck).",
        pruebasCorreo: "Pruebas de correo usuario (Outlook) y/o demas buzones. ",
        pruebasEnvioCorreo: "Hacer pruebas envio correo cifrado (Certificado Digital).",
        pruebasODBC: "Realizar pruebas con las ODBC´s (Desde Acces o Excel).",
        pruebasSkype: "Ingresar a Skype Empresarial (o chat empresarial).",
        pruebasOffice: "Ingresar y verificar correcto funcionamiento del paquete office  (Word, Excel Power Point y Outlook) Access:, Visio y Project (si aplica).",
        pruebasImpresoras: "Verifique sus impresoras instaladas.",
        pruebasAntivirus: "Verifique que tenga su antivirus instalado  (Indicar al usuario).",
        pruebas7Zip: "Verifique funcionamiento del 7ZIP. ",
        verificaProgramas: "Ingresar a programas predeterminados y dejar el Iexplore como predeterminado. Por cada Perfil. ",
        VerificaFNTecla: "Instruir en el manejo de la tecla fn para utilidad de wifi brillo entre otros.",
        VerificaAplicacionesUsuario: "Prueba aplicaciones según usuario.",
        verificaOnbaseWeb: "Prueba onbase por web.",
        verificaCRM: "Prueba onbase por CRM. ",
        verificaSisa: "Entre al aplicativo de Sisa.",
        verificaSAP:"Ingrese a Onbase SAP (preguntar perfil si lo necesita)."
    }


    const arreglo = []
    const resultado = []
    //agregando los on de configuraciones a arreglo
    Object.keys(configuraciones.dataValues).forEach(valor => {
        if(configuraciones[valor] ==='on'){
            arreglo.push(valor)
        }
    })
    //pasando el arreglo para que busque sobre las config y poder enviar info
    arreglo.forEach(e =>{
        Object.keys(configs).forEach(d => {
            if(d === e){
                resultado.push(configs[e])
            }
        })
    })


    if(check.dataValues.equipoRetira !== 'No'){
        
        const equipoRetira = await equipos.findOne({
            where: {
                serial: check.dataValues.equipoRetira
            }
        })
        
        res.render('confirmacion',{
            nombre: 'Avvillas Comprobante',
            check,
            usuario,
            equipo,
            tecnico,
            resultado,
            equipoRetira
        })

    }else{
        
        res.render('confirmacion',{
            nombre: 'Avvillas Comprobante',
            check,
            usuario,
            equipo,
            tecnico,
            equipoRetira: false,
            resultado
        }) 
    }

    
}