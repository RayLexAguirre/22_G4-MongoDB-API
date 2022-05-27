//Importando los módulos necesarios.
const express = require('express');
const router = express.Router();
const mongoose = require('../node_modules/mongoose');
let Person = require('../models/person');

    // Definiendo la ruta que recibirá el objeto JSON.
    router.get('/persons', function(req, res, next) {
        Person.find(function (err, persons) {
        if (err) return next(err);
        //res.json(persons)
        res.render('personsIndex', {persons}); //Renderizamos "personsIndex" para la ruta "persons".
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

    //Ruta GET para poder actualizar el registro o documento de una persona.
    router.get('/findById/:id', function(req, res, next) {
        /*Utilizamos el método findById para regresar una promesa 
        (puede ser error o poder encotrar el documento seleccionado.)*/
        Person.findById(req.params.id, function (err, person) {
            if (err) return next(err);
            res.render('personUpdate', {person});   //Renderizamos "personUpdate" para la ruta "persons"   
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

    /*Esta ruta POST se encargará de actualizar el documento seleccionado por la ruta GET
    que contiene findById, además de que contendrá los datos enviados en el formulario.*/
    router.post('/updatePerson', function(req, res, next) {
        /*El método findByIdAndUpdate recibe dos parámetros (el ID del documento a actualizar y 
        el/los nuevo(s) valor(es)).*/
        Person.findByIdAndUpdate(req.body.objId, {
            nombre: req.body.nombre,
            edad: req.body.edad,
            tipoSangre: req.body.tipoSangre,
            nss: req.body.nss }, function(err, post) {
        if (err) return next(err);
        res.redirect('/persons');
        });
    });

// Exportando el módulo.
module.exports = router; 