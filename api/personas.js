const express = require('express');
const router = express.Router();

/*
PARAMS
    - query     ?id=123&nombre=ejemplo
    - params    /123/ejemplo
    
BODY
    - body  { "id": 123, "nombre": "Ejemplo" }

        ACCIÓN      SQL     HTTP        DATOS
C  =>   CREATE     INSERT   POST        
R  =>   READ       SELECT   GET         PARAMS
U  =>   UPDATE     UPDATE   PUT
D  =>   DELETE     DELETE   DELETE

RECIBE    => req => query, params, body, headers
RESPUESTA => res => status, send, sendFile, json, download, render
*/

router.get("/", function(req, res, next){
    //OBTENER TODAS LAS PERSONAS

    const { edad, nombre, apellido } = req.query;

    console.log({edad, nombre, apellido});
    

    res.send("API PERSONAS")
});

router.get('/123', function(req, res, next){
    res.send("Ruta de 123");
});

router.get('/:id', function(req, res, next){
    //OBTENER UNA PERSONA X ID
    res.send(`Ruta de persona id ${req.params.id}`);
});

router.post("/", function(req, res, next){
    //GUARDAR 1 PERSONA (TODOS SUS DATOS)

    //datos de persona: documento, nombres, apellidos, direccion
    const { documento, nombres, apellidos, direccion } = req.body;

    console.log({documento, nombres, apellidos, direccion});

    res.json({
        status: "ok",
        id: 123
    })
    
})

router.put("/", function(req, res, next){
    //ACYUALIZAR 1 PERSONA

    const { id } = req.query;
    const { documento, nombres, apellidos, direccion } = req.body;

})

router.delete("/", function(req, res, next){
    //ELIMINAR UNA PERSONA

    const { id } = req.query;
})

module.exports = router;