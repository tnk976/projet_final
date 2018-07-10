var Atelier = require ("../models/ateliers");
var mongoose = require('mongoose');

var atelierController = {};


// Lister les ateliers
atelierController.list = function(req, res) {
    Atelier.find({}).exec(function(err, atelier){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/ateliers/liste",{atelier:atelier} );
        } 
    });
  };


// Lister les ateliers vers atelierliste ejs
atelierController.atelierlist = function(req, res) {
    Atelier.find({}).exec(function(err, atelier){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/ateliers/atelierliste",{atelier:atelier} );
        } 
    });
  };


// Renvoit à la page d'ajout d'un atelier
atelierController.create = function (req, res) {
    res.render("../views/ateliers/ajouter");
  };

// Enregistrer un atelier  
atelierController.save = function(req, res){
    var atelier = new Atelier(req.body);
     
    atelier.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/ateliers/ajouter");
        } else{
            console.log("creation atelier OK");
            res.redirect("/ateliers" );
        } 
    });
  };


  //export du module
module.exports = atelierController;