var mongoose = require('mongoose');

var Comment = new mongoose.Schema({
        id: String,
        authorId: String,
        authorName: {
        	first: String,
        	last: String
        },
        content: String,
        date: Date,
        eventId: String,
        authorPicture: String
    });

module.exports = mongoose.model('Comment', Comment);