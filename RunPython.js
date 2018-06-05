var PythonShell = require('python-shell');


const PythonModul ={
    init : function () {
        PythonShell.run('my_script.py', function (err) {
            if (err) throw err;
            console.log('finished');
        });
    }

};

module.exports = PythonModul;
