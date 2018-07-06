var mongoose = require('mongoose');
var Cuisinier = require ("../models/cuisinier"); 
var bcrypt = require('bcrypt');

var cuisinierController = {};

// Liste des cuisiniers inscrits
cuisinierController.list = function(req, res) {
    Cuisinier.find({}).exec(function(err, cuisinier){
      if(err){
          console.log('Error : ', err);
      }else{
          res.render("../views/cuisinier/liste",{cuisinier:cuisinier} );
      } 
  });
};

// Enregistrer un cuisinier
cuisinierController.create = function (req, res) {
    res.render("../views/cuisinier/inscription");
  };

  
cuisinierController.save = function (req, res) {
  if (req.body.nom &&
    req.body.prenom &&
    req.body.email &&
    req.body.password &&
    req.body.passwordConfirmation) {

    var user = new Cuisinier(req.body);
    user.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/cuisinier/inscription");
      } else {
        console.log("login OK");
        res.redirect("/cuisiniers");
      }
    });
  };
}


//export du module
module.exports = cuisinierController;