
var mongoose = require('mongoose');



var AtelierSchema = new mongoose.Schema({
    titre: String,
    contenu: String,
    date: Date,
    horaire_debut: String,
    duree: Number,
    places_dispo: Number,
    places_reservees: Number,
    prix: Number,
    image: String
});


module.exports = mongoose.model("Ateliers", AtelierSchema);

