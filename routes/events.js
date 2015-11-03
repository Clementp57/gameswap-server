var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Event = require('../models/Event.js');

router.get('/', function(req, res) {
    Event.find(function(err, events) {
        res.status(200).json(events);
    });
});

router.post('/', function(req, res) {
    var event = new Event(req.body);
    event.id = event._id;
    event.save(function(err) {
        res.json(200, err);
    });
});

router.get('/:id', function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        res.json(200, event);
    });
});

router.put('/:id', function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        event.title = req.body.title;
        event.descript = req.body.descript;
        event.save(function(err, event) {
            res.json(200, event);
        });
    });
});

router.delete('/:id', function(req, res) {
    Event.findById(req.params.id, function(err, event) {
        event.remove(function(err, event) {
            res.json(200, {
                msg: 'OK'
            });
        });
    });
});

// CUSTOM
router.post('/:id/like', function(req, res) {
    Event.findById(req.params.id, function(err, event) {

        event.likes = event.title++;
        event.descript = req.body.descript;
        event.save(function(err, event) {
            res.json(200, event);
        });
    });
   
});

module.exports = router;