var validateUser = require('../routes/auth').validateUser;
var validateToken = require('./validateToken');
 
module.exports = function(req, res, next) {

  // Authorize the user to see if s/he can access our resources
  var dbUser = validateUser('coucou'); // OULALALALA ^
  console.log(dbUser);
  if (dbUser) {

    if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
      next(); // To move to next middleware
    } else {
      res.status(403);
      res.json({
        "status": 403,
        "message": "Not Authorized"
      });
      return;
    }
  } else {
    // No user with this name exists, respond back with a 401
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid User"
    });
    return;
  }
};