'use strict';

const input ={
    falseInputDisplay: function myFunction() {

        var falseInput = '<div class="alert alert-danger container text-center" ><h3>Sorry!! Falsche Eingabe \'-\'</h3> </div>';
        document.getElementById("failure").innerHTML = falseInput;
        document.getElementById("DataConfig").innerHTML = "";
    },
    trueInputDisplay : function () {
        var trueInputDisplay='<div class="alert alert-success container text-center" ><h3>Ein Moment, ihre Strategie wird berechnet .</h3> </div>';
        document.getElementById("failure").innerHTML= trueInputDisplay;
        document.getElementById("DataConfig").innerHTML = "";
    },

};


function handleSubmit(){

    $("#form").on('click' ,function(event) {
        // Das eigentliche Absenden verhindern
        event.preventDefault();
        // Das sendende Formular und die Metadaten bestimmen
        var form = $(this); // Dieser Zeiger $(this) oder $("form"), falls die ID form im HTML exisitiert, klappt übrigens auch ohne jQuery ;)
        // attr() kann enweder den aktuellen Inhalt des gennanten Attributs auslesen,
        // oder setzt ein neuen Wert, falls ein zweiter Parameter gegeben ist
        var formData={
            'agentenAnzahl': $('#agentenAnzahl').val(),
            'generationAnzahl':$('#generationAnzahl').val(),

            'buy_range_von': $('#buy_range_von').val(),
            'buy_range_bis': $('#buy_range_bis').val(),

            'sell_range_von': $('#sell_range_von').val(),
            'sell_range_bis': $('#sell_range_bis').val(),

            'buy_stoplos_von': $('#buy_stoplos_von').val(),
            'buy_stoplos_bis': $('#buy_stoplos_bis').val(),

            'sell_stoplos_von': $('#sell_stoplos_von').val(),
            'sell_stoplos_bis': $('#sell_stoplos_bis').val(),

            'email_input' :$('#email_input').val()
        };
        var action = form.attr("/emailAdress"),
            method = form.attr("post"),
            data   = formData;//form.serialize(); // baut die Daten zu einem String nach dem Muster vorname=max&nachname=Müller&alter=42 ... zusammen
        // Der eigentliche AJAX Aufruf
        $.ajax({
            url : '/ok',
            type : 'post',
            data :  formData,
            dataType    : 'json', // what type of emailAdress do we expect back from the server
            encode          : true
        }).done(
            function (dataserver) {
            // Bei Erfolg
                if ( !dataserver.valide ){
                    input.falseInputDisplay();

                }else{
                    input.trueInputDisplay();
                }
            }).fail(function() {
            // Bei Fehler
            alert("Fehler! "+data);
        });
    });
}





