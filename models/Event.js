var mongoose = require('mongoose');

var Event = new mongoose.Schema({
        id: String,
        creatorId: String,
        title: String,
        description: String,
        details: String,
        game: String,
        plateform: String,
        date: String,
        coords: Object,
        participantNb: Number
    });

module.exports = mongoose.model('Event', Event);