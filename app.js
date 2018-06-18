'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pythonShell = require('./RunPython');
var validator = require('./Public/Javascript/Validator');
var mailer = require('./Server/Mailer');
var counter=0;
app.use( '/', express.static('public'));
//app.use(express.json());

var path = require('path');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/Public/html/index.html'));
    //console.log(JSON.stringify(exchange))
    console.log('Exchange: Localhost');

});

app.post('/data', function(req, res) {
    var exchange= req.body;
    var agentenAnzahl= req.param('agentenAnzahl');
    var generationAnzahl= req.param('generationAnzahl');

    console.log('generationAnzahl: '+generationAnzahl);
    counter ++;
    console.log('In Data ',counter );
    if( validator.validateAgentenAnzahl(exchange.agentenAnzahl) ){
        if( validator.validateGenerationenAnzahl(exchange.generationAnzahl)){
            if  (validator.validateEmail(exchange.email_input)){
                pythonShell.initialize(exchange);//agentenAnzahl, generationAnzahl);
                pythonShell.init();
                console.log('res: ',exchange);
                res.send(JSON.stringify({ "valide": true }));
                mailer.init();
                mailer.sendMail();
                //res.sendFile(path.join(__dirname + '/Public/html/index.html'));
                console.log('Start Bot!!!');
            }

        }
    }
    if ( !validator.validateAgentenAnzahl(exchange.agentenAnzahl) || !validator.validateGenerationenAnzahl(exchange.generationAnzahl) ){
        console.log('Cannot start Bot');
        res.send(JSON.stringify({ "valide": false }));

    }

 });
app.listen(80);
console.log('Server started! At http://localhost:80' );
