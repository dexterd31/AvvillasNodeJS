const Sequelize = require ('sequelize')
const db = require ('../config/db')

const checklist = db.define('checklist', {
    id_check:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    numeroServicio: { 
        type: Sequelize.STRING(30), 
        allowNull: false,
        unique:{
            arg: true,
            msg: 'Numero de servicio ya registrado.' 
        }
    },
    tipoServicio: {
        type: Sequelize.STRING(30),
        allowNull:false
    },
    fecha: {
        type: Sequelize.STRING(30),
        allowNull:false
    },
    equipoRetira: {
        type: Sequelize.STRING(30),
        allowNull:false
    },
    cambioEquipo: {
        type: Sequelize.STRING(30),
        allowNull:false
    }, 
    formateo: {
        type: Sequelize.STRING(30),
        allowNull:false
    }
})

module.exports = checklist;  