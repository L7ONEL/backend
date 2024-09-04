const express = require('express');
const apiRouter = require('./api/main')

const app = express();

const port = 3000;

app.use(express.json());

app.get("/", function(req, res, next){
    res.send("App express")
})

app.get("/a", function(req, res, next){
    res.send("otra ruta")
})

app.use('/api', apiRouter);

app.listen(port, () => {
    console.log(`Ejecutando servidor ${port}`);
})