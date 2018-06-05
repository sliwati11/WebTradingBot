var PythonShell = require('python-shell');


const PythonModul ={
    init : function () {
        PythonShell.run('./GeneticTrader/TradingBot.py', function (err) {
            if (err) throw err;
            console.log('finished');
        });
    },

};

module.exports = PythonModul;
