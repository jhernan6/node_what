var flight = require('./flight');

flight.setOrigin("LAX");
flight.setDestination("Berlin, Germany");
flight.setNumber(6780);

console.log(flight.getInfo());