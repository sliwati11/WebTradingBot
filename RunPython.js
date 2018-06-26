var PythonShell = require('python-shell');

const PythonModul ={
    shell: '',
    options:{
        mode: 'text',
        //pythonPath: 'C:/Python36',
        pythonOptions: ['-u'], // get print results in real-time
        scriptPath: './GeneticTrader/TradingBot.py',
        args:[2000, 3],
    },
    initialize:function(obj){
        this.options.args = [obj.agentenAnzahl, obj.generationAnzahl];
    },
    init : function () {
        this.shell = new PythonShell(this.options.scriptPath);
        this.shell.send(this.options.args);
        console.log("shell send ",this.options.args);
        this.shell.on('message', function (message) {
            console.log('receive: ', message);
        });

    },
    end: function () {
        this.shell.end(function (err, code, signal) {
            if (err) throw err;
            console.log('The exit code was: '+code);
            console.log('The exit signal was: '+signal);
            console.log('finished');
        });
    }


};

module.exports = PythonModul;
