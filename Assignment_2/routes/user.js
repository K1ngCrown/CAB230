var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  res.render('index', { title: 'Hello' });
});


router.post("/register", function (req, res, next) {
  //Retrieving email and password
  const email = req.body.email;
  const password = req.body.password;

  //verify body
  if (!email || !password) {
    res.status(400).json({ error: true, message: "Request body incomplete - email and password needed" })
    return;
  }

  //finding if user already exists
  const queryUsers = req.db.from("users").select("*").where("email", "=", email)
  queryUsers
    .then((users) => {
      if (users.length > 0) {
        console.log("User already exists");
        res.status(409).json({ error: true, message: "User already exists!" })
        return;
      }

      console.log("No matching users");
      //insert a user into database
      const saltRounds = 10
      const hash = bcrypt.hashSync(password, saltRounds)
      return req.db.from("users").insert({ email, hash })

    })
    .then(() => {
      console.log("Successfully inserted user")
      res.status(201).json({ success: true, message: "User created" })
    })

})

module.exports = router;
