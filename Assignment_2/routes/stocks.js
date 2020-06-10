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
        res.status(400).json({ error: true, message: "Invalid query parameter: only 'industry' is permitted" })
        return;
    }

    req.db.from('stocks').distinct('name', 'symbol', 'industry').modify((query) => {
        if (industry) {
            query.where('industry', 'LIKE', "%" + industry + "%")
        }
    })
        .then((rows) => {
            if (rows.length == 0) {
                res.status(404).json({ error: true, message: "Industry sector not found" })
            } else {
                res.status(200).json(rows)
            }

        })

});


router.get('/:symbols', (req, res) => {
    const { from, to } = req.query;
    if (from != undefined | to != undefined) {
        res.status(400).json({ error: true, message: "Date parameters only available on authenticated route /stocks/authed" })
        return;
    }

    const stockSymbol = req.params.symbols;

    req.db.from('stocks').distinct('*').where("symbol", stockSymbol)
        .then((rows) => {
            if (rows.length !== 0) {
                res.status(200).json(rows[0])
            } else {
                res.status(404).json({ error: true, message: "No entry for symbol in stocks database" })
            }

        })
        .catch((err) => {
            console.log(err);
            res.json({ error: true, message: "Error in MySQL query" })
        })

});



const authorize = (req, res, next) => {
    const authorization = req.headers.authorization
    let token = null;

    // retrieve token
    if (authorization && authorization.split(" ").length === 2) {
        token = authorization.split(" ")[1]
        console.log("Token: ", token)
        
    } else {
        console.log("Unauthorized user")
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey)

        if (decoded.exp < Date.now()) {
            console.log("Token has expired")
            
            return
        }

        next()
    } catch (e) {
        console.log("Token is not valid: ", err)
        return;
    }
}

router.post("/stocks/authed:symbols", authorize, function (req, res) {
    const { from, to } = req.query;
    if (from != undefined | to != undefined) {
        res.status(400).json({ error: true, message: "Bad Request" })
        return;
    }

    const stockSymbol = req.params.symbols;

    req.db.from('stocks').distinct('*').where("symbol", stockSymbol)
        .then((rows) => {
            if (rows.length !== 0) {
                res.status(200).json(rows[0])
            } else {
                res.status(404).json({ error: true, message: "No entry for symbol in stocks database" })
            }

        })
        .catch((err) => {
            console.log(err);
            res.json({ error: true, message: "Error in MySQL query" })
        })
})


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