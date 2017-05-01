var flight = require('../flight');
var flight_data = require('../data');
//Creating flight objects

for(var number in flight_data){
	flight_data[number] = flight(flight_data[number]);
};

exports.flight = function(req, res){
	var number = req.param('number');
	if(typeof flight_data[number] === 'undefined'){
		res.status(404).json({status: 'Error with flight'});
	}
	else{
		res.json(flight_data[number].getInformation());
	}
};
