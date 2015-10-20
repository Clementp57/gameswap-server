var mongoose = require('mongoose');

var Annoncements = new mongoose.Schema({
        id: String,
        title: String,
        img : String,
        creator: String,
        plateform : String,
        game: String,
        descript: String,
        position: String,
        date : String
    })

module.exports = mongoose.model('Annoncement', Annoncements);