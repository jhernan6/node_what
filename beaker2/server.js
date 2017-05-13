var http = require('http');
var flights = require('./data');
var app = require('./app')(flights);
var db = require('./db');

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

