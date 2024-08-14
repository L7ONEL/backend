const express = require('express');
const personasRouter = require('./api/personas')

const app = express();

const port = 3000;

app.get("/", function(req, res, next){
    res.send("App express")
})

app.get("/a", function(req, res, next){
    res.send("otra ruta")
})

app.get("/test", function(req, res, next){
    res.send("Test")
})

app.get("/test2", function(req, res, next){
    res.send("Test 2")
})

app.use('/api/personas', personasRouter);

app.listen(port, () => {
    console.log(`Ejecutando servidor ${port}`);
})