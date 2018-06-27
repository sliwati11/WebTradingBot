'use strict';

const  validators={
    validateDataAmount: function () {

        
    },
    validateAgentenAnzahl :function (agententenAnzahl) {
        if( Number(agententenAnzahl) >=1 && agententenAnzahl <=3000){
                return true;
        }
        return false;

    },
    validateGenerationenAnzahl: function (generationenAnzahl) {
        if( Number(generationenAnzahl) >=1 && Number(generationenAnzahl) <=5){
                return true;
        }
        return false;
    },
    validateSellRange: function (sellRange_von,sellRange_bis) {
        let dif = Number(sellRange_bis) - Number(sellRange_von);
        if( dif >= 2 && dif <= 1000){
            return true;
        }
        return false;
    },
    validateBuyRange: function (buylRange_von, buyRange_bis) {
        let dif =Number(buyRange_bis) - Number(buylRange_von);
        if( dif>=2 && dif <= 1000 ){
                return true;
        }
        return false;
    },
    validateStoplossBuyRange: function (stoplossBuyRange_von, stoplossBuyRange_bis) {
        let dif= Number(stoplossBuyRange_bis) - Number(stoplossBuyRange_von) ;
        if( dif >=2  && dif <=1000 ){
                return true;
        }
        return false;
    },
    validateStoplosSellRange: function (stoplossSellRange_von, stoplossSellRange_bis) {
        let dif= Number(stoplossSellRange_bis) - Number(stoplossSellRange_von);
        if( dif >=2 && dif <= 1000){
                return true;
        }
        return false;
    },
    validateEmail: function (emailAdresse) {
        if (emailAdresse.length == 0){
            return false;
        }
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return re.test(emailAdresse);
    }

};
module.exports = validators;