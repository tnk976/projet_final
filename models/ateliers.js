
var mongoose = require('mongoose');


// A REVOIR

var AtelierSchema = new mongoose.Schema({
    titre: String,
    contenu: String,
    date: Date,
    horaire_debut: Number,
    duree: Number,
    places_dispo: Number,
    places_reservees: Number,
    prix: Number,
    image: {type: String, data: Buffer}
});


module.exports = mongoose.model("Ateliers", AtelierSchema);

