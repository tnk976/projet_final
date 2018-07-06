var express = require('express');
var router = express.Router();
var cuisinier = require("../controllers/cuisiniersController");

//recuperer la liste des utilisateurs
router.get("/", cuisinier.list);

//accéder à la page d'inscription
router.get("/ajoutuser", cuisinier.create);

//Créer un utilisateur / cuisinier
router.post("/save", cuisinier.save);

// Accéder à la page de connexion
router.get("/login", cuisinier.login);

// Se connecter
router.post('/auth', cuisinier.auth);

// Se déconnecter
router.get('/logout', cuisinier.logout);


//export du module router
module.exports = router;


