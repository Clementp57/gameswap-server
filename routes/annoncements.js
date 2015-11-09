var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Annoncement = require('../models/Annoncement.js');
var User = require('../models/User.js');
var mailer = require('../services/mailer.js');

router.get('/', function(req, res) {
    Annoncement.find({ state: 'validated' }).sort({date: 'descending'})
        .exec(function(err, ancmts) {
            res.status(200).json(ancmts);
        });
});

router.get('/forUser/:id', function(req, res) {
    Annoncement.find({ creatorId: req.params.id }).sort({date: 'descending'})
        .exec(function(err, ancmts) {
            res.status(200).json(ancmts);
        });
});

router.get('/pendings', function(req, res) {
    Annoncement.find({ state: 'pending' }).sort({date: 'descending'})
        .exec(function(err, ancmts) {
            res.status(200).json(ancmts);
        });
})

router.post('/', function(req, res) {
    var annoncement = new Annoncement(req.body);
    annoncement.id = annoncement._id;
    annoncement.state = "pending";
    annoncement.save(function(error, ancmt) {
        User.findById(annoncement.creatorId, function(err, user) {
            var subject = "Votre annonce ["+ annoncement.title + "] est en cours de validation";
            var body = "Bonjour " + user.name.first + ",";
            body += "<p>Votre Annonce <b>" + annoncement.title + "</b> est en cours de validation par nos équipes.";
            body += "<br/> Vous recevrez un mail lorsque notre équipe l'aura validée.";
            body += "<br/> Merci de votre confiance.";
            body += "<br/><br/> L'équipe GameSwap.";
            mailer.sendMail(user.email, subject, body, function() {
                res.json(200, annoncement);                
            });
        });
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

router.post('/:id/validate', function(req, res) {
    // Add comment for the post
    Annoncement.findById(req.params.id, function(err, ancmt) {
        ancmt.state = "validated";
        ancmt.descript = req.body.descript;
        ancmt.save(function(err, ancmt) {
            User.findById(ancmt.creatorId, function(err, user) {
                var subject = "Votre annonce ["+ ancmt.title + "] est en ligne";
                var body = "Bonjour " + user.name.first + ",";
                body += "<p>Votre Annonce <b>" + ancmt.title + "</b> a été validée par nos équipes.";
                body += "<br/> Elle apparaît désormais en ligne.";
                body += "<br/> Merci de votre confiance.";
                body += "<br/><br/> L'équipe GameSwap.";
                mailer.sendMail(user.email, subject, body, function() {
                    res.json(200, ancmt);                
                });
            });
        });
    });
});

router.post('/:id/revoke', function(req, res) {
    // Add comment for the post
    Annoncement.findById(req.params.id, function(err, ancmt) {
        ancmt.remove(function(err, ancmt) {
            User.findById(ancmt.creatorId, function(err, user) {
                var subject = "Votre annonce ["+ ancmt.title + "] n'as pas été validé";
                var body = "Bonjour " + user.name.first + ",";
                var reason = req.params.reason;
                body += "<p>Votre Annonce <b>" + ancmt.title + "</b> n'a pas été validée par nos équipes pour la raison suivante '";
                body += reason +"'.";
                body += "<br/> Nous vous conseillons de consulter les condition générales de notre application,";
                body += "puis de reposter votre annonce modifiée."
                body += "<br/> Merci de votre confiance.";
                body += "<br/><br/> L'équipe GameSwap.";
                mailer.sendMail(user.email, subject, body, function() {
                    res.json(200, {msg: 'OK'});                
                });
            });
        });
    });
});

module.exports = router;