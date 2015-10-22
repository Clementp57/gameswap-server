var mongoose = require('mongoose');

var Event = new mongoose.Schema({
        id: String,
        creator: String,
        title: String,
        image: String,
        descript: String,
        game: String,
        plateform: String,
        date: String,
        place: String
    });

module.exports = mongoose.model('Event', Event);