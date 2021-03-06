var jwt = require('jwt-simple');
var User = require('../models/User.js');
var Admin = require('../models/Admin.js');
var auth = {
 
  login: function(req, res) {
    console.log(req.body.email + " Requested login. IP ["+ req.connection.remoteAddress + "]");
    var email = req.body.email || null;
    if(!email) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    auth.validate(email, function(user) {
      // If authentication is success, we will generate a token
      // and dispatch it to the client
      console.log('Delivering JWT to user:' + email);
      res.status(200);
      res.json(genToken(user));
    }, function(error) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
    });

  },

  platformLogin: function(req, res) {
    console.log(req.body);
    Admin.find({}, function(err, admin) {
      console.log("admin => ",admin); 
    });
    Admin.findOne({ 'email' : req.body.email}, 'email password', function(err, admin) {
      if(admin.validPassword(req.body.password)) {
          console.log('Delivering JWT to ADMIN:' + admin.email);
          res.status(200);
          res.json(genToken(admin));
      } else {
          res.status(401);
            res.json({
              "status": 401,
              "message": "Invalid credentials"
            });
      }
    });
  },

  register: function(req, res) {
    // console.log('Registering', JSON.parse(req.body));
    var user = req.body;

    if(!user.email) {
      res.status(401);
      res.json({
        "status": 401,
        "message": "No email provided"
      });
      return;
    };

    auth.validate(user.email, function() {
      // User already registered ... shit
    }, function(){
      console.info('New user, registering');

      var dbUser = new User(user);
      dbUser.save(function(obj) {
        console.log('Delivering JWT to user:' + obj);
        res.status(200);
        res.json(genToken(dbUser));
      });
    });

  },
 
  validate: function(email, successCallback, errorCallback) {
    if(!email) {
      return errorCallback();
    } 
    User.findOne({ 'email' : email }, 'name email picture', function (err, user) {
      if(err || !user) {
        return errorCallback(err);
      } else {
        return successCallback(user);
      }
    });
    
  },
 
  validateUser: function(email, successCallback, errorCallback) {
    auth.validate(email, function(user) {
      return successCallback(user);
    }, function(error) {
      return errorCallback(error);
    });
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;