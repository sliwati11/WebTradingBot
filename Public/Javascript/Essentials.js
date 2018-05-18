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



function myFunction() {
    var x = window.parent.document.getElementsByName("date")[0];


    document.getElementById("demo").innerHTML = 'Date: '+x.value;
}

function ValidateHowMuchData() {
    var inputDate=window.parent.document.getElementsByName('date');

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