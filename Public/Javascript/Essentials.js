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


function datePicker() {
    $(document).ready(function() {

        var start = moment().subtract(29, 'days');
        var end = moment();

        function cb(start, end) {
            $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
        }

        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            ranges: {
                'Today': [moment(), moment()],
                'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
                'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
            }
        }, cb);

        cb(start, end);

    });
    $(document).ready(function() {
        $('#datetimepicker1')
            .datepicker({
                autoclose: true,
                format: "dd MM yyyy ",
                todayHighlight: true,
                endDate: '12/30/2020',
                todayBtn: true,
                pickerPosition: "bottom-left",
                language: 'pt-BR'
            })

    });
    $(document).ready(function() {
        $('#dateRangePicker2')
            .datepicker({

                todayHighlight: true,
                format: "dd MM yyyy ",
                dateFormat: "yy-mm-dd",
                timeFormat:  "hh:mm:ss",
                endDate: '12:30:2020',
                autoclose: true,
                todayBtn: true,
                pickerPosition: "bottom-left",
                language: 'pt-BR'
            })

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
})()