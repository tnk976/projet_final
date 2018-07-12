var express = require('express');
var router = express.Router();
var reservation = require("../controllers/reservationController");
var user = require("../controllers/usersController")

function requireLogin (req, res, next) {
    if (req.session && req.session.userId) {
        next();
    }else {
        var err = new Error('error 404');
        err.status = 401;
        res.redirect('/utilisateurs/login');
    }
};

// lien vers page reservation
// router.get("/", requireLogin, reservation.create);

//creer une reservation
// router.post("/save", requireLogin, reservation.save);

//creer une liste
router.get("/liste", requireLogin, reservation.list);

// Réserver un atelier
router.get("/valider/:id", requireLogin, reservation.valider);

// supprimer une réservation
router.get("/remove/:id", requireLogin, reservation.remove);


//export du module router
module.exports = router;

