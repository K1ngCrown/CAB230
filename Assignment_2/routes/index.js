var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/*
router.post("/api/update", function (req, res) {
  if (!req.body || !req.body || !req.body) {
    res.status(400).json({ Message: "Error" })
    return
}

const filter = {
  Name: req.body.City,
  CountryCode: req.body.CountryCode
}
const pop = { Population: req.body}


req.body  
  .from("city")
  .where

})
*/

module.exports = router;
