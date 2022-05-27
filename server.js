const mongoose = require('mongoose'); // Importando la dependencia de Mongoose.
const express = require('express');   // Importando la dependencia de Express.
const personsRoutes = require('./routes/persons'); // Importando Router desde "persons".

mongoose.Promise = global.Promise; // Asignamos una promesa para evitar tener conexiones asíncronas.
const app = express();

app.set('view engine', 'ejs');                   // Utilizando el template de EJS.
app.use(express.urlencoded( {extended:false} )); 
app.use(personsRoutes);                          // Ejecutando el Router.

// Punto de acceso y conexión a MongoDB Atlas.
mongoose.connect(
`mongodb+srv://ahernandez102:nzpLLIENm8SbfOC3@cluster0.dhyul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
{
useNewUrlParser: true,
useUnifiedTopology: true
});

app.get('/main', (req, res) => {
    res.render('main'); //Indicamos el archivo main.ejs al método render para nuestra ruta.
});

const db = mongoose.connection; //Constante que nos permite establecer conexión con la base de datos.
db.on("error", console.error.bind(console, "connection error: ")); //Imprime en consola un mensaje para informar un error al tratar de conectarse con MongoDB.
db.once("open", function () {
console.log("Connected successfully"); //Imprime en consola un mensaje que confirma la conexión con MongoDB.
});

let PORT = process.env.PORT || 3000; //Asignamos el puerto que esuchará las peticiones.

app.listen(PORT, () => {
    console.log('Escuchando en el puerto 3000'); //Respuesta del servidor.
});
