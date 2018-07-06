var mongoose = require('mongoose');

var particulierController = {};
var Particulier = require ("../models/particulier");

particulierController.list = function(req, res) {
    Particulier.find({}).exec(function(err, particulier){
        if(err){
            console.log('Error : ', err);
        }else{
            //console.log("->",produit);
            res.render("../views/particulier/liste",{particulier:particulier} );
        } 
    });
  };
  
  // Créer un login
  particulierController.create = function(req, res){
    res.render("../views/particulier/inscription");
  }; 
  
  particulierController.save = function (req, res) {
      console.log(req.body.nom)
      console.log(req.body.password)
    if (req.body.nom &&
      req.body.password &&
      req.body.passwordConfirmation) {
  
      var particuliers = new Particulier(req.body);
      particuliers.save(function (err) {
        if (err) {
          console.log(err);
          res.render("../views/particulier/inscription");
        } else {
          console.log("login OK");
          res.redirect("../views/particulier/inscription");
        }
      });
    };
  }

//export du module
module.exports = particulierController;