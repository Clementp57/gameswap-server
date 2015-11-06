var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs')

var Admin = new mongoose.Schema({
        email: String,
        password: String
    });

// methods ======================
// generating a hash
Admin.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
Admin.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Admin', Admin);