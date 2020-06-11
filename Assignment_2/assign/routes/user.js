var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
  res.render('index', { title: 'Hello' });
});

// Register a user
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
      return;
    })
})

//Log in a user
router.post("/login", function (req, res, next) {
  //retrieve email and password
  const email = req.body.email;
  const password = req.body.password;

  //verify body
  if (!email || !password) {
    res.status(400).json({ error: true, message: "Request body invalid - email and password are required" })
    return;
  }

  //Check if user is already in the table
  const queryUsers = req.db.from("users").select("*").where("email", "=", email)
  queryUsers
    .then((users) => {
      if (users.length <= 0) {
        console.log("User does not exist")
        res.status(401).json({ error: true, message: "Incorrect email or password" })
        return;
      }

      console.log("User exists in table")
      //compare password hashes
      const user = users[0]
      return bcrypt.compare(password, user.hash)

    })
    .then((match) => {
      if (!match) {
        console.log("Passwords do not match");
        res.status(401).json({ error: true, message: "Incorrect email or password" })
        return;
      }

      
      console.log("Passwords match")
      //create and return JWT token
      const secretKey = "secret key";
      const expires_in = 86400; 
      const exp = Date.now() + expires_in * 1000;
      const token = jwt.sign({ email, exp }, secretKey);
      res.status(200).json({token_type:"Bearer", expires_in: expires_in, token: token});
      return;
    })
})

module.exports = router;
