const express = require ('express');
const router = require ('./routes')
const path = require ('path')
const bodyParser = require ('body-parser')
const expressLayout = require ('express-ejs-layouts')

// traer el config del DB
const db = require ('./config/db')

require ('./models/equipos')
require ('./models/usuarios')
require ('./models/tecnicos')
require ('./models/tecnicosHasUsuarios') 
require ('./models/checkList') 


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

app.use('/', router())
app.listen(3000, () => {
    console.log('Online Server')
})