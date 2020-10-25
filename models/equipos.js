const Sequelize = require ('sequelize')
const db = require ('../config/db')

const checkList = require ('../models/checkList')

const Equipo = db.define('equipo', {
    id_equipo: {
        type:Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    tipo: { 
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    serial: { 
        type: Sequelize.STRING,
        allowNull: false,
        unique:{
            arg: true,
            msg: 'Serial ya registrado, intenta con otro'
        },
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    marca: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    modelo: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    placa: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    },
    spare: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
            notEmpty:{
                msg: 'el campo no puede ir vacio'
            }
        }
    }   
})

Equipo.hasMany(checkList)
 

module.exports = Equipo; 