'use strict'

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pythonShell = require('./RunPython');
var validator = require('../Public/Javascript/Validator');

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
    console.log('In Data' );
    if( validator.validateAgentenAnzahl(exchange.agentenAnzahl) ){
        if( validator.validateGenerationenAnzahl(exchange.generationAnzahl)){
            if  (validator.validateEmail(exchange.email_input)){
                pythonShell.init();
                res.sendFile(path.join(__dirname + '/Public/html/index.html'));
                console.log('Start Bot!!!');
            }
        }
    }
    else {
        console.log('Cannot start Bot');
        res.sendFile(path.join(__dirname + '/Public/html/index.html'));
    }

});
app.listen(80);
console.log('Server started! At http://localhost:80' );
