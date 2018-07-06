var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
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
  
  // Créer formulaire inscription
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
// connection
  particulierController.auth = function (req, res) {
    var Email = req.body.Email;
    var password = req.body.password;
  
    Particulier.findOne({ email: Email }).exec(function (err, user) {
      if (!err && user) {
        bcrypt.compare(password, user.password, function (err, result) {
          console.log(result);
          if (result === true) {
            req.session.userId = user._id;
            req.session.Email = user.email;
            req.session.success = 'Connexion Reussie';
            res.redirect('/particuliers/liste');
          }else {
          //console.log(req.session.userName);
          res.redirect('/particuliers/liste');
          };
        })
    } else {
        console.log("error =>", err);
        return res.redirect('/particuliers');
      }
    })
  };

  // déconnection
  particulierController.logout = function(req, res){
  
    if (req.session){
        // supprimer la session
        console.log(req.session);
        req.session.destroy(function(err){
            if(!err){
                res.redirect('/particuliers')
            }else {
                console.log("error => ", err);
            }
        })
    }
  };

//export du module
module.exports = particulierController;