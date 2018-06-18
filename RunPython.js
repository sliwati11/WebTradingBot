var PythonShell = require('python-shell');
//var daten = require('./Public/Javascript/BrowserDaten');
var daten= require('./Public/Javascript/display');

const PythonModul ={
    options:{
        mode: 'text',
        //pythonPath: 'C:/Python36',
        pythonOptions: ['-u'], // get print results in real-time
        //scriptPath: './GeneticTrader/TradingBot.py',
        //args: [daten.agentenAnzahl, daten.generationAnzahl, 'value3']
        args:[2000, 3],
    },
    initialize:function(obj){

        this.options.args = [obj.agentenAnzahl, obj.generationAnzahl];
    },
    init : function () {
        console.log("args: ",this.options.args);
        PythonShell.run('./GeneticTrader/TradingBot.py', this.options, function (err) {

            if (err) throw err;
            console.log("error: ",err);

        });
    },


};

module.exports = PythonModul;
