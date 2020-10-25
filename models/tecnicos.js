const Sequelize = require ('sequelize')
const db = require ('../config/db')

const equipos = require('../models/equipos');
const tecnicosHasUsuarios = require('../models/tecnicosHasUsuarios');
const checkList = require('../models/checkList');


const tecnico= db.define('tecnico', {
    id_tecnico: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: Sequelize.STRING(30),
        allownull: false
    },
    apellido:{
        type: Sequelize.STRING(30),
        allownull: false
    },
    cedula:{
        type: Sequelize.STRING(30),
        allownull: false,
        unique:{
            arg: true,
            msg: 'Cedula ya registrada'
        }
    },
    correo:{
        type: Sequelize.STRING(60),
        allownull: false,
        unique:{
            arg: true,
            msg: 'correo ya registrado, intenta con otro'
        },
        validate:{
            isEmail:{
                msg: 'el campo de email no es valido'
            },
            notEmpty:{
                msg: 'el campo email no puede ir vacio'
            }
        }
    }, 
    contraseña: {
        type: Sequelize.STRING(60),
        allownull: false,
        validate:{
            notEmpty: {
                msg: 'el campo password no puede ir vacio'
            }
        }
    }
}) 

tecnico.hasMany(tecnicosHasUsuarios)
tecnico.hasMany(checkList) 
tecnico.hasMany(equipos) 

module.exports = tecnico; 