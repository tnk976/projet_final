var Atelier = require("../models/ateliers");
var mongoose = require('mongoose');

var atelierController = {};


// Lister les ateliers (pour tous les utilisateurs)
atelierController.list = function (req, res) {
    Atelier.find({}).exec(function (err, atelier) {
        if (err) {
            console.log('Error : ', err);
        }else{
            res.render("../views/ateliers/liste",{atelier:atelier,session:req.session} );
        } 
    });
};

// Liste des ateliers (pour les cuisiniers)
atelierController.listadmin = function (req, res) {
    Atelier.find({}).exec(function (err, atelier) {
        if (err) {
            console.log('Error : ', err);
        } else {
            res.render("../views/ateliers/liste-admin", { atelier: atelier, session: req.session });
        }
    });
};


// Renvoit à la page d'ajout d'un atelier (pour les cuisiniers)
atelierController.create = function (req, res) {
    res.render("../views/ateliers/ajouter", { session: req.session });
};

// Enregistrer un atelier (pour les cuisiniers) 
atelierController.save = function (req, res) {
    var chef = req.session.nom;
    var atelier = new Atelier(req.body);
    if (req.body.active === "on") {
        atelier.active = true;
    } else {
        atelier.active = false;
    };

    if (req.body.chef === "on") {
        atelier.chef = req.session.nom;
    }

    atelier.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/ateliers/ajouter");
        } else {
            console.log("creation atelier OK");
            res.redirect("/ateliers/ateliers-admin");
        }
    });
};


//edition d'un atelier par son id (pour les cuisiniers)

atelierController.edit = function (req, res) {
    var atelier = new Atelier(req.body);

    Atelier.findOne({ _id: req.params.id }).exec(function (err, atelier) {
        if (err) {
            console.log("Error ", err);
        } else {
            res.render("../views/ateliers/modifier", { atelier: atelier });
        }
    });
};

//   Modifier un atelier (pour les cuisiniers)
atelierController.update = function (req, res) {
    if (req.body.active == undefined) {
        req.body.active = false;
    } else {
        req.body.active = true;
    }

    Atelier.findByIdAndUpdate(req.params.id, { $set: { titre: req.body.titre, contenu: req.body.contenu, date: req.body.date, horaire_debut: req.body.horaire_debut, duree: req.body.duree, places_dispo: req.body.places_dispo, places_reservees: req.body.places_reservees, prix: req.body.prix, image: req.body.image, active: req.body.active } }, { new: true }, function (err, atelier) {

        if (err) {
            console.log(err);
            res.render("../views/ateliers/modifier", { atelier: req.body });
        }
        res.redirect("/ateliers/ateliers-admin");

    });
};


//   Modifier les places disponibles d'un atelier lors d'une réservation
atelierController.updateplacedispo = function (req, res) {

    Atelier.findOne({ _id: req.params.id }).exec(function (err, atelier) {
        var places_reservees = atelier.places_reservees;
        if (places_reservees < atelier.places_dispo && places_reservees >= 0) {
            places_reservees = atelier.places_reservees + 1;
        }
        Atelier.findByIdAndUpdate(atelier.id, { $set: { places_reservees: places_reservees } }, { new: true }, function (err, atelier) {

            if (err) {
                console.log(err);
            }
        });
    });
};


atelierController.replaceplacedispo = function (reservations, res) {
    Atelier.findOne({ _id: reservations.id_atelier }).exec(function (err, atelier) {

        var places_reservees = atelier.places_reservees;
        if (places_reservees <= atelier.places_dispo && places_reservees >= 0) {
            places_reservees = atelier.places_reservees - 1;
        }
        Atelier.findByIdAndUpdate(atelier.id, { $set: { places_reservees: places_reservees } }, { new: true }, function (err, atelier) {
            if (err) {
                console.log(err);
            }
        });
    });
};


//suppression d'un atelier (pour les cuisiniers)
atelierController.remove = function (req, res) {
    Atelier.findByIdAndRemove(req.params.id, function (err, atelier) {

        if (err) {
            console.log(err);

        }
        res.redirect("/ateliers/ateliers-admin");

    });
};


// Lister les ateliers vers atelierliste ejs
// atelierController.selectatelier = function (req, res) {
//     Atelier.find({}).exec(function (err, atelier) {
//         if (err) {
//             console.log('Error : ', err);
//         } else {
//             res.render("../views/ateliers/selectatelier", { atelier: atelier });
//         }
//     });
// };


//   Modifier un atelier
// atelierController.updateplace = function (req, res) {

//     Atelier.findOne({ _id: req.params.id }).exec(function (err, atelier) {
//         var places_reservees = atelier.places_reservees + 1;
//         var places_dispo = atelier.places_dispo - 1
//         Atelier.findByIdAndUpdate(atelier.id, { $set: { places_reservees: places_reservees, places_dispo: places_dispo } }, { new: true }, function (err, atelier) {

//             if (err) {
//                 console.log(err);
//                 res.render("../views/ateliers/modifier", { atelier: req.body });
//             }
//             res.redirect("/ateliers/ateliers-admin");
//         });
//     });
// };

//export du module
module.exports = atelierController;