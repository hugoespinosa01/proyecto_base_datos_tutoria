const express = require("express");
const {engine} = require("express-handlebars");
const connection = require("express-myconnection");
const bodyParser = require("body-parser");
const mysql = require("mysql");

//Declaro la constante de conexion
const app = express();
app.set('port', process.env.PORT || 3000);


//Configuro la conexión
app.use(connection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'equipos'
}));





//Escucho el puerto
app.listen(app.get('port'), () => {
    console.log("Escuchando en el puerto: ", app.get('port'));
});


