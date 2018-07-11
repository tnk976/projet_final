var express = require('express');
var router = express.Router();
var atelier = require("../controllers/ateliersController");

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/utilisateurs/login');
    }
};

//liste des ateliers
router.get("/", atelier.list);

// Liste des ateliers pour les cuisiniers
router.get("/ateliers-admin", requireLogin, atelier.listadmin);

//accéder à la page d'inscription
router.get("/ajoutatelier", requireLogin, atelier.create);

//Créer un atelier
router.post("/save", requireLogin, atelier.save);

//recuperer la liste des utilisateurs
router.get("/selectatelier", atelier.selectatelier);

// editer un atelier
router.get("/edit/:id", requireLogin, atelier.edit);

// Modifier un atelier  /!\ cest un POST 
router.post("/update/:id", requireLogin, atelier.update);

// Modifier un atelier  /!\ cest un POST 
router.post("/updateplace/:id", requireLogin, atelier.updateplace);

// supprimer un atelier
router.get("/remove/:id", requireLogin, atelier.remove);


//export du module router
module.exports = router;


