
// https://devcenter.heroku.com/articles/mongolab
// http://usermvc.com/examples/angularjs/#/
var express  = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),

    // Mongoose Schema definition
    Schema = new mongoose.Schema({
      id       : String, 
      firstName    : String,
      lastName: String
    }),

    User = mongoose.model('User', Schema);

/*
 * MONGOLAB_URI=mongodb://Clement:clement@ds033744.mongolab.com:33744/gameswap
 * MONGOLAB_URI=mongodb://Alexis:alexis@ds033744.mongolab.com:33744/gameswap
 */
mongoose.connect(process.env.MONGOLAB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected');
});

var API_BASE_PATH = "/api/v1"

express()
  .use(bodyParser.json()) // support json encoded bodies
  .use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

  .get(API_BASE_PATH, function (req, res) {
    res.json(200, {msg: 'OK' });
  })

  .get(API_BASE_PATH + '/users', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-find
    User.find( function ( err, users ){
      res.json(200, users);
    });
  })

  .post(API_BASE_PATH + '/users', function (req, res) {
    var user = new User( req.body );
    user.id = user._id;
    // http://mongoosejs.com/docs/api.html#model_Model-save
    user.save(function (err) {
      res.json(200, err);
    });
  })

  .del(API_BASE_PATH + '/users', function (req, res) {
    // http://mongoosejs.com/docs/api.html#query_Query-remove
    User.remove({ completed: true }, function ( err ) {
      res.json(200, {msg: 'OK'});
    });
  })

  .get('/users/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      res.json(200, user);
    });
  })

  .put(API_BASE_PATH + '/users:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      // http://mongoosejs.com/docs/api.html#model_Model-save
      user.save( function ( err, user ){
        res.json(200, user);
      });
    });
  })

  .del(API_BASE_PATH + '/users/:id', function (req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    User.findById( req.params.id, function ( err, user ) {
      // http://mongoosejs.com/docs/api.html#model_Model.remove
      user.remove( function ( err, user ){
        res.json(200, {msg: 'OK'});
      });
    });
  })

  .use(express.static(__dirname + '/'))
  .listen(process.env.PORT || 5000);