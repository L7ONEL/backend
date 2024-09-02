const express = require('express');
const personasRouter = require('./api/personas')
const marcaRouter = require('./api/marca')
const autoRouter = require('./api/auto')
const obtenerRouter = require('./api/obtener')

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", function(req, res, next){
    res.send("App express")
})

app.get("/a", function(req, res, next){
    res.send("otra ruta")
})

app.use('/api/personas', personasRouter);

app.use('/api/marca', marcaRouter);

app.use('/api/auto', autoRouter);

app.use('/api/obtener', obtenerRouter);

app.listen(port, () => {
    console.log(`Ejecutando servidor ${port}`);
})