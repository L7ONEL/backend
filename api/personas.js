const express = require('express');
const router = express.Router();
const { conexion } = require('../db/conexion');

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

RELACIONES

TABLA A: id, nombre, ..., B_id
TABLA B: id, descripcion, ...

SELECT A.*, B.descripcion,
    FROM A
    INNER JOIN B ON A.B_id = B.id
    WHERE A.id = 5

*/

router.get('/123', function(req, res, next){
    res.send("Ruta de 123");
});

router.get('/:id', function(req, res, next){
    //OBTENER UNA PERSONA X ID
    res.send(`Ruta de persona id ${req.params.id}`);
});

router.get("/", function(req, res, next){
    //OBTENER TODAS LAS PERSONAS

    // filtros: nombre, apellido
    const { nombre, apellido } = req.query;

    const sql = "SELECT * FROM personas";
    conexion.query(sql, function(error, result){
        if (error) {
            console.log(error);
            return res.send("Ocurrió un error");
        }
        
        res.json({
            status:"ok",
            personas: result
        })
    }); 
});

router.post("/", function(req, res, next){
    //GUARDAR 1 PERSONA (TODOS SUS DATOS)

    //datos de persona: documento, nombres, apellidos, direccion
    const { documento, nombres, apellidos, direccion, telefono } = req.body;
    
    const sql = `ÌNSERT INTO personas (documento, nombres, apellidos, domicilio, telefono) VALUES (?, ?, ?, ?, ?)`;

    conexion.query(sql, [documento, nombres, apellidos, direccion, telefono], function(error, result){
        if (error) {
            console.log(error);
            return res.send("Ocurrió un error");
        }

        res.json({status: "ok"});
    })
})

router.put("/", function(req, res, next){
    //ACTUALIZAR 1 PERSONA

    const { id } = req.query;
    const { documento, nombres, apellidos, domicilio, telefono } = req.body;
    
    const sql = "UPDATE personas SET documento = ?, nombres = ?, apellidos = ?, domicilio = ?, telefono = ? WHERE id = ?";

    conexion.query(sql, [documento, nombres, apellidos, domicilio, telefono, id], function(error, result){
        if (error) {
            console.log(error);
            return res.status(500).send("Ocurrió un error")
        }
        res.json({status: "ok"})
    })
})

router.delete("/", function(req, res, next){
    //ELIMINAR UNA PERSONA

    const { id } = req.query;
    
    const sql = "DELETE FROM personas WHERE id = ?";

    conexion.query(sql, [id], function(error, result){
        if (error) {
            console.log(error);
            return res.status(500).send("Ocurrió un error")
        }
        res.json({status: "ok"})
    })
})

module.exports = router;