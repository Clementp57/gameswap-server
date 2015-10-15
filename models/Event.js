var mongoose = require('mongoose');

var Events = new mongoose.Schema({
        id: String,
        creator: String,
        title: String,
        image: String,
        descript: String,
        place: String
    });

module.exports = mongoose.model('Event', Events);