const mysql = require('mysql');
const database = "practica";

//Creamos la conexión
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: database
});



//Nos conectamos
connection.connect((err) => {
    if(err){
        console.log("Error al conectar con la base de datos");
        return;
    }
    console.log('Conectado a la base de datos');
});

module.exports = connection;