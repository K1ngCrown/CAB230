const express = require('express');
const router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Alinsolorin1'
});

//uses webcomputing schema
connection.query('USE webcomputing');


//endpoints for stocks
router.get('/symbols', (req, res) => {
    /*
    if (req.method !== 'GET'){
        res.send(405).send({
            success:false,
            message:'method not found'
        });
    }
    
*/
    connection.query('SELECT * FROM webcomputing.stocks',function(err, result, fields) {
        if (err) {
            return res.status(500).send({
                success: false,
                message: 'Did not get stocks'
                });
        } 
        res.status(200).send({success:true});
        
    }); 
});



router.get('/:stock', (req, res) => {
    const stockSymbol = req.params.stock;
    if (stockSymbol) { 
        return res.status(200).send({
            success:true,
            stock:stockSymbol
        });
    }
    return res.status(500). send({success:false});
});
/*
router.get('/symbols', function(req, res, next) {
    res.send('respond with a resource');
  });
*/

//Stock end point authorised
router.get('/authed:stock', (req,res) =>
{
    const stockSymbol = req.params.stock;
    if (stockSymbol) { 
        return res.status(200).send({
            success:true,
            stock:stockSymbol
        });
    }
    return res.status(500). send({success:false});
});

module.exports = router;