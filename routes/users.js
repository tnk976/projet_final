var express = require('express');
var router = express.Router();
var utilisateur = require("../controllers/usersController");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/utilisateurs/login');
    }
};

// page d'accueil pour les utilisateurs une fois connectés
router.get("/", requireLogin, utilisateur.indexCuisinier);

//lien vers la page d'accueil une fois connecté
router.get('/index', requireLogin, utilisateur.indexParticulier)

//recuperer la liste des utilisateurs
router.get("/liste", utilisateur.list);

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


