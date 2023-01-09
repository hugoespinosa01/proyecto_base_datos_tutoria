const express = require('express');
const router = express.Router();
const connection = require('./connection');


router.get('/practica', (req, res) => {
    connection.query('SELECT * FROM practica', (error, results) => {
        if (error){
            throw error
        }else{
            res.send(results);
        }
    })
});

router.get('/hello', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;