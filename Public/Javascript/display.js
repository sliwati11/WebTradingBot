'use strict'

const input ={
    falseInputDisplay: function myFunction() {

        var falseInput = '<div class="alert alert-danger container text-center" ><h3>Sorry!! Falsche Eingabe \'-\'</h3> </div>';
        document.getElementById("failure").innerHTML = falseInput;
        document.getElementById("DataConfig").innerHTML = "";
    },


};

function display(){
    $("form").submit(function(event) {
        // Das eigentliche Absenden verhindern
        event.preventDefault();
        // Das sendende Formular und die Metadaten bestimmen
        var form = $(this); // Dieser Zeiger $(this) oder $("form"), falls die ID form im HTML exisitiert, klappt übrigens auch ohne jQuery ;)
        // attr() kann enweder den aktuellen Inhalt des gennanten Attributs auslesen,
        // oder setzt ein neuen Wert, falls ein zweiter Parameter gegeben ist
        var action = form.attr("/data"),
            method = form.attr("post"),
            data   = form.serialize(); // baut die Daten zu einem String nach dem Muster vorname=max&nachname=Müller&alter=42 ... zusammen
        // Der eigentliche AJAX Aufruf
        $.ajax({
            url : '/data',
            type : 'post',
            data : data
        }).done(
            function (data) {
            // Bei Erfolg
                if ( !JSON.parse(data).valide ){
                    input.falseInputDisplay();
                }
            }).fail(function() {
            // Bei Fehler
            alert("Fehler!");
        });
    });
}


module.exports = input;



