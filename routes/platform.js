var express = require('express');
var router = express.Router();
var auth = require('./auth.js');

router.post('/platform/login', auth.platformLogin);
router.get('/', express.static('platform')); // Server static content
module.exports = router;