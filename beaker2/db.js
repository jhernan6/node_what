var mongoose = require('mongoose');

mongoose.connect('mongodb://DATABASE_URL');
module.exports = mongoose.connection;
