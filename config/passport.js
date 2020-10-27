const passport = require ('passport')
const LocalStrategy = require('passport-local').Strategy;
const tecnicos = require('../models/tecnicos')


passport.use(new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'contraseña'
  },
    async (correo, contraseña, done) => {
        try {
            const tecnico = await tecnicos.findOne({ where: { correo: correo } })

            if(tecnico.contraseña !== contraseña){
                return done(null, false, {
                    message:'Password Incorrecto'
                })
            }

            return done(null,tecnico)

        } catch (error) {
            return done(null, false, {
                message: 'Esa cuenta no existe'
            })
        }
      
    }
  ));

  //serializar el usuario 
passport.serializeUser((tecnico, callback) => {
    callback(null, tecnico)
})

//deserializar el usuario   
passport.deserializeUser((tecnico, callback) => {
    callback(null, tecnico)
})

module.exports = passport;