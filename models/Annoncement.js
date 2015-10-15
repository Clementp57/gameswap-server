var mongoose = require('mongoose');

var Annoncements = new mongoose.Schema({
        id: String,
        title: String,
        creator: String,
        game: String,
        descript: String,
        position: String
    })

module.exports = mongoose.model('Annoncement', Annoncements);