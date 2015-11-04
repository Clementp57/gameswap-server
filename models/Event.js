var mongoose = require('mongoose');

var Event = new mongoose.Schema({
        id: String,
        creatorId: String,
        title: String,
        date: date,
        creationDate: Date,
        description: String,
        details: String,
        game: String,
        plateform: String,
        date: String,
        coords: Object,
        participantNb: Number,
        locationName: String,
        poster: String,
        userPic: String,
        nbComment: Number
    });

module.exports = mongoose.model('Event', Event);