'use strict'

const  validators={
    validateDataAmount: function () {

        
    },
    validateAgentenAnzahl :function (agententenAnzahl) {
        if( Number(agententenAnzahl) >=1 ){
            if( agententenAnzahl <=3000){
                return true;
            }else {
                return false;
            }
        }

    },
    validateGenerationenAnzahl: function (generationenAnzahl) {
        if( Number(generationenAnzahl) >=1 ){
            if( Number(generationenAnzahl) <=5){
                return true;
            }

        }
            return false;
    },
    validateSellRange: function (sellRange) {
        if( Number(sellRange) >=1 ){
            if( Number(sellRange) <=1000){
                return true;
            }

        }
            return false;
    },
    validateBuyRange: function (buylRange) {
        if( Number(buylRange) >=1 ){
            if( Number(buylRange) <=1000){
                return true;
            }
        }
            return false;
    },
    validateStoplossBuyRange: function (stoplossBuyRange) {
        if( Number(stoplossBuyRange) >=1 ){
            if( Number(stoplossBuyRange) <=1000){
                return true;
            }
        }
            return false;
    },
    validateStoplosSellRange: function (stoplossSellRange) {
        if( Number(stoplossSellRange) >=1 ){
            if( Number(stoplossSellRange) <=1000){
                return true;
            }
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