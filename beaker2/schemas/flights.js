var mongoose = require('mongoose');

module.exports = mongoose.model('Flight', {
	number: Number,
	origin: String,
	destination: String,
	departs: String,
	arrives: String,
	actualDeparts: Number,
	actualArrive: Number
});
