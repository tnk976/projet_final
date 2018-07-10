
var mongoose = require('mongoose');



var AtelierSchema = new mongoose.Schema({
    titre: { type: String, required: true },
    contenu: { type: String, required: true },
    date: { type: Date, required: true },
    horaire_debut: { type: String, required: true },
    duree: { type: Number, required: true },
    places_dispo: { type: Number, required: true },
    places_reservees: { type: Number, required: true },
    prix: { type: Number, required: true },
    image: { type: String, required: true },
    active: Boolean,
    chef: String
});


module.exports = mongoose.model("Ateliers", AtelierSchema);

