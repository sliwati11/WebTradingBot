'use strict'

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
function getAgentenAnzahl() {
    var agentenAnzahl= null;
    if (typeof window !== "undefined"){
        agentenAnzahl= window.parent.document.getElementById("agentenAnzahl");
    }
    return agentenAnzahl || 1000;
}
function getGenerationAnzahl() {
    var generationAnzahl= null;
    if (typeof window !== "undefined"){
        generationAnzahl= window.parent.document.getElementById("generationAnzahl");
        console.log("var agentenAnzah: ");
    }

    return generationAnzahl || 2;
}

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
            'email_input' :$('#email_input').val()
        };
        var action = form.attr("/data"),
            method = form.attr("post"),
            data   = formData;//form.serialize(); // baut die Daten zu einem String nach dem Muster vorname=max&nachname=Müller&alter=42 ... zusammen
        // Der eigentliche AJAX Aufruf
        $.ajax({
            url : '/data',
            type : 'post',
            data :  formData,
            dataType    : 'json', // what type of data do we expect back from the server
            encode          : true
        }).done(
            function (dataserver) {
            // Bei Erfolg
                if ( !dataserver.valide ){
                    input.falseInputDisplay();

                }else{
                    input.trueInputDisplay();
                    getAgentenAnzahl();
                    console.log('getGenerationAnzahl: '+getGenerationAnzahl);
                }
            }).fail(function() {
            // Bei Fehler
            alert("Fehler! "+data);
        });
    });
}





