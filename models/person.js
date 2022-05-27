const mongoose = require('mongoose');

// Inicializando un nuevo schema, el cuál será recibido por la base de datos.
let PersonSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    tipoSangre: String,
    nss: String
});

// Exportando el módulo.
module.exports = mongoose.model('Persons', PersonSchema); 