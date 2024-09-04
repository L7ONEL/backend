const router = require('express').Router();
const {hashPass, verificarPass} = require('@damianegreco/hashpass');
const {conexion} = require('../db/conexion')

const checkUsuario = function(user){
    return new Promise((resolve, reject) => {
        const sql = "SELECT id FROM usuarios WHERE user = ?";
        conexion.query(sql, [user], function(error, result){
            if (error) return reject(error);
            if (result.length > 0) return reject("Usuario ya registrado.");
            return resolve();
        })
    })
}

const guardarUsuario = function(user, passHasheada) {
    return new Promise((resolve, reject) => {
        const sql = "INSERT INTO usuarios (user, pass) VALUES (?, ?) RETURNING id";
        conexion.query(sql, [user, passHasheada], function(error, result){
            if (error) return reject(error);
            resolve(result[0].id);
        })
    })
}

router.post('/', function(req, res, next){
    const {user, pass} = req.body;

    checkUsuario(user)
    .then(() => {
        const passHasheada = hashPass(pass);
        guardarUsuario(user, passHasheada)
        .then((usuario_id) => {
            res.json({status: 'ok', usuario_id});
        })
    })
    .catch((error) => {
        console.log(error);
        res.json({status: 'error', error});
    });
})

router.post('/login', function(req, res, next){
    const {user, pass} = req.body;

    res.json({status: "En proceso"});
})

module.exports = router