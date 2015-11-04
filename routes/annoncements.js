var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Annoncement = require('../models/Annoncement.js');

router.get('/', function(req, res) {
    var date = new Date().toISOString();
    Annoncement.find().sort({date: 'ascending'})
        .exec(function(err, ancmts) {
            res.status(200).json(ancmts);
        });
});

router.post('/', function(req, res) {
        var annoncement = new Annoncement(req.body);
        annoncement.id = annoncement._id;
        annoncement.save(function(error, ancmt) {
            res.json(200, ancmt);
        });
    });

router.get('/:id', function(req, res) {
    // http://mongoosejs.com/docs/api.html#model_Model.findById
    Annoncement.findById(req.params.id, function(err, annoncement) {
        res.json(200, annoncement);
    });
});

router.put('/:id', function(req, res) {
    Annoncement.findById(req.params.id, function(err, annoncement) {
        annoncement.title = req.body.title;
        annoncement.descript = req.body.descript;
        annoncement.save(function(err, annoncement) {
            res.json(200, annoncement);
        });
    });
});

router.delete('/:id', function(req, res) {
    Annoncement.findById(req.params.id, function(err, annoncement) {

        annoncement.remove(function(err, annoncement) {
            res.json(200, {
                msg: 'OK'
            });
        });
    });
});

module.exports = router;