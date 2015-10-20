// https://devcenter.heroku.com/articles/mongolab
// http://usermvc.com/examples/angularjs/#/
var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    https = require('https'),
    
    routes = require('./routes/index'),
    public_routes = require('./routes/public'),
    users = require('./routes/users'),
    events = require('./routes/events'),
    annoncements = require('./routes/annoncements');

    var app = express();

/*
 * MONGOLAB_URI=mongodb://Clement:clement@ds033744.mongolab.com:33744/gameswap
 * MONGOLAB_URI=mongodb://Alexis:alexis@ds033744.mongolab.com:33744/gameswap
 */
mongoose.connect(process.env.MONGOLAB_URI, function(error) {
    if (error) console.error(error);
    else console.log('Mongodb connexion established');
});

var API_BASE_PATH = "/api/v1";

var server = express();

server.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}); 

server.use(bodyParser.json()); // support json encoded bodies

server.use(bodyParser.urlencoded({
    extended: true
})); // support encoded bodies

server.get(API_BASE_PATH, function(req, res) {
    res.status(200).json({
        msg: 'OK'
    });
});

// Auth Middleware - This will check if the token is valid
// Only the requests that start with /api/v1/* will be checked for the token.
// Any URL's that do not follow the below pattern should be avoided unless you 
// are sure that authentication is not needed
server.all('/login', public_routes);
server.all(API_BASE_PATH + '/*' , [require('./middlewares/validateRequest')]);

server.use(express.static(__dirname + '/'));
server.use(API_BASE_PATH, routes);
server.use(API_BASE_PATH+'/users', users);
server.use(API_BASE_PATH + '/annoncements', annoncements);
server.use(API_BASE_PATH + '/events', events);


// Create Https server
https.createServer({
  key: fs.readFileSync('./ssl/key.pem'),
  cert: fs.readFileSync('./ssl/cert.pem')
}, server).listen((process.env.port || 5000), function() {
    console.info('Https server running on https://localhost:' + (process.env.port || 5000));
});

