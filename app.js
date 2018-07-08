'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var pythonShell = require('./RunPython');
var validator = require('./Public/Javascript/Validator');
var mailer = require('./Server/Mailer');
var display = require('./Public/Javascript/display');
const fs = require('fs');
var requestify = require('requestify');
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
            console.log('in post');
            var exchange= req.body;
            var url1 = 'https://bitcoincharts.com/charts/chart.json?m='+exchange.m;
            var url2 = '&SubmitButton=Draw&r='+exchange.r;
            var url3 = '&i='+exchange.i;
            var url4 = '&c=1s=&e=&Prev=&Next=&t=S&b=&a1=&m1=10&a2=&m2=25&x=0&i1=&i2=&i3=&i4=&v=1&cv=0&ps=0&l=0&p=0&';
            var url = url1 + url2 + url3 + url4;
            console.log('urll: '+url);
            this.publisher.publish('TraderReady', JSON.stringify(exchange));
            requestify.get(url).then(function(response) {
                    // Get the response body
                    console.log('response.body: ',response.body.length);
                    var responseList= response.body.length >0 ? eval(response.getBody()) : '';
                    console.log('length in : ' + responseList.length);
                    if ( responseList.length < 1000 ){
                        console.log('vor');
                        //res.send(JSON.stringify({ "valide": false }));

                        console.log('nach');
                        res.send(JSON.stringify({'data': false, "ai": true  }));
                        console.log('nach nach');

                    }else{
                        console.log('ELSE');
                        var agentenAnzahl= req.param('agentenAnzahl');
                        var generationAnzahl= req.param('generationAnzahl');
                        console.log('exchange: '+ JSON.stringify(exchange));
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
                            res.send(JSON.stringify({ 'data': true, "ai": true }));
                            mailer.init(exchange);
                            console.log('Start Bot!!!');
                        }
                        else{
                            console.log('Cannot start Bot');
                            res.send(JSON.stringify({ 'data': true, "ai": false }));
                        }
                        console.log('vor');
                        //res.send(JSON.stringify({ "valide": true }));
                        console.log('nach');
                    }
                }).fail(function (res) {
                    console.log('res Error: ',res.getCode());
                });
        }.bind(this));
    },

    initRedis:function () {
        this.redis = require("redis");
        console.log('initRedis');
        this.publisher  = this.redis.createClient();
        this.subscriber = this.redis.createClient();
        this.subscriber.on("message", function (channel, message) {

            if (channel == "TraderReady:1" ){
                console.log("sub TraderReady " + channel + ": " + message);
            }
            else if(channel == "InRedis"){
                console.log("sub InRedis " + channel + ": " + message);
                mailer.sendMail(message);
            }else if(channel == "notInRedis"){
                console.log("sub notInRedis " + channel + ": " + message);

            }
            //console.log('msg:'+ message)
        });
        this.subscriber.subscribe("Test");
        this.subscriber.subscribe("TraderReady");
        this.subscriber.subscribe("InRedis");
        this.subscriber.subscribe("notInRedis");
    },

};


module.exports= webServerModule;

