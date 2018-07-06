var mongoose = require('mongoose');

var particulierController = {};
var particulier = require ("../models/particulier"); 

particulierController.list = function(req, res) {
    User.find({}).exec(function(err, user){
        if(err){
            console.log('Error : ', err);
        }else{
            //console.log("->",produit);
            res.render("../views/users/index",{user:user} );
        } 
    });
  };
  
  // Créer un login
  particulierController.create = function(req, res){
    res.render("../views/users/profile");
  }; 
  
  particulierController.save = function (req, res) {
    if (req.body.username &&
      req.body.password &&
      req.body.passwordConfirmation) {
  
      var user = new User(req.body);
      user.save(function (err) {
        if (err) {
          console.log(err);
          res.render("../views/users/profile");
        } else {
          console.log("login OK");
          res.redirect("/profiles");
        }
      });
    };
  }

//export du module
module.exports = particulierController;