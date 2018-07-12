var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var reservationController = {};
var Reservation = require("../models/reservation");
var Atelier = require("../models/ateliers");
var Particulier = require("../models/users");



// Créer formulaire inscription
//  reservationController.create = function(req, res){
//     res.render("../views/reservation/reservation", {session:req.session});
//   }; 

//   reservationController.save = function (req, res) {
// req.body contient les var post
//   var reservations = new Reservation(req.body);
//   reservations.save(function (err) {
//     if (err) {
//       console.log(err);
//       res.render("../views/reservation/reservation");
//     } else {
//       console.log("login OK");
//       res.redirect("/reservations");
//     }
//   });
// };

reservationController.list = function (req, res) {
  Reservation.find({})
    .populate("id_particulier")
    .populate("id_atelier")
    .exec(function (err, reservations) {
      if (err) {
        console.log('Error : ', err);
      } else {

        console.log(reservations);
        // res.redirect("/reservations/liste");

        res.render("../views/utilisateurs/listedescours", { reservation: reservations, session: req.session });
      }
    });
};

// Valider une réservation d'atelier
reservationController.valider = function (req, res) {
  var reservations = new Reservation();
  reservations.id_particulier = req.session.userId;
  // console.log(req.session);
  reservations.id_atelier = req.params.id;
  reservations.save(function (err) {
    if (err) {
      console.log(err);
      res.render("../views/atelier/liste");
    } else {
      console.log("login OK");
      res.redirect("/reservations/liste");
    }
  });
};

//suppression d'une réservation
reservationController.remove = function(req, res){
  Reservation.findByIdAndRemove(req.params.id, function (err, reservations){

      if (err){
          console.log(err);
          
      } 
      res.redirect("/reservations/liste");
      
  });
};



//export du module
module.exports = reservationController;