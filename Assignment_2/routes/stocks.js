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
    const { name, industry } = req.query;
    if (name) {
        res.status(400).json({ "error": true, "message": "Invalid query parameter: only 'industry' is permitted" })
        return;
    }

    /*
    if (req.method !== 'GET'){
        res.send(405).send({
            success:false,
            message:'method not found'
        });
    } 
    */

    req.db.from('stocks').distinct('name', 'symbol', 'industry').modify((query) => {
        if (industry) {
            query.where('industry', '=', industry)
        }
    })
        .then((rows) => {
            if (rows.length == 0) {
                res.status(404).json({ "error": true, "message": "Industry sector not found" })
            } else {
                res.status(200).json(rows)
            }

        })
    // connection.query(`SELECT * FROM webcomputing.stocks`,function(err, result) {
    //     if (err) {
    //         return res.status(500).send({
    //             success: false,
    //             message: 'Did not get stocks'
    //             });
    //     } 
    //     res.status(200).send(result);
    // }); 
});


router.get('/:symbols', (req, res) => {
    const { from, to } = req.query;
    if (from != undefined | to != undefined) {
        res.status(400).json({ "error": true, "message": "Bad Request" })
        return;
    }

    const stockSymbol = req.params.symbols;

    req.db.from('stocks').distinct('*').where("symbol", stockSymbol)
        .then((rows) => {
            if (rows !== 0) {
                res.status(200).json(rows[0])
            } else {
                res.status(404).json({ "error": true, "message": "No entry for symbol in stocks database" })
            }

        })
        .catch((err) => {
            console.log(err);
            res.json({ "Error": true, "Message": "Error in MySQL query" })
        })

});


/*
//Stock end point authorised
router.get('/authed:stock', (req, res) => {
    const stockSymbol = req.params.stock;
    if (stockSymbol) {
        return res.status(200).send({
            success: true,
            stock: stockSymbol
        });
    }
    return res.status(500).send({ success: false });
});
*/
module.exports = router;