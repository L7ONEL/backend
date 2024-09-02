const express = require('express');
const router = express.Router();
const { conexion } = require('../db/conexion');

router.get("/", function(req, res, next){

    const sql = "SELECT * FROM auto";
    conexion.query(sql, function(error, result){
        if (error) {
            console.log(error);
            return res.send("Ocurrió un error");
        }
        
        res.json({
            status:"ok",
            auto: result
        })
    });

});

router.post("/", function(req, res, next){

    const { nombre } = req.body;
    
    const sql = `ÌNSERT INTO auto (marca_id, patente, año_fabricacion, color) VALUES (?, ?, ?, ?)`;

    conexion.query(sql, [nombre], function(error, result){
        if (error) {
            console.log(error);
            return res.send("Ocurrió un error");
        }

        res.json({status: "ok"});
    })
});

router.put("/", function(req, res, next){

    const { id } = req.query;
    const { nombre } = req.body;
    
    const sql = "UPDATE auto SET marca_id = ?, patente = ?, año_fabricacion = ?, color = ? WHERE id = ?";

    conexion.query(sql, [nombre, id], function(error, result){
        if (error) {
            console.log(error);
            return res.status(500).send("Ocurrió un error")
        }
        res.json({status: "ok"})
    })
});

router.delete("/", function(req, res, next){

    const { id } = req.query;
    
    const sql = "DELETE FROM auto WHERE id = ?";

    conexion.query(sql, [id], function(error, result){
        if (error) {
            console.log(error);
            return res.status(500).send("Ocurrió un error")
        }
        res.json({status: "ok"})
    })
})

module.exports = router;