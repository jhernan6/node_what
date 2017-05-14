var FlightSchema = require('../schemas/flights');

module.exports = function(flights){

	var flight = require('../flight');
	//Creating flight objects

	for(var number in flights){
		flights[number] = flight(flights[number]);
	};

	var functions = {};

	functions.flight = function(req, res){
		var number = req.param('number');
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
		FlightSchema.find()setOption({sort: 'actualArrive'})
			.exec(function(err, arrivals){
				if(err){
					console.log(err);
					res.status(500).json({status: "Failure"});
				}else{
					res.render('arrivals',{title: "All Arrival",arrivals});
				};
			});
	};

	return functions;
}
