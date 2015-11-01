var mongoose = require('mongoose');

var Event = new mongoose.Schema({
        id: String,
        creator: String,
        title: String,
        image: String,
        description: String,
        game: String,
        plateform: String,
        date: String,
        coords: Object
    });

module.exports = mongoose.model('Event', Event);