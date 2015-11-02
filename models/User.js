var mongoose = require('mongoose');

var Users = new mongoose.Schema({
    id: String,
    name : {
    	first: String,
    	last: String
    },
    email: String,
    picture: String
});

module.exports = mongoose.model('User', Users);