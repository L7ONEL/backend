const express = require('express');
const router = express.Router();

router.get("/", function(req, res, next){
    res.send("API PERSONAS")
});

router.get('/123', function(req, res, next){
    res.send("Ruta de 123");
});

router.get('/:id', function(req, res, next){
    res.send(`Ruta de persona id ${req.params.id}`);
});

router.get('/test', function(req, res, next){
    res.send(`Test`);
});

module.exports = router;