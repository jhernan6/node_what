var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();
var config = require('./app/config/config');

// log every request to the console
app.use(morgan('dev'));
// parse application/x-www-form-urlendcoded
app.use(bodyParser.urlencoded({'extended': 'true'}));
// parse application/json
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(methodOverride());


//Connecting MongoDB usign mongoose to our application
mongoose.connect(config.db);

//This calback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected', function(){
	console.log('Mongoose default connection open to ' + config.db);
});

//Express application will listen to port mention in our configuration
app.listen(config.port, function(err){
	if (err) throw err;
	console.log("App listening on port " + config.port);
});