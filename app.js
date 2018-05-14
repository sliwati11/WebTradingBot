var express = require('express');
var app = express();
var path = require('path');

app.use( '/', express.static('public'));


// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.write('Hello Trading World !! ');
    res.end();

})

app.listen(80);