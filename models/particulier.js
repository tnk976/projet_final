var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    telephone: Number,
    password: { type: String, required: true },
    passwordConfirmation: { type: String, required: true }
});

var bcrypt = require('bcrypt');

//hashing a password before saving it to the database
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

module.exports = mongoose.model("Particulier", UserSchema);