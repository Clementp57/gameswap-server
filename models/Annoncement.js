var mongoose = require('mongoose');

var Annoncements = new mongoose.Schema({
        id: String,
        title: String,
        img : String,
        creatorId : String,
        plateform : String,
        game: String,
        description: String,
        coords: Object,
        date : Date,
        state: String
    })

module.exports = mongoose.model('Annoncement', Annoncements);