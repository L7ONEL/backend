const router = require('express').Router();
const {verificarToken} = require('@damianegreco/hashpass');
const TOKEN_SECRET = "46334386";

const personasRouter = require('./personas')
const marcaRouter = require('./marca')
const autoRouter = require('./auto')
const obtenerRouter = require('./obtener')
const usuariosRouter = require('./usuarios')

router.use('/usuarios', usuariosRouter);

router.use('/personas', function(req, res, next){
    const token = req.headers.authorization;
    if (token === undefined || token == null){
        console.log('Sin token');
        res.status(403).json({status: 'error', error: 'Sin token'});
    } else {
        const verificacionToken = verificarToken(token, TOKEN_SECRET);
        if (verificacionToken?.data?.usuario_id !== undefined) {
            next();
        } else {
            console.log(verificacionToken);
            res.json({status: 'error', error: 'Token incorrecto'})
        }
    }
})

router.use('/personas', personasRouter);

router.use('/marca', marcaRouter);

router.use('/auto', autoRouter);

router.use('/obtener', obtenerRouter);

module.exports = router;