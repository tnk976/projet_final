var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Utilisateur = require("../models/users");


var usersController = {};

// Renvoit à la page d'accueil cuisiniers
usersController.indexCuisinier = function (req, res) {
    res.render("../views/cuisinier/index", {session: req.session });
};


// Renvoit à la page d'accueil particuliers
usersController.indexParticulier = function (req, res) {
    if (req.session.type === "Particulier") {
        res.render("../views/utilisateurs/index", { session: req.session });
    };
}

// Liste des utilisateurs inscrits 
usersController.list = function (req, res) {
    Utilisateur.find({}).exec(function (err, utilisateur) {
        if (err) {
            console.log('Error : ', err);
        } else {
            res.render("../views/utilisateurs/liste", { utilisateur: utilisateur });
        }
    });
};


// Renvoit à la page d'inscription
usersController.create = function (req, res) {
    res.render("../views/utilisateurs/inscription");
};


// Enregistrer un utilisateur et le connecter
usersController.save = function (req, res) {
    if (req.body.nom &&
        req.body.prenom &&
        req.body.email &&
        req.body.password &&
        req.body.passwordConfirmation) {

        var user = new Utilisateur(req.body);
        user.save(function (err, user) {
            if (err) {
                res.redirect('/utilisateurs/index');
            }
            else {
                req.session.userId = user._id;
                req.session.nom = user.nom;
                req.session.prenom = user.prenom;
                req.session.type = user.type;
                req.session.Email = user.email;
                req.session.success = 'Inscription Reussie';
                if (req.session.type === "Particulier") {
                    res.render("../views/utilisateurs/index", { user: user, session: req.session });
                }
                else { res.render("../views/cuisinier/index", { user: user, session: req.session }); }
            }
        });
    };
}

// Renvoit à la page de connexion
usersController.login = function (req, res) {
    res.render("../views/utilisateurs/connexion");
};



// fonction pour se connecter
usersController.auth = function (req, res) {
    var email = req.body.Email;
    var password = req.body.Password;

    Utilisateur.findOne({ email: email }).exec(function (err, user) {
        if (!err && user) {
            bcrypt.compare(password, user.password, function (err, result) {
                console.log(result);
                if (result === true) {

                    req.session.userId = user._id;
                    req.session.nom = user.nom;
                    req.session.prenom = user.prenom;
                    req.session.type = user.type;
                    req.session.Email = user.email;
                    req.session.success = 'Connexion Reussie';
                    if (req.session.type === "Particulier") {
                        res.render("../views/utilisateurs/index", { user: user, session: req.session });
                    }
                    else { res.render("../views/cuisinier/index", { user: user, session: req.session }); }

                } else {
                    res.redirect('/utilisateurs/login');
                };
            })
        } else {
            console.log("error =>", err);
            return res.redirect('/utilisateurs/login');
        }
    })
};



// déconnection
usersController.logout = function (req, res) {

    if (req.session) {
        // supprimer la session
        console.log(req.session);
        req.session.destroy(function (err) {
            if (!err) {
                res.redirect('/')
            } else {
                console.log("error => ", err);
            }
        })
    }
};

//export du module
module.exports = usersController;