var express = require('express');
var router = express.Router();
var cuisinier = require("../controllers/cuisiniersController");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/cuisiniers/ajoutuser');
    }
};

// page d'accueil pour les cuisiniers une fois connectés
router.get("/", cuisinier.index);

//recuperer la liste des utilisateurs
router.get("/liste", requireLogin, cuisinier.list);

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


