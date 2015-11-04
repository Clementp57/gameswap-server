var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
        id: String,
        authorId: String,
        content: String,
        date: String,
        eventId: String,
        authorPicture: String
    });

module.exports = mongoose.model('Comment', Comment);