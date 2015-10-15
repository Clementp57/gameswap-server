var mongoose = require('mongoose');

var Users = new mongoose.Schema({
        id: String,
        firstName: String,
        lastName: String
    });

module.exports = mongoose.model('User', Users);