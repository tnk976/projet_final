var express = require('express');
var router = express.Router();
var cuisinier = require("../controllers/cuisiniersController");

//recuperer la liste des users
router.get("/", cuisinier.list);

//creer un login
router.get("/ajoutuser", cuisinier.create);

//creer un login
router.post("/save", cuisinier.save);

router.get("/login", cuisinier.login);

// Se connecter
router.post('/auth', cuisinier.auth);


//export du module router
module.exports = router;


