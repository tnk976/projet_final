var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var reservationController = {};
var Reservation = require ("../models/reservation");

 // Créer formulaire inscription
 reservationController.create = function(req, res){
    res.render("../views/reservation/reservation", {session:req.session.userId});
  }; 
  
  reservationController.save = function (req, res) {
      console.log('=====>' + req.body)
      var reservations = new Reservation(req.body);
      reservations.save(function (err) {
        if (err) {
          console.log(err);
          res.render("../views/reservation/reservation");
        } else {
          console.log("login OK");
          res.redirect("../views/reservation/reservation");
        }
      });
    };
  




//export du module
module.exports = reservationController;