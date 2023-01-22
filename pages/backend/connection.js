const mysql = require('mysql');
const database = "proyecto";

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
        return;
    }
});

module.exports = connection;