const db = require ('../config/db')
const checkList = require ('../models/checkList')

exports.vista = async (req, res) => {

    const resultadoCambios = await db.query(`SELECT COUNT(*) as Cantidad FROM checklists WHERE cambioEquipo= "Si"`);
    const resultadoformateos = await db.query(`SELECT COUNT(*) as Formateos FROM checklists WHERE formateo= "Si"`);

    const {Cantidad} =resultadoCambios[0][0]
    const {Formateos} =resultadoformateos[0][0]
    const cambioEquipos= Cantidad
    const formateos = Formateos

    res.render('informes',{
        nombre: 'Informes',
        cambioEquipos, 
        formateos
    })
}