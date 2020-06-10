const express = require('express');
const router = express.Router();
var mysql = require('mysql');
var jwt = require('jsonwebtoken');

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
    console.log("authorise");
    const authorization = req.headers.authorization
    let token = null;

    // retrieve token
    if (authorization && authorization.split(" ").length === 2) {
        token = authorization.split(" ")[1]
        console.log("Token: ", token)
    } else {
        res.status(403).json({ error: true, message: "Authorization header not found" }) 
        return;
    }

    try {
        console.log("In try block");
        const secretKey = "secret key";
        const decoded = jwt.verify(token, secretKey)
        
        if (decoded.exp < Date.now()) {
            console.log("Token has expired")
            return;
        }
        next()
    } catch (error) {
        console.log("In catch block")
        console.log("Token is not valid: ", error)
        return;
    }
}

router.get("/authed/:symbols", authorize, function (req, res) {
    const { from, to } = req.query;
    const { begin, until } = req.query;
    if (begin != undefined || until != undefined) {
        res.status(400).json({ error: true, message: "Parameters allowed are 'from' and 'to', example: /stocks/authed/AAL?from=2020-03-15" })
        return;
    }  

    const stockSymbol = req.params.symbols;

    req.db.from('stocks').select('*').where("symbol", stockSymbol).modify((query) => {
        if (from) {
            query.where('timestamp', ">=", new Date(from))
        }
        if (to){
            query.where('timestamp', "<=", new Date(to))
        }
        if(!from && !to){
            query.limit(1); 
        }
    }) 
        .then((rows) => {
            if (rows.length === 0) {
                res.status(404).json({ error: true, message: "No entries available for query symbol for supplied date range" })
            } else if (rows.length === 1) {
                res.status(200).json(rows[0])
            } else {
                res.status(200).json(rows) 
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({ error: true, message: "Error in MySQL query" })
        })
});





module.exports = router;