var mongoose = require('mongoose');
var Cuisinier = require ("../models/cuisinier"); 
var bcrypt = require('bcrypt');

var cuisinierController = {};

// Renvoit à la page d'accueil cuisiniers
cuisinierController.index = function (req, res) {
  res.render("../views/cuisinier/index");
};


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

// Renvoit à la page d'inscription
cuisinierController.create = function (req, res) {
    res.render("../views/cuisinier/inscription");
  };

// Enregistrer un cuisinier  
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

// Renvoit à la page de connexion
cuisinierController.login = function (req, res) {
  res.render("../views/cuisinier/connexion");
};

// fonction pour se connecter
cuisinierController.auth = function (req, res) {
  var email = req.body.Email;
  var password = req.body.Password;

  Cuisinier.findOne({ email: email }).exec(function (err, user) {
    if (!err && user) {
      bcrypt.compare(password, user.password, function (err, result) {
        console.log(result);
        if (result === true) {
          req.session.userId = user._id;
          req.session.Email = user.email;
          req.session.success = 'Connexion Reussie';
          res.send('<h1>Name: </h1>' + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/cuisiniers/logout">Logout</a>')
          res.render("../views/cuisinier/index");
          // res.redirect('/cuisiniers');
        }else {
        res.redirect('/cuisiniers/login');
        };
      })
  } else {
      console.log("error =>", err);
      return res.redirect('/cuisiniers/login');
    }
  })

};



// fonction pour se déconnecter
cuisinierController.logout = function(req, res){
  if (req.session){
      // supprimer la session
      console.log(req.session);
      req.session.destroy(function(err){
          if(!err){
              res.redirect('/')
          }else {
              console.log("error => ", err);
          }
      })
  }
};

//export du module
module.exports = cuisinierController;