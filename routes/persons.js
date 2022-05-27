//Importando los módulos necesarios.
const express = require('express');
const router = express.Router();
const mongoose = require('../node_modules/mongoose');
let Person = require('../models/person');

    // Definiendo la ruta que recibirá el objeto JSON.
    router.get('/persons', function(req, res, next) {
        Person.find(function (err, persons) {
        if (err) return next (err);
        //res.json(persons)
        res.render('personsIndex', {persons}); //Renderizamos "personsIndex" para la vista "persons".
        });
    });

    //Ruta GET para poder eliminar el registro o documento de una persona.
    router.get('/deletePerson/:id', function(req, res, next) {
        /*Utilizamos el método findByIdAndRemove para regresar una promesa 
        (puede ser error o la eliminación del documento.)*/
        Person.findByIdAndRemove(req.params.id, req.body, function (err, post) {
            if (err) return next (err);
            res.redirect('/persons') //Nos redirijimos a la misma ruta para dar un "refresh".       
        });
    });  

    /*Esta ruta GET nos permitirá mostrar el formulario que registrará y enviará los datos para poder
    crear un nuevo documento.*/
    router.get('/person', function(req, res) {
        res.render('person'); // Renderizamos la vista con la que vamos a enviar los datos del nuevo objeto "person".
    });

    /*Esta ruta POST tendrá la función de atender todas las peticiones que se hagan desde el 
    formulario, además de que insertará un nuevo documento en la base de datos.*/
    router.post('/addPerson', function(req, res) {
        // Creando un nuevo registro para el documento.
        const myPerson = new Person({
            nombre: req.body.nombre,
            edad: req.body.edad,
            tipoSangre: req.body.tipoSangre,
            nss: req.body.nss
        });
        myPerson.save(); //Guarda el nuevo registro en la base de datos.
    }); 

// Exportando el módulo.
module.exports = router; 