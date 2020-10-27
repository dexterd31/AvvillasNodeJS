const express = require ('express');
const router = require ('./routes')
const path = require ('path')
const bodyParser = require ('body-parser')
const expressLayout = require ('express-ejs-layouts')
const flash = require ('connect-flash')
const session = require ('express-session')
const cookieParser = require ('cookie-parser')
const passport = require('./config/passport')
// traer el config del DB
const db = require ('./config/db')

require ('./models/equipos')
require ('./models/usuarios')
require ('./models/tecnicos')
require ('./models/tecnicosHasUsuarios') 
require ('./models/checkList'),
require ('./models/opciones')  


db.sync()
    .then(() => console.log('conectado al servidor'))
    .catch(error => console.log(error))
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.use(express.static('public'))

app.use(expressLayout)
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, './views'))

app.use(flash())
//habilitamos las cookie
app.use(cookieParser())
//agregamos las sessiones
app.use(session({
    //esta propiedad ayuda a firmar el cookie
    secret: 'supersecreto',
    // las otras dos propiedades nos permiten mantener la sesion activa asi este inactivo o navegando por otras paginas 
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use((req,res, next) => {

    res.locals.mensajes = req.flash()

    next()
})

app.use('/', router())
app.listen(3000, () => {
    console.log('Online Server')
})