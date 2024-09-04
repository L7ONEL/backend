const router = require('express').Router();

const personasRouter = require('./personas')
const marcaRouter = require('./marca')
const autoRouter = require('./auto')
const obtenerRouter = require('./obtener')
const usuariosRouter = require('./usuarios')

router.use('/personas', personasRouter);

router.use('/marca', marcaRouter);

router.use('/auto', autoRouter);

router.use('/obtener', obtenerRouter);

router.use('/usuarios', usuariosRouter);

module.exports = router;