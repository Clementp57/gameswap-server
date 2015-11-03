var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    id: String,
    picture: String,
    name : {
    	first: String,
    	last: String
    },
    email: String
});

module.exports = mongoose.model('User', Users);