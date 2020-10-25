const Sequelize = require ('sequelize')
const db = require ('../config/db')

//give files config
const equipos = require ('../models/equipos')
const tecnicosHasUsuarios = require ('../models/tecnicosHasUsuarios')
const checkList = require ('../models/checkList')



const Usuarios = db.define('usuarios', {
    id_usuario: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cedula: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique:{
            arg: true,
            msg: 'Cedula ya registrada.'
        },
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    nombres: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
        
    },
    apellidos: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
        
    },
    area: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    extencion: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    correo: { 
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    usuarioRed: {
        type: Sequelize.STRING(20),
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    
})

Usuarios.hasMany(equipos)
Usuarios.hasMany(tecnicosHasUsuarios)
Usuarios.hasMany(checkList)

module.exports = Usuarios; 

