var express = require('express');
var router = express.Router();
var utilisateur = require("../controllers/usersController");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/utilisateurs/ajoutuser');
    }
};

// page d'accueil pour les utilisateurs une fois connectés
router.get("/", utilisateur.indexCuisinier);

//recuperer la liste des utilisateurs
router.get("/liste", utilisateur.list);

//recuperer la liste des utilisateurs
router.get("/listeutilisateur", utilisateur.listeutilisateur);

//lien vers la page de connection
router.get('/connecte',utilisateur.connecte)

//accéder à la page d'inscription
router.get("/ajoutuser", utilisateur.create);

//Créer un utilisateur 
router.post("/save", utilisateur.save);

// Accéder à la page de connexion
router.get("/login", utilisateur.login);

// Se connecter
router.post('/auth', utilisateur.auth);

// Se déconnecter
router.get('/logout', utilisateur.logout);


//export du module router
module.exports = router;


