var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

app.set('port', 8000);

app.use(express.static(path.join(__dirname, 'htdocs')));

try {
    var server = app.listen(app.get('port'), function() {
        var port = server.address().port;
        console.log('Listening on port: ' + port);
    });
} catch(e) {
    console.log('Broke!');
}


