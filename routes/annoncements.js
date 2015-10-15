var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Annoncement = require('../models/Annoncement.js');

router.get('/', function(req, res) {
    Annoncement.find(function(err, annoncements) {
        res.status(200).json(annoncements);
    });
});

router.post('/', function(req, res) {
        var annoncement = new Annoncement(req.body);
        annoncement.id = annoncement._id;
        annoncement.save(function(err) {
            res.json(200, err);
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