var mongoose = require('mongoose');
var cuisinierController = {};
var Cuisinier = require ("../models/cuisinier"); 


cuisinierController.list = function(req, res) {
    Cuisinier.find({}).exec(function(err, user){
      if(err){
          console.log('Error : ', err);
      }else{
          //console.log("->",produit);
          res.render("../views/cuisinier/index",{user:user} );
      } 
  });
};

// Créer un login
cuisinierController.create = function(req, res){
  res.render("../views/cuisinier/index");
}; 

cuisinierController.save = function (req, res) {
  if (req.body.username &&
    req.body.password &&
    req.body.passwordConfirmation) {

    var user = new Cuisinier(req.body);
    user.save(function (err) {
      if (err) {
        console.log(err);
        res.render("../views/cuisinier/index");
      } else {
        console.log("login OK");
        res.redirect("/cuisiniers");
      }
    });
  };
}


//export du module
module.exports = cuisinierController;