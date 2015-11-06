var express = require('express');
var router = express.Router();

router.get('/', express.static('platform')); // Server static content

module.exports = router;