'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var pythonShell = require('./RunPython');
var validator = require('./Public/Javascript/Validator');
var mailer = require('./Server/Mailer');
const fs = require('fs');
var counter=0;


const webServerModule={
    init : function(){

        this.initRedis();
        this.initWebServer();

    },

    initWebServer:function () {

        this.app = express();
        this.app.use( '/', express.static('public'));
        var path = require('path');
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        console.log('salwa');
        this.app.listen(80);
        this.app.get('/', function(req, res) {
            console.log('Exchange!!');
            res.sendFile(path.join(__dirname + '/Public/html/index.html'));
            console.log('Exchange: Localhost');
        });
        this.app.post('/ok', function(req, res) {
            var exchange= req.body;
            var agentenAnzahl= req.param('agentenAnzahl');
            var generationAnzahl= req.param('generationAnzahl');
            console.log('exchange: '+ JSON.stringify(exchange));
            console.log('generationAnzahl: '+generationAnzahl);
            console.log('agentenAnzahl: '+agentenAnzahl);
            console.log('buy_stoplos_von: '+req.param('buy_stoplos_von'));
            counter ++;
            console.log('In Data ',counter );
            if( validator.validateAgentenAnzahl(exchange.agentenAnzahl)
                && validator.validateGenerationenAnzahl(exchange.generationAnzahl)
                && validator.validateBuyRange(exchange.buy_range_von, exchange.buy_range_bis)
                && validator.validateSellRange(exchange.sell_range_von, exchange.sell_range_bis)
                && validator.validateSellRange(exchange.buy_stoplos_von, exchange.buy_stoplos_bis)
                && validator.validateSellRange(exchange.sell_stoplos_von, exchange.sell_stoplos_bis)
                && validator.validateEmail(exchange.email_input)
            ){
                console.log('All is valide');
                this.publisher.publish('TraderReady', JSON.stringify(exchange));
                //pythonShell.initialize(exchange);//agentenAnzahl, generationAnzahl);
                //pythonShell.init();
                res.send(JSON.stringify({ "valide": true }));
                //console.log('res: ',exchange);
                mailer.init(exchange);
                //res.sendFile(path.join(__dirname + '/Public/html/index.html'));
                console.log('Start Bot!!!');
                //pythonShell.end();
                //var files = fs.readdir('./GeneticTrader/output', function (err, files) {
                    // "files" is an Array with files names
                 //   console.log('readdir: '+ files);
                 //   });
                //mailer.sendMail(files);

            }
            else{
                console.log('Cannot start Bot');
                res.send(JSON.stringify({ "valide": false }));
            }

        }.bind(this));
    },

    initRedis:function () {
        this.redis = require("redis");
        this.publisher  = this.redis.createClient();
        this.subscriber = this.redis.createClient();
        this.subscriber.on("message", function (channel, message) {

            if (channel == "TraderReady:1" ){
                console.log("sub TraderReady " + channel + ": " + message);
            }
            else if(channel == "InRedis"){
                console.log("sub InRedis " + channel + ": " + message);
                mailer.sendMail(message);
            }
            //console.log('msg:'+ message)
        });
        this.subscriber.subscribe("Test");
        this.subscriber.subscribe("TraderReady");
        this.subscriber.subscribe("InRedis");
    },

};


module.exports= webServerModule;

