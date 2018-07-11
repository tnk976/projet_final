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

// Liste des ateliers pour les cuisiniers
atelierController.list2 = function(req, res) {
    Atelier.find({}).exec(function(err, atelier){
        if(err){
            console.log('Error : ', err);
        }else{
            res.render("../views/ateliers/liste-admin",{atelier:atelier, session:req.session} );
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
    res.render("../views/ateliers/ajouter" , {session:req.session});
  };

// Enregistrer un atelier  
atelierController.save = function(req, res){
    var chef = req.session.nom ;
    var atelier = new Atelier(req.body);
    if(req.body.active === "on"){
        atelier.active = true;
    }else{
        atelier.active = false; 
    };

    if(req.body.chef === "on"){
        atelier.chef = req.session.nom;
    }
    
    atelier.save(function(err){
        if(err){
            console.log(err);
            res.render("../views/ateliers/ajouter");
        } else{
            console.log("creation atelier OK");
            res.redirect("/ateliers/ateliers-admin" );
        } 
    });
  };


//edition d'un atelier par son id

atelierController.edit = function(req, res){
    var atelier = new Atelier(req.body);

    Atelier.findOne({_id:req.params.id}).exec(function(err, atelier){
        if(err){
            console.log("Error ", err);
        } else{
            res.render("../views/ateliers/modifier",{atelier: atelier} );
        } 
    });
};

//   Modifier un atelier
  atelierController.update = function(req, res){
    if (req.body.active == undefined){
        req.body.active = false;
    }else{
        req.body.active = true;
    }
    console.log("ma place"+ req.body.places_reservees)
    
    Atelier.findByIdAndUpdate(req.params.id,{ $set :{titre: req.body.titre, contenu: req.body.contenu, date: req.body.date, horaire_debut: req.body.horaire_debut, duree: req.body.duree, places_dispo: req.body.places_dispo, places_reservees: req.body.places_reservees, prix: req.body.prix, image: req.body.image, active: req.body.active } },{new: true}, function (err, atelier){

        if (err){
            console.log(err);
            res.render("../views/ateliers/modifier",{atelier:req.body} );
        } 
        res.redirect("/ateliers/ateliers-admin");
       
    });
};


//   Modifier un atelier
atelierController.updateplace = function(req, res){
    
    console.log("ma place"+ req.body.places_reservees)
    Atelier.findOne({_id:req.params.id}).exec(function(err, atelier){
        var places_reservees = atelier.places_reservees+1;
        Atelier.findByIdAndUpdate(atelier.id,{ $set :{ places_reservees: places_reservees } },{new: true}, function (err, atelier){

            if (err){ 
                console.log(err);
                res.render("../views/ateliers/modifier",{atelier:req.body} );
            } 
            res.redirect("/ateliers/ateliers-admin");
        }); 
    });
};
//suppression d'un atelier
atelierController.remove = function(req, res){
    Atelier.findByIdAndRemove(req.params.id, function (err, atelier){

        if (err){
            console.log(err);
            
        } 
        res.redirect("/ateliers/ateliers-admin");
        
    });
};


  //export du module
module.exports = atelierController;