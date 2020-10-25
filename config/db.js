const Sequelize = require ('sequelize')
//traer los valores de las variables
require ('dotenv').config({path: 'variables.env'})


const db = new Sequelize(process.env.BD_Nombre, process.env.BD_User, process.env.BD_Password, {
    host: process.env.BD_Host,
    dialect: 'mysql',
    port: process.env.BD_Port,
    define: {
        timestamps: false
    },
    logging: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      }
    
  });

  module.exports = db;