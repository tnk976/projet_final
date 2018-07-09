var express = require('express');
var router = express.Router();
var atelier = require("../controllers/ateliersController");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/cuisiniers/login');
    }
};

//recuperer la liste des utilisateurs
router.get("/", atelier.list);

//accéder à la page d'inscription
router.get("/ajoutatelier", requireLogin, atelier.create);

//Créer un utilisateur / cuisinier
router.post("/save", requireLogin, atelier.save);


//export du module router
module.exports = router;


