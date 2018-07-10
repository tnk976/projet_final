var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservationSchema = new mongoose.Schema({
    //recupere les id des collection produit et magasin
    id_particulier:[{ type: Schema.Types.ObjectId, ref: 'Utilisateur' }],
    id_atelier: [{ type: Schema.Types.ObjectId, ref: 'Ateliers' }]
});



module.exports = mongoose.model("Reservation", reservationSchema);