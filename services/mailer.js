var nodemailer = require('nodemailer');
var wellknown = require('nodemailer-wellknown');

var config = wellknown('Gmail');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'gameswap.team@gmail.com',
        pass: 'gameswapteam'
    }
});

var sendMail = function(to, subject, html, callback) {
    // NB! No need to recreate the transporter object. You can use
    // the same transporter object for all e-mails

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: 'GameSwap Team ✔ <gameswap.team@gmail.com>', // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        console.log('SENDING MAIL');
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
        callback();
    });
}

module.exports = {
    sendMail: sendMail
}