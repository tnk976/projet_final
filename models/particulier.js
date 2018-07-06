var mongoose = require('mongoose');

var particulierSchema = new mongoose.Schema({
    nom: String,
    prenom: String,
    tel: Number,
    email: String,
});



module.exports = mongoose.model("Particulier", MagasinSchema);