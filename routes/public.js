var express = require('express');
var router = express.Router();
var auth = require('./auth.js');

/*  Login */
router.post('/public/login', auth.login);
router.post('/public/token/check', function(req, res) {
	require('../middlewares/validateToken');
	res.status(200);
	res.end();	
});

module.exports = router;