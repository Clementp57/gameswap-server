var mongoose = require('mongoose');

var Annoncements = new mongoose.Schema({
        id: String,
        title: String,
        img : String,
        creator: String,
        plateform : String,
        game: String,
        description: String,
        coords: Object,
        date : Date
    })

module.exports = mongoose.model('Annoncement', Annoncements);