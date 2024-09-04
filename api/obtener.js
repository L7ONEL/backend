const express = require('express');
const router = express.Router();
const { conexion } = require('../db/conexion');

router.get("/", function(req, res, next){

    const { marca_id } = req.query;

    const sql = "SELECT * FROM auto AS a INNER JOIN marca AS m ON a.marca_id = m.id WHERE marca_id = ?";

    conexion.query(sql, [marca_id], function(error, result){
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

module.exports = router;