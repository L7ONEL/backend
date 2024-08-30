const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: "ctpoba.edu.ar",
    user: "ardussol",
    password: "46334386",
    database: "24_72_ardussol"
});

conexion.connect(function(error){
    if (error) {
        console.error(error);
        return;
    }

    console.log("Conectado exitosamente a la base de datos");
})

module.exports = { conexion }