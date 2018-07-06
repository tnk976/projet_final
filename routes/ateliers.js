var express = require('express');
var router = express.Router();
var atelier = require("../controllers/ateliersController");

//recuperer la liste des utilisateurs
router.get("/", atelier.list);

//accéder à la page d'inscription
router.get("/ajoutatelier", atelier.create);

//Créer un utilisateur / cuisinier
router.post("/save", atelier.save);


//export du module router
module.exports = router;


