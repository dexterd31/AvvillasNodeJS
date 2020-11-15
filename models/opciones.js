const Sequelize = require ('sequelize')
const db = require ('../config/db')


const opciones = db.define('opciones', {
    id_opcion: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    inicioAdmin: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configRegional: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    controladoresOn: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    estandarNombre: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    ipGatewayDns: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    nucleosProcesador: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    matriculaDominio: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    agregargrupos: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    intalaChrome: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    instalaAltiris: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    instalaTsm: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    instalaSystemCenter: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    instalaMcafee: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    verificaFirewall: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    licenciaOffice: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    instalaTripton: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    instalaAntivirus: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configPerfil: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    redirecD: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    privilegiosAdmin: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configImpresoras: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configODBC: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configUnidadesRed: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configPerfilCorreo: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configPst: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configFirmasCorreo: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configCertDigital: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configWifi: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configExtencionesProgramas: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    connfigAccesosDirectosPerfil: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configFavoritosInternet: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    configInfoMisDocumentos: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebasCorreo: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebasEnvioCorreo: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebasODBC: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebasSkype: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebasOffice: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebasImpresoras: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebasAntivirus: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    pruebas7Zip: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    verificaProgramas: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    VerificaFNTecla: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    VerificaAplicacionesUsuario: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    verificaOnbaseWeb: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    verificaCRM: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    verificaSisa: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    },
    verificaSAP: { 
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'off'
    }  
})
 

module.exports = opciones; 
