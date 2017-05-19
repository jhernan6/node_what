var FlightSchema = require('../schemas/flights');
var Emitter = require('event').EventEmitter;
var flightEmitter = new Emitter();


flightEmitter.on('arrival', function(flight){
	var record = new FlightSchema(flights[number].getInformation());
	record.save(function(err){
		if (err){
			console.log(err);
		};
	});
});

flightEmitter.on('arrival', function(flight){
	console.log('Flight Arrived: '+ flight.data.number);
}

module.exports = function(flights){

	var flight = require('../flight');
	//Creating flight objects

	for(var number in flights){
		flights[number] = flight(flights[number]);
	};

	var functions = {};

	functions.flight = function(req, res){
		var number = req.param('number');
		req.session.lastNumber = number;

		if(typeof flights[number] === 'undefined'){
			res.status(404).json({status: 'Error: That flight does not exist. Check the flight number.'});
		}
		else{
			res.json(flights[number].getInformation());
		}
	};

	functions.arrived = function(req, res){
		var number = req.param('number');
		if(typeof flights[number] === 'undefined'){
			res.status(404).json({status: 'Error: That flight does not exist. Check the flight number.'});
		}
		else{
			flights[number].triggerArrive();
			flightEmitter.emit('arrival', flights[number]);
			res.json({status: 'success'});

			var record = new FlightSchema(flights[number].getInformation());
			record.save(function(err){
				if (err){
					console.log(err);
					res.status(500).json({status: 'Failure'});
				}else{
					res.json({status: "Success"});
				}
			});
			res.json({status: 'Done'});
		}
	};

	functions.list = function(req, res){
		res.render('list', {title: 'All Flights', flights: flights});      
	};

	functions.arrivals = function(req, res){
		FlightSchema.find().setOptions({sort: 'actualArrive'})
			.exec(function(err, arrivals){
				if(err){
					console.log(err);
					res.status(500).json({status: "Failure"});
				}else{
					res.render('arrivals',{
						title: "All Arrival",
						arrivals: arrivals,
						lastNumber: req.session.lastNumber
						});
				};
			});
	};

	functions.login = function(req, res){
		res.render('login', {title: 'Login'});
	};

	functions.user = function(req, res){
		if(typeof req.session.passport === 'undefined'){
			res.redirect('/login');
		}else{
			res.render('user',{title: 'Welcome', user: req.user});
		}
		
	};

	return functions;
}
