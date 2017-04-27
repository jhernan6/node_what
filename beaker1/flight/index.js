var number, origin, destination;

exports.setNumber = function(num){
	number = num;
};

exports.setOrigin = function(orig){
	origin = orig;
};

exports.setDestination = function(dest){
	destination = dest;
};

exports.getInfo = function(){
	return {
		number: number,
		origin: origin,
		destination: destination
	};
};