'use strict'
function rangePicker(){

    $(function() {
        $('input[name="daterange"]').daterangepicker({
            opens: 'left'
        }, function(start, end, label) {
            console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
        });
    });

}
function getAgentenAnzahl() {
    var agentenAnzahl= null;
    if (typeof window != "undefined"){
        agentenAnzahl= window.parent.document.getElementById("agentenAnzahl")
    }
    return agentenAnzahl || 1000;
}
function getGenerationAnzahl() {
    var generationAnzahl=null;
    if (typeof window !== "undefined"){
        generationAnzahl= window.parent.document.getElementById("generationAnzahl");
        console.log("var agentenAnzah: ");
    }

    return generationAnzahl || 2;
}
function myFunction() {

    var x = window.parent.document.getElementById("inputTradingPair");
    var falseInput ='<div class="alert alert-success container text-center" ><h3>Sorry!! Falsche Eingabe \'-\'</h3> </div>';
    console.log('myFunkction: ',x.value);

    document.getElementById("failure").innerHTML= falseInput;
    document.getElementById("DataConfig").innerHTML = "";
    //document.getElementById("gesucht").style.visibility = 'visible';
}

function ValidateHowMuchData() {
    var inputDate= window.parent.document.getElementsByName('date');

    console.log('date: ', inputDate.value);

}
var FormValidator = (function(){
    "use strict";
    var callback, dateFormat;
    var checks = {
        'date': function(src){
            return dateFormat.test(src.value);
        },
        'int': function(src){
            return src.value % 1 === 0 && !/\./.test(src.value);
        },
        'url': function(src){

            console.log( 'salwa ');

        }
        /*
         * nach diesem Schema weitere Checks hinzufügen
         * jeder Check der in dieser Liste steht kann sofort im
         * HTML-Attribute validate verwendet werden!
         */
    };
    var runChecks = function(e){
        e = e || event;
        var src = e.target || e.srcElement;
        var validation = src.getAttribute('validate').toLowerCase();
        var ret = true;
        if(checks[validation]){
            ret = checks[validation](src);
            console.log('ret: ',ret);
        } else {
            console.log("The function checks." + validation + "() doesn't exists");
        }
        callback(src, ret);
    };
    return function(localCallback, localDateFormat){
        callback = localCallback || function(){};
        dateFormat = localDateFormat || /\d\d\.\d\d\.\d{4}/;
        var inputElements = document.querySelectorAll('input[validate]');
        for(var i = inputElements.length, tmp; i--; ){
            tmp = inputElements[i];
            tmp.onkeydown = tmp.onkeyup = runChecks;
        }
    }
})();

