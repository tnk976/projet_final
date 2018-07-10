var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var reservationController = {};
var Reservation = require ("../models/reservation");

 // Créer formulaire inscription
 reservationController.create = function(req, res){
    res.render("../views/reservation/reservation", {session:req.session});
  }; 
  
  reservationController.save = function (req, res) {
      var reservations = new Reservation(req.body);
      reservations.save(function (err) {
        if (err) {
          console.log(err);
          res.render("../views/reservation/reservation");
        } else {
          console.log("login OK");
          res.redirect("/reservations");
        }
      });
    };

    reservationController.list = function(req, res) {
      Reservation.find({})
      .populate("id_particulier")
      .populate("id_atelier")
      .exec(function(err, reservations){
          if(err){
              console.log('Error : ', err);
          }else{
            console.log("woooooooow=========="+ reservations)
              res.render("../views/utilisateurs/listedescours",{reservation:reservations, session:req.session} );
          } 
      });
    };
  


    



//export du module
module.exports = reservationController;