const express = require('express');
const router = express.Router();
const connection = require('./connection');


router.get('/proyecto', (req, res) => {
    connection.query('SELECT * FROM practica', (error, results) => {
        if (error){
            throw error
        }else{
            res.send(results);
        }
    })
});

module.exports = router;