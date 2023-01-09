const express = require('express');
const router = express.Router();
const connection = require('./connection');


router.get('/equipos', (req, res) => {
    connection.query('SELECT * FROM equipos', (error, results) => {
        if (error){
            throw error
        }else{
            res.send(results);
        }
    })
});

module.exports = router;