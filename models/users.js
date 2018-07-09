var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    type: String,
    specialite: String,
    telephone: String,
    password: { type: String, required: true },
    passwordConfirmation: { type: String, required: true }
});

//hasher le mot de passe avant de l'ajouter dans la base
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

module.exports = mongoose.model("Utilisateur", UserSchema);