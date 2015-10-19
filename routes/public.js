var express = require('express');
var router = express.Router();
var auth = require('./auth.js');

/*  Login */
router.post('/login', auth.login);

module.exports = router;